import Link from "next/link";
import { Container, Image, Icon } from "semantic-ui-react";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.columns}>
          <div>
            <Link href="/">
              <Image src="/images/LogoAlqueria.png" alt="L´Alquería" />
            </Link>
          </div>

          <div>
            <ul>
              <li>
                <Link href="#">Términos y condiciones</Link>
              </li>
              <li>
                <Link href="#">Política de privacidad</Link>
              </li>
              <li>
                <Link href="#">Contacto</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
            </ul>
          </div>

          <div className={`${styles.contact} contact`}>
            <ul>
              <li>
                <a href="https://maps.app.goo.gl/x9DTp84EA7S1aPDz8">
                  <Icon className={styles.icon} name="home" /> Av. de la
                  Condomina, 38
                </a>
              </li>
              <li>
                <a href="tel:+34912345678">
                  <Icon className={styles.icon} name="phone" /> +34 956 268 832
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <span>
            Copyright © 2024 L´Alquería - Todos los derechos reservados.
          </span>
        </div>
      </Container>
    </div>
  );
}
