export const converShopsToMap = (shops) => {
  return shops.reduce((accumulator, shop) => {
    accumulator[shop.id] = shop;
    return accumulator;
  }, {});
};
