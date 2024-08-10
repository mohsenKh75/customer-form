export function toCurrency(
  value?: number | string,
  isToman = false,
  isInput = false
) {
  if (value === undefined) {
    return "";
  }

  let price = Number(value?.toString()?.replace?.(/,/g, ""));

  if (isNaN(price)) {
    return isInput ? "" : "۰";
  }

  if (!isToman) {
    price = Math.floor(price / 10);
  }
  let priceText = String(price).replace(/\$|,/g, "");
  for (let i = 0; i < Math.floor((priceText.length - (1 + i)) / 3); i++) {
    priceText =
      priceText.substring(0, priceText.length - (4 * i + 3)) +
      "," +
      priceText.substring(priceText.length - (4 * i + 3));
  }

  return priceText;
}
