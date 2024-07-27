import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ENV } from "@/utils";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import { Label } from "@/components/Shared";
import { Button, Icon } from "semantic-ui-react";
import styles from "./GridFrutas.module.scss";

export function GridFrutas(props) {
  const { frutas, showTitle } = props;
  const enlaceurlServer = `${ENV.SERVER_HOST}`;
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { addCart } = useCart();
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const addCartWrapper = (frutaId) => {
    setLoading((prevState) => ({ ...prevState, [frutaId]: true }));
    addCart(frutaId);

    setTimeout(() => {
      setLoading((prevState) => ({ ...prevState, [frutaId]: false }));
    }, 500);
  };

  const handleLinkClick = (event) => {
    // Evitar la navegación si el botón dentro del Link fue clickeado
    if (event.target.tagName.toLowerCase() === "button") {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.gridFrutas}>
      {showTitle && (
        <p
          ref={titleRef}
          className={`${styles.title} ${isVisible ? styles.visible : ""}`}
        >
          Fruta de temporada
        </p>
      )}
      <div className={styles.grid}>
        {map(frutas, (fruta, index) => (
          <Link
            key={fruta.id}
            href={`/${fruta.attributes.slug}`}
            className={`${styles.fruta} ${isVisible ? styles.shuffle : ""}`}
            onClick={handleLinkClick} // Manejar clics en el Link
          >
            <div>
              <img
                src={`${enlaceurlServer}${fruta.attributes.cover?.data.attributes.url}`}
                alt={fruta.attributes.title}
              />
              {fruta.attributes.discount > 0 && (
                <Label.Discount className={styles.discount}>
                  {`-${fruta.attributes.discount}%`}
                </Label.Discount>
              )}
            </div>

            <div className={styles.infoContainer}>
              <span>{fruta.attributes.title}</span>
              <span className={styles.price}>
                {`${fn.calcDiscountedPrice(
                  fruta.attributes.price,
                  fruta.attributes.discount
                )} €${
                  fruta.attributes.unidad ? ` / ${fruta.attributes.unidad}` : ""
                }`}
              </span>
            </div>

            <div>
              <Button
                primary
                fluid
                onClick={() => addCartWrapper(fruta.id)}
                loading={loading[fruta.id]}
                className={styles.addToCartButton}
              >
                Añadir al carrito
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
