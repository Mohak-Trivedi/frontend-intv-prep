// Problem: https://www.greatfrontend.com/questions/javascript/promise-all

// Approach 1: Using async-await:
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);

    // How will we come to know that all the values of iterable have been resolved?
    // We can track them by initializing a counter of unresolved values and decrement it
    // whenever a value is resolved.
    let unresolved = iterable.length;

    // Resolve with empty array if the iterable is empty.
    if (unresolved === 0) {
      resolve(results);
      return;
    }

    // Iterate with forEach by mentioning value as well as index because we don't just need
    // to return the results array but it must be in the same order in which the corresponding
    // inputs are present in the iterable.
    iterable.forEach(async (val, idx) => {
      try {
        const resolvedVal = await val;
        results[idx] = resolvedVal;
        unresolved -= 1;

        if(unresolved === 0) {
          resolve(results);
        }
      } catch(err) {
        // If any value is rejected, we must reject the top-level promise immediately without
        // waiting for any other pending promises.
        reject(err);
      }
    });
  });
}
