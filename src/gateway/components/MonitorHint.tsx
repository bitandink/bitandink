import styles from "../styles/gateway.module.css";

export default function MonitorHint() {
  return (
    <div className={styles.monitorHint}>
      <span className={styles.monitorHintArrow}>
        ↓
      </span>

      <span>
        scroll down to enter
      </span>
    </div>
  );
}