import { useState } from "react";
import { ENV } from "@/utils";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import styles from "./Panel.module.scss";

export function Panel(props) {
  const { frutaId, fruta } = props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  const addCartWrapper = () => {
    setLoading(true);
    addCart(frutaId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const enlaceurlServer = `${ENV.SERVER_HOST}`;

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <Image src={`${enlaceurlServer}${fruta.cover.data.attributes.url}`} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{fruta.title}</h2>

          <div className={styles.moreInfo}>
            <span>
              <Icon name="check" />
              En stock
            </span>
          </div>

          <div className={styles.price}>
            {fruta.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {fruta.price}€{fruta.unidad && ` / ${fruta.unidad}`}
                </span>

                <span className={styles.discount}>-{fruta.discount}%</span>
              </>
            )}

            <span className={styles.price}>
              {fn.calcDiscountedPrice(fruta.price, fruta.discount)}€
              {fruta.unidad && ` / ${fruta.unidad}`}
            </span>
          </div>

          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Añadir al carrito
          </Button>

          <WishlistIcon frutaId={frutaId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
