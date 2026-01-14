// Problem: https://bigfrontend.dev/problem/implement-async-helper-parallel


/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs){
  return function inner(finalCb) {
    let hasError = false;
    const results = [];

    funcs.forEach((func, idx) => {
      func((err, newData) => {
        if(hasError) return;

        if(err) {
          hasError = true;
          finalCb(err, undefined);
          return;
        }

        results[idx] = newData;
        if(idx === funcs.length-1) {
          finalCb(undefined, results);
        }
      });
    });
  }
}