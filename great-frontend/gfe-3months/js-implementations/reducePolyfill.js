/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {Array<U>}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let acc;
  if (initialValue === undefined) {
    if (this[0] !== undefined) {
      acc = this[0];
    } else {
      throw new Error("Array is empty.");
    }
  } else {
    acc = initialValue;
  }

  let currIndex = initialValue !== undefined ? 0 : 1;
  let currVal = this[currIndex];

  for (; currIndex < this.length; currIndex++) {
    currVal = this[currIndex];
    if (!!currVal) acc = callbackFn(acc, currVal, currIndex, this);
    else continue;
  }

  return acc;
};
