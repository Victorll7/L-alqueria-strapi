import { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import Link from "next/link";
import { Account } from "../Account";
import { Menu } from "../Menu";
import styles from "./TopBar.module.scss";

export function TopBar(props) {
  const { isOpenSearch, hideMenu } = props;
  const [isTop, setIsTop] = useState(true); // Estado para controlar si estamos en la parte superior de la página

  useEffect(() => {
    // Función para manejar el scroll y determinar si estamos en la parte superior
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(scrollTop === 0);
    };

    // Agregar evento de scroll al montar el componente
    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento de scroll al desmontar el componente para evitar fugas de memoria
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.topBar} ${!isTop ? styles.scrolled : ""}`}>
      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/logo-topbar-lalqueria.png" alt="L´alqueria" />
        </Link>
      </div>

      <div className={styles.center}>
        {!hideMenu && <Menu isOpenSearch={isOpenSearch} />}
      </div>

      <div className={`${styles.right} ${!isTop ? styles.hideRight : ""}`}>
        <Account />
      </div>
    </div>
  );
}
