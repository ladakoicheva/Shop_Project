const USD : number = 44;
export const getUSDtoUAN = (usd : number) : number => Math.round(usd * USD);
export const getUANtoUSD = (uan:number):number => Math.round(uan / USD);