import data from "@/data/data.json";
import styles from "@/styles/headerMobile/HeaderMobile.module.scss";

export default function HeaderMobile() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.name}>
          {data[0].name}
        </div>

        <div className={styles.avatar}>
          <img
            src={data[0].person}
            alt="Person"
          />
        </div>
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
        />

        <svg
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>

    </div>
  );
}