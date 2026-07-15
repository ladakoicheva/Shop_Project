import type { productI } from "../../types/types";

export const minSort = (a:productI, b:productI) => {

  if (a.price > b.price) {
    return 1;
  }
  if (a.price < b.price) {
    return -1;
  }

  return 0;
}

export const maxSort = (a:productI, b:productI) => {

  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }

  return 0;
}
