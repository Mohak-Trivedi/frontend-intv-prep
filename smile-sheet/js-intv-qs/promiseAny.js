// Problem: https://www.greatfrontend.com/questions/javascript/promise-any

// Approach 1: Using async-await:
/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    // We need to reject with new AggregateError(errors) where 'errors' must be an array
    // of errors in the same order as in iterable, if all the promises are rejected.
    // So, to store the errors in the same order, use an array
    const errors = new Array(iterable.length);
    // And to track if all the promises are rejected, maintain a rejection counter.
    let rejectCount = 0;

    // If an empty iterable is passed, then the promise returned by this method is rejected synchronously.
    // The rejected reason is an AggregateError object whose errors property is an empty array.
    if(iterable.length === 0) {
      reject(new AggregateError([]));
    }

    iterable.forEach(async (val, idx) => {
      try {
        const resolvedVal = await val;
        resolve(resolvedVal);
      } catch(err) {
        errors[idx] = err;
        rejectCount++;
        if(rejectCount === iterable.length) {
          reject(new AggregateError(errors));
        }
      }
    });
  });
}
