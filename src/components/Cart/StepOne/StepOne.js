import { Basket } from "./Basket";
import { Resume } from "./Resume";
import styles from "./StepOne.module.scss";

export function StepOne(props) {
  const { frutas } = props;

  return (
    <div className={styles.stepOne}>
      <div className={styles.center}>
        <Basket frutas={frutas} />
      </div>
      <div className={styles.right}>
        <Resume frutas={frutas} />
      </div>
    </div>
  );
}
