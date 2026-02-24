// Fixed 2 functions, Only Sync functions
// function pipe(fn1, fn2) {
//     return function inner(input) {
//         const res1 = fn1(input);
//         const res2 = fn2(res1);
//         return res2;
//     }
// }

// Test with:
// const add = x => x + 1;
// const double = x => x * 2;
// const final = pipe(add, double)(3);
// console.log(final);

// Any number of functions, Only Sync functions
// function pipe(...funcs) {
//     return function inner(input) {
//         const fn1 = funcs[0];
//         let res = fn1(input);

//         for(let i = 1;i < funcs.length;i++) {
//             const nextFunc = funcs[i];
//             res = nextFunc(res);
//         }

//         return res;
//     }
// }

// Test with:
// const add = x => x + 1;
// const double = x => x * 2;
// const triple = x => x * 3;
// const final = pipe(add, double, triple)(3);
// console.log(final);

// Same as above, but more generalized
// We want to pass res even to the first function but we want res to be input
// So initialize res = input
// Also, this handles the case when input is passed but no functions are passed to pipe, so we can return the input as it is.
// function pipe(...funcs) {
//     return function inner(input) {
//         let res = input;

//         for(const func of funcs) {
//             res = func(res);
//         }

//         return res;
//     }
// }

// Test with:
// const add = x => x + 1;
// const double = x => x * 2;
// const triple = x => x * 3;
// const final = pipe(add, double, triple)(3);
// console.log(final);

// Any number of functions, Only Async function
// function pipe(...funcs) {
//   return function inner(input) {
//     let res = input;

//     for (const func of funcs) {
//       res = func(res);
//     }

//     return res;
//   }
// }

// const add = x => x + 1;
// const double = x => x * 2;
// const triple = x => x * 3;

// const asyncSquare = async (x) => x * x;

// console.log(pipe(asyncSquare)(3)); // Promise { 9 }
// console.log(pipe(asyncSquare, add)(3)); // [object Promise]1, but expected 10 i.e. 9 + 1
// This happened because Promise { 9 } i.e. "[object Promise]" + 1 = [object Promise]1
// Hence, we need to detect that if the current function's result is a Promise i.e. it is thenable
// then we must wait for the promise to resolve and only then we must run the functions after it.
// Hence, make the following changes:

// function pipe(...funcs) {
//   return function inner(input) {
//     let res = input;

//     for (const func of funcs) {
//       if (res && typeof res.then === "function") {
//         res = res.then(func);
//       } else {
//         res = func(res);
//       }
//     }

//     return res;
//   }
// }

// const add = x => x + 1;
// const double = x => x * 2;
// const triple = x => x * 3;

// const asyncSquare = async (x) => x * x;

// Promise.resolve(pipe(asyncSquare)(3)).then(res => console.log(res)); // 9
// Promise.resolve(pipe(asyncSquare, add)(3)).then(res => console.log(res)); // 10
// If we use console.log() directly instead of Promise.resolve, then, we get:
// console.log(pipe(asyncSquare)(3)) // Promise { 9 }
// console.log(pipe(asyncSquare, add)(3)) // Promise { <pending> }

// Alternative approach: If performance upon treating sync as async doesn't matter:
function pipe(...funcs) {
  return function inner(input) {
    let res = input;

    for (const func of funcs) {
      res = Promise.resolve(res).then(func);
    }

    return res;
  }
}

const add = x => x + 1;
const double = x => x * 2;
const triple = x => x * 3;

const asyncSquare = async (x) => x * x;

// console.log(pipe(asyncSquare)(3)) // Promise { <pending> }
// console.log(pipe(asyncSquare, add)(3)) // Promise { <pending> }
Promise.resolve(pipe(asyncSquare)(3)).then(res => console.log(res)); // 9
Promise.resolve(pipe(asyncSquare, add)(3)).then(res => console.log(res)); // 10