// Problem Link: https://www.greatfrontend.com/questions/javascript/array-filter?list=three-months

/**
 * @template T
 * @param { (value: T, index: number, array: Array<T>) => boolean } callbackFn
 * @param {any} [thisArg]
 * @return {Array<T>}
 */
// Array.prototype.myFilter = function (callbackFn, thisArg) {
//   let res = [];

//   for (let i = 0; i < this.length; i++) {
//     let cbVal = callbackFn.call(thisArg, this[i], i, this);

//     if (cbVal) {
//       res.push(this[i]);
//     }
//   }

//   return res;
// };
[1, , 5].forEach((val) => console.log(val));
