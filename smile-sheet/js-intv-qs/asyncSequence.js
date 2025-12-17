// Problem: https://bigfrontend.dev/problem/implement-async-helper-sequence

// Approach 1: Using Recursion:

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
function sequence(funcs){
  // your code here
  return function(cb, data) {
    function execute(i, data) {
      if(i >= funcs.length) return cb(undefined, data); // using undefined instead of null for: sequence() should work for async without data spec  Expected null to be undefined.

      const currentFunc = funcs[i];
      currentFunc((err, data) => {
        if(err) return cb(err, data);

        execute(i+1, data);
      }, data);
    }
    execute(0, data);
  }
}