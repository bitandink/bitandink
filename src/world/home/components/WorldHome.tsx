import Link from "next/link";

import WorldShell from "@/shared/components/WorldShell";
import styles from "../styles/home.module.css";

export default function WorldHome() {
  return (
    <WorldShell current="home">
      <section className={styles.home}>
        <header className={styles.intro}>
          <span className={styles.index}>
            00 / HOME
          </span>

          <h1>
            Welcome to
            <br />
            Beanlog.
          </h1>

          <p>
            현실과 가상세계 사이,
            <br />
            몇 개의 기록과 작은 실험이 머무는 공간.
          </p>

          <div className={styles.statusLine}>
            <span>WORLD STATUS</span>
            <strong>ONLINE</strong>
          </div>
        </header>

        <div className={styles.grid}>
          <Link
            href="/bitandink/beanlog"
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span>01</span>
              <span>SPACE</span>
            </div>

            <h2>Beanlog</h2>

            <p>
              Bean, Pama, Hodu가 가끔 남기는
              작은 기록.
            </p>

            <span className={styles.cardMeta}>
              OPEN SPACE →
            </span>
          </Link>

          <a
            href="https://bitandink.vercel.app"
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span>02</span>
              <span>EXTERNAL</span>
            </div>

            <h2>Webzine</h2>

            <p>
              사랑과 관계에 관한 이야기를
              기록하는 독립 웹진.
            </p>

            <span className={styles.cardMeta}>
              VISIT WEBZINE ↗
            </span>
          </a>

          <a
            href="https://bitandink.github.io/portfolio-2026/"
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span>03</span>
              <span>EXTERNAL</span>
            </div>

            <h2>Portfolio</h2>

            <p>
              웹 디자인과 프론트엔드 작업을
              모아둔 포트폴리오.
            </p>

            <span className={styles.cardMeta}>
              VIEW PORTFOLIO ↗
            </span>
          </a>

          <Link
            href="/bitandink/playground"
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <span>04</span>
              <span>LAB</span>
            </div>

            <h2>Playground</h2>

            <p>
              작은 인터랙션과 실험들이
              돌아다니는 내부 실험실.
            </p>

            <span className={styles.cardMeta}>
              ENTER LAB →
            </span>
          </Link>
        </div>

        <footer className={styles.footer}>
          <span>BEAN / PAMA / HODU</span>
          <span>somewhere inside the monitor.</span>
        </footer>
      </section>
    </WorldShell>
  );
}