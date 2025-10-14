// Problem Statement: https://www.greatfrontend.com/questions/javascript/curry-ii?list=three-months

/**
 * @param {Function} func
 * @return {Function}
 */
// export default function curry(func) {
//   return function curriedFunc(...args) {
//     // Filter out any empty calls (no arguments provided)
//     const filteredArgs = args.filter((arg) => arg !== undefined);

//     if (filteredArgs.length >= func.length) {
//       // Apply the original function with the correct 'this' context
//       return func.apply(this, filteredArgs);
//     } else {
//       function intermediaryFunc(...nextArgs) {
//         // Preserve 'this' context using .bind(this)
//         return curriedFunc.apply(this, [...filteredArgs, ...nextArgs]);
//       }

//       // to preserve the context of this ACROSS MULTIPLE calls of intermediary function
//       return intermediaryFunc.bind(this);
//     }
//   };
// }


/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    if(args.length >= func.length) {
      return func.apply(this, args);
    }

    return curried.bind(this, ...args);
  }
}