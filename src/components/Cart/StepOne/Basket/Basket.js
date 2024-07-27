import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn, ENV } from "@/utils";
import { useCart } from "@/hooks";
import styles from "./Basket.module.scss";

export function Basket(props) {
  const { frutas } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  const enlaceurlServer = `${ENV.SERVER_HOST}`;

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {map(frutas, (fruta) => (
          <div key={fruta.id} className={styles.product}>
            <Image
              src={`${enlaceurlServer}${fruta.attributes.cover.data.attributes.url}`}
            />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{fruta.attributes.title}</p>
                  <p>{fruta.attributes.category.data.attributes.title}</p>
                </div>

                <Icon
                  name="trash alternate online"
                  link
                  onClick={() => deleteItem(fruta.id)}
                />
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className="number"
                  options={options}
                  selection
                  value={fruta.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(fruta.id, data.value)
                  }
                />
                <span>
                  {fn.calcDiscountedPrice(
                    fruta.attributes.price,
                    fruta.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
