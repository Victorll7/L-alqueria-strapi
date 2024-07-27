import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Fruta } from "@/api";
import { CartLayout } from "@/layouts";
import { useCart } from "@/hooks";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";

const frutaCtrl = new Fruta();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);
  const [frutas, setFrutas] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await frutaCtrl.getFrutaById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setFrutas(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <Seo title="Carrito" />

      <CartLayout>
        {currentStep === 1 && <Cart.StepOne frutas={frutas} />}
        {currentStep === 2 && <Cart.StepTwo frutas={frutas} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}
