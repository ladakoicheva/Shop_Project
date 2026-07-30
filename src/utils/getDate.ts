export const getDateDDMMYYYY = (time:number) => {
  const date = new Date(time)
  const YYYY = date.getFullYear();
  const DD = String(date.getDate()).padStart(2,'0');
  const MM = String(date.getMonth()+1).padStart(2,'0');

  return `${DD}.${MM}.${YYYY}`
}