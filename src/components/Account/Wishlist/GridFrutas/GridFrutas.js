import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn, ENV } from "@/utils";
import styles from "./GridFrutas.module.scss";

export function GridFrutas(props) {
  const { wishlist, onReload } = props;
  const enlaceurlServer = `${ENV.SERVER_HOST}`;

  return (
    <div className={styles.gridFrutas}>
      {map(wishlist, (item) => {
        const fruta = item.attributes.fruta.data;
        const cover = fruta.attributes.cover.data;

        return (
          <div key={item.id} className={styles.fruta}>
            <Link href={`/${fruta.attributes.slug}`}>
              <div>
                <img src={`${enlaceurlServer}${cover.attributes.url}`} />

                {fruta.attributes.discount > 0 && (
                  <Label.Discount className={styles.discount}>
                    {`-${fruta.attributes.discount}%`}
                  </Label.Discount>
                )}
              </div>

              <div>
                <span>{fruta.attributes.title}</span>
                <span className={styles.price}>
                  {fn.calcDiscountedPrice(
                    fruta.attributes.price,
                    fruta.attributes.discount
                  )}
                  €{fruta.attributes.unidad && ` / ${fruta.attributes.unidad}`}
                </span>
              </div>
            </Link>

            <WishlistIcon
              frutaId={fruta.id}
              className={styles.whislistIcon}
              removeCallback={onReload}
            />
          </div>
        );
      })}
    </div>
  );
}
