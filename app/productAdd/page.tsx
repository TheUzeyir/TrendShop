"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/productadd/ProductAdd.module.scss";

type MediaItem = {
  file: File;
  url: string;
  type: "image" | "video";
};

export default function TikTokUploader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const startRecord = () => {
    if (!streamRef.current) return;

    const recorder = new MediaRecorder(streamRef.current);
    recorderRef.current = recorder;

    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      const file = new File([blob], `video.mp4`, {
        type: "video/mp4",
      });

      setMedia((prev) => [...prev, { file, url, type: "video" }]);
    };

    recorder.start();
    setRecording(true);

    setSeconds(0);

    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stopRecord = () => {
    const r = recorderRef.current;

    if (r && r.state === "recording") r.stop();

    setRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (step === 1) setStep(2);
  };

  const addGallery = (files: FileList | null) => {
    if (!files) return;

    const items: MediaItem[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setMedia((prev) => [...prev, ...items].slice(0, 10));
    setStep(2);
  };

  useEffect(() => {
    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  /* ---------------- STEP 1 ---------------- */
  if (step === 1) {
    return (
      <div className={styles.capture}>
        <video ref={videoRef} autoPlay playsInline className={styles.camera} />

        {recording && (
          <div className={styles.timer}>
            REC {formatTime(seconds)}
          </div>
        )}

        <div className={styles.holdWrap}>
          <div
            className={styles.holdBtn}
            style={{ background: recording ? "red" : "#fff" }}
            onPointerDown={(e) => {
              e.preventDefault();
              startRecord();
            }}
            onPointerUp={stopRecord}
            onPointerLeave={stopRecord}
          />
        </div>

        <label className={styles.galleryBtn}>
          📁
          <input
            type="file"
            multiple
            hidden
            accept="image/*,video/*"
            onChange={(e) => addGallery(e.target.files)}
          />
        </label>
      </div>
    );
  }

  /* ---------------- STEP 2 ---------------- */
  if (step === 2) {
    return (
      <div className={styles.preview}>
        <h3 style={{ color: "#fff" }}>Preview</h3>

        <div className={styles.grid}>
          {media.map((m, i) => (
            <div
              key={i}
              className={styles.item}
              onClick={() => setSelected(m)}
            >
              {m.type === "video" ? (
                <video src={m.url} className={styles.media} />
              ) : (
                <img src={m.url} className={styles.media} />
              )}
            </div>
          ))}
        </div>

        <button className={styles.nextBtn} onClick={() => setStep(3)}>
          Next →
        </button>

        {selected && (
          <div className={styles.modal} onClick={() => setSelected(null)}>
            {selected.type === "video" ? (
              <video src={selected.url} controls autoPlay />
            ) : (
              <img src={selected.url} />
            )}
          </div>
        )}
      </div>
    );
  }

  /* ---------------- STEP 3 ---------------- */
  return (
    <div className={styles.form}>
      <h2 style={{ color: "#fff" }}>Product Info</h2>

      <input className={styles.input} placeholder="Name" />
      <input className={styles.input} placeholder="Description" />
      <input className={styles.input} placeholder="Price" />

      <button className={styles.nextBtn}>Publish</button>
    </div>
  );
}