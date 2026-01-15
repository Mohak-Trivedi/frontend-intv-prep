// Problem: https://learnersbucket.com/examples/interview/retry-promises-n-number-of-times-in-javascript/

function wait(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), delay);
    });
}

// .then() based:
// function retryWithDelay(operation, retries = 3, delay = 50, finalError = 'Retry Failed') {
//     return new Promise((resolve, reject) => {
//         operation().then(resolve).catch((reason) => {
//             if(retries <= 0) reject(finalError);

//             wait(delay).then(() => retryWithDelay(operation, retries - 1, delay, finalError)).then(resolve).catch(reject);
//         });
//     });
// }

// async await based:
async function retryWithDelay(operation, retries = 3, delay = 50, finalError = 'Retry Failed') {
    try {
        return await operation();
    } catch(err) {
        if(retries <= 0) return Promise.reject(finalError);

        await wait(delay);

        return retryWithDelay(operation, retries - 1, delay, finalError);
    }
}