// Problem: https://www.greatfrontend.com/questions/javascript/promise-all-settled


// Approach 1: Using async-await:
/**
 * @param {Array} iterable
 * @return {Promise<Array<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>>}
 */
export default function promiseAllSettled(iterable) {


  return new Promise((resolve, reject) =>{
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if(unresolved === 0) {
      resolve([]);
      return;
    }

    iterable.forEach(async (val, idx) => {
      try {
        const resolvedVal = await val;
        results[idx] = {
          status: 'fulfilled',
          value: resolvedVal,
        };
      } catch(err) {
        results[idx] = {
          status: 'rejected',
          reason: err,
        };
      }

      unresolved -= 1;
      if(unresolved === 0) {
        resolve(results);
      }
    });
  });
}