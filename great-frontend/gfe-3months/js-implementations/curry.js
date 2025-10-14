// Problem Link: https://www.greatfrontend.com/questions/javascript/curry?list=three-months

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
//       function intermediaryFunc(nextArgs) {
//         // Preserve 'this' context using .bind(this)
//         return curriedFunc.apply(this, [...filteredArgs, nextArgs]);
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
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return curried.bind(this, ...args);
  };
}

/*
Edge cases to consider:
1. Empty Arguments:
const curried = curry(mulThree);
curried()(4)()(3)()(2);


2. Multiple Arguments:
const curried = curry(function (this: any, foo: number, bar: number) {
  return this.base * foo + bar;
});

const obj = { base: 5, mul: curried };

obj.mul(3)(4)(2)
*/
