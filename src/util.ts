export function brNumber(num: number, digits: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumSignificantDigits: digits,
    maximumSignificantDigits: digits,
  }).format(num);
}
