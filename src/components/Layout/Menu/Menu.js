import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import { Category } from "@/api";
import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const categoryCtrl = new Category();

export function Menu() {
  const [categories, setCategories] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>
      <div className={`${styles.categories} ${menuOpen ? styles.open : ""}`}>
        {map(categories, (category) => {
          const iconUrl = category.attributes.icon?.data?.attributes?.url;

          return (
            <Link
              key={category.id}
              href={`/frutas/${category.attributes.slug}`}
            >
              <div
                className={styles.category}
                onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic en una categoría
              >
                {iconUrl && <Image src={iconUrl} />}
                <span>{category.attributes.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
