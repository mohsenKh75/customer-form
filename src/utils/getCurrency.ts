import { toFa } from "./toFa";
import { toCurrency } from "./toCurrency";

export function getCurrency(amount: number) {
  return toFa(toCurrency(amount));
}
