import { useState, useEffect } from "react";
import { ENV } from "@/utils";
import { Container, Image } from "semantic-ui-react";
import Link from "next/link";
import { Fruta } from "@/api";
import { Label } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./BannerLastFrutaPublished.module.scss";

const frutaCtrl = new Fruta();

export function BannerLastFrutaPublished() {
  const [fruta, setFruta] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await frutaCtrl.getLastPublished();
        setFruta(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!fruta) return null;

  const wallpaper = fruta.attributes.wallpaper;
  const enlaceurlServer = `${ENV.SERVER_HOST}`;
  const price = fn.calcDiscountedPrice(
    fruta.attributes.price,
    fruta.attributes.discount
  );

  const hasDiscount = fruta.attributes.discount > 0;

  return (
    <div className={styles.container}>
      <Image
        src={`${enlaceurlServer}${wallpaper.data.attributes.url}`}
        className={styles.wallpaper}
      />

      <Link className={styles.infoContainer} href={fruta.attributes.slug}>
        <Container>
          <h2>{fruta.attributes.title}</h2>

          <p className={styles.price}>
            {hasDiscount && (
              <Label.Discount>-{fruta.attributes.discount}%</Label.Discount>
            )}
            <span
              className={
                hasDiscount ? styles.finalPrice : styles.finalPriceNoDiscount
              }
            >
              {`${price}€${
                fruta.attributes.unidad ? ` / ${fruta.attributes.unidad}` : ""
              }`}
            </span>
          </p>
        </Container>
      </Link>
    </div>
  );
}
