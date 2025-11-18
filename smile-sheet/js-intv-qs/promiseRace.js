// Problem: https://www.greatfrontend.com/questions/javascript/promise-race

// Approach 1: Using async-await:
/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseRace(iterable) {
  return new Promise((resolve, reject)=> {
    // if the input array is empty, return a forever-pending promise.
    // i.e. return without calling resolve() or reject()
    if(iterable.length === 0) {
      return;
    }

    iterable.forEach(async (val) => {
      try {
        const resolvedVal = await val;
        resolve(resolvedVal);
      } catch(err) {
        reject(err);
      }
    });
  });
}

// Approach 2: Using Promise.then (in case async-await is not allowed)
/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseRace(iterable) {
  return new Promise((resolve, reject)=> {
    // if the input array is empty, return a forever-pending promise.
    // i.e. return without calling resolve() or reject()
    if(iterable.length === 0) {
      return;
    }

    iterable.forEach(async (val) => {
      Promise.resolve(val).then(
        (resolvedVal) => {
          resolve(resolvedVal);
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}