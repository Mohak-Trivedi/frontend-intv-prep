// Problem: https://bigfrontend.dev/problem/implement-async-helper-race

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
function race(funcs){
  // your code here
  return function inner(finalCb, data) {
    let hasError = false, hasData = false;

    funcs.forEach((func) => {
      func((err, newData) => {
        if(hasError || hasData) return;

        if(err) {
          hasError = true;
          finalCb(err, undefined);
          return;
        }

        hasData = true;
        finalCb(undefined, newData);
        return;
      });
    });
  }
}