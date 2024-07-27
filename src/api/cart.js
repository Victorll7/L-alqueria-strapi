import { forEach } from "lodash";
import { ENV, authFetch } from "@/utils";

export class Cart {
  add(frutaId) {
    const frutas = this.getAll();
    const objIndex = frutas.findIndex((fruta) => fruta.id === frutaId);

    if (objIndex < 0) {
      frutas.push({ id: frutaId, quantity: 1 });
    } else {
      const fruta = frutas[objIndex];
      frutas[objIndex].quantity = fruta.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(frutas));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }

  changeQuantity(frutaId, quantity) {
    const frutas = this.getAll();
    const objIndex = frutas.findIndex((fruta) => fruta.id === frutaId);

    frutas[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(frutas));
  }

  delete(frutaId) {
    const frutas = this.getAll();
    const updatefrutas = frutas.filter((fruta) => fruta.id !== frutaId);

    localStorage.setItem(ENV.CART, JSON.stringify(updatefrutas));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping: address,
        }),
      };

      const response = await authFetch(url, params);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
