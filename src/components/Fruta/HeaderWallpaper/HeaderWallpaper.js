import { ENV } from "@/utils";
import { Image } from "semantic-ui-react";
import styles from "./HeaderWallpaper.module.scss";

export function HeaderWallpaper(props) {
  const { image } = props;

  const enlaceurlServer = `${ENV.SERVER_HOST}`;
  return (
    <div className={styles.headerWallpaper}>
      <Image src={`${enlaceurlServer}${image}`} />
    </div>
  );
}
