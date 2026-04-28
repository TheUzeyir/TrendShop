"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */
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

  /* ================= CAMERA ================= */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  /* ================= START RECORD ================= */
  const startRecord = () => {
    if (!streamRef.current) return;

    const recorder = new MediaRecorder(streamRef.current);
    recorderRef.current = recorder;

    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      const file = new File([blob], `video-${Date.now()}.mp4`, {
        type: "video/mp4",
      });

      setMedia((prev) => [
        ...prev,
        { file, url, type: "video" },
      ]);
    };

    recorder.start();
    setRecording(true);

    /* TIMER START */
    setSeconds(0);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  /* ================= STOP RECORD ================= */
  const stopRecord = () => {
    const recorder = recorderRef.current;

    if (recorder && recorder.state === "recording") {
      recorder.stop();
    }

    setRecording(false);

    /* TIMER STOP */
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (step === 1) setStep(2);
  };

  /* ================= GALLERY ================= */
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

  /* ================= INIT CAMERA ================= */
  useEffect(() => {
    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /* ================= FORMAT TIME ================= */
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;

    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  /* ======================================================
     STEP 1 — CAPTURE
  ====================================================== */
  if (step === 1) {
    return (
      <div style={styles.capture}>
        {/* CAMERA */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={styles.camera}
        />

        {/* TIMER */}
        {recording && (
          <div style={styles.timer}>
            REC {formatTime(seconds)}
          </div>
        )}

        {/* HOLD BUTTON */}
        <div style={styles.holdWrap}>
          <div
            style={{
              ...styles.holdBtn,
              background: recording ? "red" : "#fff",
            }}
            onPointerDown={(e) => {
              e.preventDefault();
              startRecord();
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              stopRecord();
            }}
            onPointerLeave={stopRecord}
            onPointerCancel={stopRecord}
          />
        </div>

        {/* GALLERY */}
        <label style={styles.galleryBtn}>
          📁
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            hidden
            onChange={(e) => addGallery(e.target.files)}
          />
        </label>
      </div>
    );
  }

  /* ======================================================
     STEP 2 — PREVIEW
  ====================================================== */
  if (step === 2) {
    return (
      <div style={styles.preview}>
        <h3 style={{ color: "#fff" }}>Preview</h3>

        <div style={styles.grid}>
          {media.map((m, i) => (
            <div
              key={i}
              style={styles.item}
              onClick={() => setSelected(m)}
            >
              {m.type === "video" ? (
                <video
                  src={m.url}
                  style={styles.media}
                  muted
                  autoPlay
                  loop
                />
              ) : (
                <img src={m.url} style={styles.media} />
              )}
            </div>
          ))}
        </div>

        <button
          style={styles.nextBtn}
          onClick={() => setStep(3)}
        >
          Next →
        </button>

        {/* FULLSCREEN */}
        {selected && (
          <div
            style={styles.modal}
            onClick={() => setSelected(null)}
          >
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

  /* ======================================================
     STEP 3 — FORM
  ====================================================== */
  return (
    <div style={styles.form}>
      <h2 style={{ color: "#fff" }}>Product Info</h2>

      <input placeholder="Name" style={styles.input} />
      <textarea placeholder="Description" style={styles.input} />
      <input placeholder="Price" style={styles.input} />

      <button style={styles.publish}>
        Publish
      </button>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles: any = {
  capture: {
    height: "100vh",
    background: "#000",
    position: "relative",
  },

  camera: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  timer: {
    position: "absolute",
    top: 40,
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    background: "rgba(0,0,0,0.5)",
    padding: "6px 12px",
    borderRadius: 8,
  },

  holdWrap: {
    position: "absolute",
    bottom: 120,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  holdBtn: {
    width: 85,
    height: 85,
    borderRadius: "50%",
    border: "4px solid white",
  },

  galleryBtn: {
    position: "absolute",
    bottom: 40,
    right: 20,
    fontSize: 30,
    color: "#fff",
  },

  preview: {
    minHeight: "100vh",
    background: "#111",
    padding: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },

  item: {
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  nextBtn: {
    marginTop: 20,
    width: "100%",
    padding: 12,
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 8,
  },

  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    minHeight: "100vh",
    background: "#111",
    padding: 20,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },

  publish: {
    width: "100%",
    padding: 12,
    background: "green",
    color: "#fff",
    border: "none",
  },
};