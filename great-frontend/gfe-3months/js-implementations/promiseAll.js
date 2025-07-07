// Problem: https://www.greatfrontend.com/questions/javascript/promise-all?list=three-months

/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default async function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    if (iterable.length === 0) {
      resolve([]);
      return;
    }

    iterable.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value; // Store result in order
          completed += 1;

          // Resolve only if all promises are completed
          if (completed === iterable.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error); // Reject as soon as one promise fails
        });
    });
  });
}


// Below code fails
// Why? Because we are not processing the promises in the iterable in a concurrent
// manner like Promise.all does, but we are doing it sequentially.
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
// export default async function promiseAll(iterable) {
//   let results = [];

//   for (let i = 0; i < iterable.length; i++) {
//     try {
//       let val = await iterable[i];
//       results.push(val);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

// //   console.log(results);
//   return Promise.resolve(results);
}