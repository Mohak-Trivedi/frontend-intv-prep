// Problem link: https://www.greatfrontend.com/questions/javascript/array-map?list=three-months

/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */
Array.prototype.myMap = function (cb, thisArg) {
  let res = new Array(this.length); // Create an array of the same length
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      // Check if the index exists in the array (i.e., it is not a "hole")
      res[i] = cb.call(thisArg, this[i], i, this);
    }
  }
  return res;
};
