"use client";

import MonitorHint from "./MonitorHint";
import MonitorTransition from "./MonitorTransition";

import styles from "../styles/gateway.module.css";

export default function BitandinkRoom() {
  return (
    <MonitorTransition>
      {({ journeyRef, stickyRef }) => (
        <section
          ref={journeyRef}
          className={styles.heroJourney}
        >
          <div
            ref={stickyRef}
            className={styles.heroSticky}
          >
            <div className={styles.roomLayer}>
              <div className={styles.workspaceImage} />
              <div className={styles.imageFade} />
            </div>

            <div
              className={styles.backgroundTexture}
            />

            <header className={styles.identity}>
              <span className={styles.eyebrow}>
                REAL WORLD / CONNECTION POINT
              </span>

              <h1 className={styles.title}>
                bitandink
              </h1>

              <p className={styles.subtitle}>
                somewhere between the real world
                <br />
                and Beanlog.
              </p>
            </header>

            <div className={styles.scrollHint}>
              <span className={styles.mouseHint}>
                <i />
              </span>

              <div className={styles.scrollText}>
                <span>scroll to leave</span>
                <span>the boundary</span>
              </div>

              <i className={styles.scrollLine} />
            </div>

            <MonitorHint />

            <div className={styles.monitorPortal}>
              <div className={styles.portalScreen}>
                <span>BEANLOG</span>
                <strong>entering...</strong>
              </div>
            </div>
          </div>
        </section>
      )}
    </MonitorTransition>
  );
}