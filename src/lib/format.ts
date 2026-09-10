export const formatNaira = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)

export const discountedPrice = (price: number, discount: number) =>
  Math.round(price * (1 - discount / 100))
