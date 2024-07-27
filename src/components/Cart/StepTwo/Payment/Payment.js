import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import styles from "./Payment.module.scss";

export function Payment() {
  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontSize: "16px",
        "::placeholder": {
          color: "#909090",
        },
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className={styles.payment}>
      <h2>Métodos de pago</h2>

      <div className={styles.block}>
        <CardElement options={cardStyle} />
      </div>
    </div>
  );
}
