// Problem link: https://www.greatfrontend.com/questions/javascript/sum?list=three-months

/**
 * @param {number} value
 * @return {Function}
 */
export default function sum(value) {
  if (value === undefined) throw new Error("Pass an argument");
  return function curried(ele) {
    // [arg arr]
    if (!ele && ele !== 0) {
      return value;
    } else {
      return sum(ele + value);
    }
  };
}
