export const converArrayOfObjectsToMap = (objects) => {
  return objects.reduce((accumulator, obj) => {
    accumulator[obj.id] = obj;
    return accumulator;
  }, {});
};
