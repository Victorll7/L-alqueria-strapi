import { Image } from "semantic-ui-react";
import Link from "next/link";
import { Account } from "../Account";
import { Menu } from "../Menu";
import styles from "./TopBar.module.scss";

export function TopBar(props) {
  const { isOpenSearch, hideMenu } = props;

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/logo-topbar-lalqueria.png" alt="L´alqueria" />
        </Link>
      </div>

      <div className={styles.center}>
        {!hideMenu && <Menu isOpenSearch={isOpenSearch} />}
      </div>

      <div className={styles.right}>
        <Account />
      </div>
    </div>
  );
}
