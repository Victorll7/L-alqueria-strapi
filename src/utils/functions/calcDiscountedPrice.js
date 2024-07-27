export function calcDiscountedPrice(price, discount) {
  if (!discount) return price.toFixed(2);

  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;

  return finalPrice.toFixed(2);
}
