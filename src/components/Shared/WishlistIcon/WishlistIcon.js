import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import styles from "./WishlistIcon.module.scss";

const wishlistCtrl = new Wishlist();

export function WishlistIcon(props) {
  const { frutaId, className, removeCallback } = props;
  const [hasWishlist, setHasWishlist] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.check(user.id, frutaId);
        setHasWishlist(response);
      } catch (error) {
        setHasWishlist(false);
        console.error(error);
      }
    })();
  }, [frutaId]);

  const addWishlist = async () => {
    const response = await wishlistCtrl.add(user.id, frutaId);
    setHasWishlist(response);
  };

  const deleteWishlist = async () => {
    try {
      await wishlistCtrl.delete(hasWishlist.id);
      setHasWishlist(false);

      if (removeCallback) {
        removeCallback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (hasWishlist === null) return null;

  return (
    <Icon
      name={hasWishlist ? "heart" : "heart outline"}
      onClick={hasWishlist ? deleteWishlist : addWishlist}
      className={classNames(styles.wishlistIcon, {
        [className]: className,
      })}
    />
  );
}
