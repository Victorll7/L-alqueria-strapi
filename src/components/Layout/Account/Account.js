// Account.js
import { useState, useEffect } from "react";
import { Button, Icon, Input, Label } from "semantic-ui-react";

import { useRouter } from "next/router";
import { useAuth, useCart } from "@/hooks";
import classNames from "classnames";
import styles from "./Account.module.scss";

export function Account(props) {
  const { isOpenSearch } = props;
  const { user } = useAuth();
  const router = useRouter();
  const { total } = useCart();

  const [showSearch, setShowSearch] = useState(isOpenSearch);
  const [searchText, setSearchText] = useState("");

  const openCloseSearch = () => setShowSearch((prevState) => !prevState);

  const goToLogin = () => router.push("/join/sign-in");
  const goToAccount = () => router.push("/account");

  const goToCart = () => {
    if (!user) goToLogin();
    else router.push("/cart");
  };

  useEffect(() => {
    setSearchText(router.query.s || "");
  }, [router.query.s]);

  const onSearch = (text) => {
    setSearchText(text);
    router.replace(`/search?s=${text}`);
  };

  return (
    <div className={styles.account}>
      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <Input
          id="search-frutas"
          placeholder="Buscador"
          className={styles.input}
          focus={true}
          value={searchText}
          onChange={(_, data) => onSearch(data.value)}
        />
        <button className={styles.search} onClick={openCloseSearch}>
          <Icon name="search" />
        </button>
      </div>

      <Button icon className={styles.cart}>
        <Icon name="cart" onClick={goToCart} />
        {total > 0 && <Label circular> {total}</Label>}
      </Button>

      <Button
        icon
        className={classNames(styles.user, { [styles.loggedIn]: user })}
        onClick={user ? goToAccount : goToLogin}
      >
        <Icon name="user outline" />
      </Button>
    </div>
  );
}
