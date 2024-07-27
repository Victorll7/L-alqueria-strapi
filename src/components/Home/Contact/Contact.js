import { Container, Icon } from "semantic-ui-react";
import styles from "./Contact.module.scss";

export function Contact() {
  return (
    <div className={styles.contact}>
      <Container>
        <h2>¡Contacta con nosotros!</h2>
        <div className={styles.info}>
          <div className={styles.details}>
            <p>
              <Icon name="marker" size="large" />
              <a
                href="https://maps.app.goo.gl/ivXjBZ6WZDpQ2RNY9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Av. de la Condomina, 38, 03540 Alicante (Alacant), Alicante
              </a>
            </p>
            <p>
              <Icon name="phone" />
              <a href="tel:+34912345678">+34 962 268 832</a>
            </p>
            <p>
              <Icon name="mail" />
              <a href="mailto:contacto@fruiteslalqueria.com">
                contacto@fruiteslalqueria.com
              </a>
            </p>
            <p>
              <Icon name="clock" /> Lunes a Viernes: 9:30h - 20:30h <br />
              Sábados: 9:30h - 14:30h <br /> Domingos: Cerrado
            </p>
          </div>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3128.377336176009!2d-0.4302946!3d38.36339149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6239b60badefef%3A0x9d6222f4dc247c4e!2sAv.%20de%20la%20Condomina%2C%2038%2C%2003540%20Alicante%20(Alacant)%2C%20Alicante!5e0!3m2!1ses!2ses!4v1718790193915!5m2!1ses!2ses"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
}
