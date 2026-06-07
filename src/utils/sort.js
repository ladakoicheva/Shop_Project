export const minSort = (a, b) => {

  if (a.price > b.price) {
    return 1;
  }
  if (a.price < b.price) {
    return -1;
  }

  return 0;
}

export const maxSort = (a, b) => {

  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }

  return 0;
}
