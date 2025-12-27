export const formatNumber = (amount: string | number) => {
  const { decimalCount = 0, decimal = ",", thousands = ".", prefix = "" } = {};

  if (!amount) {
    return "0";
  }

  let countDecimal = decimalCount;
  let symbol = "";

  let formattedAmount = Number(amount);

  try {
    countDecimal = Math.abs(countDecimal);
    countDecimal =
      Number(formattedAmount) === 0
        ? 0
        : isNaN(countDecimal)
        ? 2
        : countDecimal;

    const i = parseInt(
      String((amount = Math.abs(Number(formattedAmount) || 0)))
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    const sliceComma = () => {
      const splitted = String(Math.round(formattedAmount)).split(".");
      return splitted.length > 1
        ? `${decimal}${splitted[1]?.slice(0, countDecimal)}`
        : "";
    };

    return (
      prefix +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      sliceComma() +
      symbol
    );
  } catch (e) {
    console.log(e);
  }
};
