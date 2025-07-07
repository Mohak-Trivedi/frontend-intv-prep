// Problem: https://www.greatfrontend.com/questions/javascript/function-bind?list=three-months

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
  if (typeof this !== "function") {
    throw new TypeError("mybind can be called only on functions");
  }

  //  let context = thisArg;
  let func = this;

  return function (...arg) {
    //[arr]
    return func.call(thisArg, ...argArray, ...arg);
  };
};
