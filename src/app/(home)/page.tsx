import Fetcher from "../../components/Fetcher";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.controlContainer}>
      <Fetcher />
    </div>
  );
}
