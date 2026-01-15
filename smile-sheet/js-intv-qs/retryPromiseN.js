// Problem: https://learnersbucket.com/examples/interview/retry-promises-n-number-of-times-in-javascript/

// .then() based:
function wait(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), delay);
    });
}

function retryWithDelay(operation, retries = 3, delay = 50, finalError = 'Retry Failed') {
    return new Promise((resolve, reject) => {
        operation().then(resolve).catch((reason) => {
            if(retries <= 0) reject(finalError);

            wait(delay).then(() => retryWithDelay(operation, retries - 1, delay, finalError)).then(resolve).catch(reject);
        });
    });
}