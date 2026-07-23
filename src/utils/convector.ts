// const USD : number = 44;
// export const getUSDtoUAN = (usd : number) : number => Math.round(usd * USD);
// export const getUANtoUSD = (uan: number): number => Math.round(uan / USD);

/////////////////////////
export const convector = (baseCurrency:string, convertFromCurrency: string,  amount: number,  ratesObj: { [rate: string]: number }):number => {
  if (baseCurrency === convertFromCurrency) return amount;
  const value = amount * (ratesObj[baseCurrency] / ratesObj[convertFromCurrency]);
  return +value.toFixed(2);
}