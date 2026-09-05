import type { BeanlogEntry } from "../types";

import styles from "../styles/beanlog.module.css";

type BeanlogViewProps = {
  entries: BeanlogEntry[];
};

function formatDate(date: string) {
  const [, month, day] = date.split("-");

  return `${month}.${day}`;
}

function renderContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index}>
        {paragraph.split("\n").map((line, lineIndex) => (
          <span key={lineIndex}>
            {line}
            {lineIndex <
            paragraph.split("\n").length - 1 ? (
              <br />
            ) : null}
          </span>
        ))}
      </p>
    ));
}

export default function BeanlogView({
  entries,
}: BeanlogViewProps) {
  return (
    <article
      className={[
        styles.currentDocument,
        styles.workspaceDocument,
        styles.beanlogDocument,
      ].join(" ")}
    >
      <header className={styles.beanlogHeading}>
        <span className={styles.documentIndex}>
          01 / SPACE
        </span>

        <h2>Beanlog</h2>

        <p>
          Bean, Pama, Hodu가 별일 없이
          <br />
          지내는 곳.
        </p>

        <span className={styles.beanlogAside}>
          가끔 기록하고, 대부분은 쉰다.
        </span>
      </header>

      <div className={styles.diaryStream}>
        {entries.map((entry) => (
          <article
            key={`${entry.date}-${entry.resident}`}
            className={styles.diaryEntry}
          >
            <div className={styles.diaryEntryTop}>
              <div>
                <span
                  className={styles.diaryResident}
                >
                  {entry.resident.toUpperCase()}
                </span>

                <span className={styles.diaryDate}>
                  {formatDate(entry.date)}
                </span>
              </div>

              <span className={styles.diaryMood}>
                mood / {entry.mood}
              </span>
            </div>

            <div className={styles.diaryText}>
              {renderContent(entry.content)}
            </div>
          </article>
        ))}
      </div>

      {entries.length === 0 ? (
        <p className={styles.beanlogEnding}>
          아직 남겨진 기록이 없다.
        </p>
      ) : (
        <p className={styles.beanlogEnding}>
          이곳의 기록은 정해진 주기도,
          <br />
          특별한 목적도 없다.
        </p>
      )}
    </article>
  );
}