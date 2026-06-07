const USD = 44;
export const getUSDtoUAN = (usd) => Math.round(usd * USD);
export const getUANtoUSD = (uan) => Math.round(uan / USD);