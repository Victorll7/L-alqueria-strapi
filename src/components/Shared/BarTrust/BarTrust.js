import { Container, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { data, data2 } from "./BarTrust.data"; // Importamos ambos conjuntos de datos
import styles from "./BarTrust.module.scss";

export function BarTrust() {
  return (
    <div className={styles.barTrust}>
      <Container className={styles.content}>
        {map(
          data,
          (
            item // Renderizamos data en PCs
          ) => (
            <div className={styles.block} key={item.title}>
              <Icon name={item.icon} />
              <div>
                <h5>{item.title}</h5>
                <span>{item.description}</span>
              </div>
            </div>
          )
        )}
        {/* Renderizamos data2 en dispositivos móviles y tablets */}
        {window.innerWidth <= 1024 &&
          map(data2, (item) => (
            <div className={styles.block} key={item.title}>
              <Icon name={item.icon} />
              <div>
                <h5>{item.title}</h5>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
      </Container>
    </div>
  );
}
