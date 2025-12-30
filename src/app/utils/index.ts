export const formatNumber = (amount: string | number) => {
  if (!amount) return "0"
  const num = Number(amount)

  return new Intl.NumberFormat("id-ID").format(num)
}
