import { Container } from "semantic-ui-react";
import styles from "./Info.module.scss";

export function Info(props) {
  const { fruta } = props;

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
        <p>{fruta.summary}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>Fecha de lanzamiento:</span> {fruta.releaseDate}
          </li>
        </ul>
      </div>
    </Container>
  );
}
