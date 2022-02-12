export const zeroPad = (x, places) => {
  let zero = places - x.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + x;
};
