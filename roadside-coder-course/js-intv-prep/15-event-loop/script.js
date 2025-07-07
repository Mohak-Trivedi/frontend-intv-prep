// Event Loop

// sync code:
// console.log("1");
// console.log("2");
// console.log("3");

// o/p:
// 1
// 2
// 3


// async code:
// console.log("1");
// setTimeout(() => {
//     console.log("2");
// }, 1000);
// console.log("3");

// o/p:
// 1
// 3
// 2 (appears after 1 sec)


// Even if we mention the timeout to be 0ms:
// console.log("1");
// setTimeout(() => {
//     console.log("2");
// }, 1000);
// console.log("3");

// o/p:
// 1
// 3
// 2

// reason is : Involvement of Task Queue in Event Loop
// Run on : https://www.jsv9000.app/

// Example 2: Involvement of Microtask Queue
// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((res) => res.json())
//     .then(function a(response) {
//         console.log("Fetch completed: ", response[0]);
//     })
//     .catch((err) => {
//         console.error("Fetch error: ", error);
//     });

// Promise.resolve().then(function b() {
//     console.log('Promise resolved');
// });

// Promise.reject().catch(function c() {
//     console.log("Promise rejected");
// });

//o/p:
// Promise resolved
// Promise rejected
// Fetch completed: Object { "body": "quia et suscipit suscipit recusandae 
// consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum 
// rerum est autem sunt rem eveniet architecto", "id": 1, "title": "sunt aut facere 
// repellat provident occaecati excepturi optio reprehenderit", "userId": 1, }


// Example 3: Involvement of both Task Queue and Microtask Queue
// Note: microtask queue has higher priority than Macrotask/task queue.
// console.log("Start");

// setTimeout(() => {
//     console.log("Inside setTimeout (macro - task)")
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Inside Promise (micro - task)");
// });

// console.log("End");

// o/p:
// Start
// End
// Inside Promise (micro - task)
// Inside setTimeout (macro - task)

///////////////////////////////////////////////////////////////////
// Interview Questions on Event Loop:

// Question - What is Event Loop?

// Answer:
// JS is single-threaded and the event loop is responsible for how its 
// asynchronous behaviour happens.
// The event loop is like a traffic controller in JS that manages the execution 
// of code. 
// It ensures tasks are processed in an orderly manner, handling asynchronous 
// operations by continuously checking if there are pending tasks in queues
// (microtasks and macrotasks).


// Question - Why we need event loop to manage these task queue and microtask queue?

// Answer:
// Explain with the Example 3


// Question - Predict the o/p:
// blockMainThread();

// console.log('Start');

// function blockMainThread() {
//     const start = Date.now();

//     while(Date.now() - start < 3000) {}

//     console.log('running...');
// }

// console.log('End');

// o/p:
// running... (after 3 seconds)
// Start
// End


// Question: What is the output?
// setTimeout(function a() {
//     console.log('a');
// }, 1000);
// setTimeout(function b() {
//     console.log('b');
// }, 500);
// setTimeout(function c() {
//     console.log('c');
// }, 0);

// function d() {
//     console.log('d Runs');
// }

// d();

// o/p:
// d Runs
// c
// b
// a

// Even though Task Queue : [a, b, c]
// Still order of execution is c b a because c's timer got over first then b's 
// and then a's


// Question - Predict the output:
// function a() {
//     for (var i = 0;i < 3;i++) {
//         setTimeout(function log() {
//             console.log(i);
//         }, i * 1000);
//     }
// }
// a();

// o/p:
// 3
// 3 (after 1 sec)
// 3 (after 2 sec)


// Question - How can you make the above code print 0 1 2 instead of 3 3 3?
// Answer:
// Use let instead of var.
// var has function scope hence each log() accesses the same i present in scope 
// of a(). This i has value of 3 by the time the log() present in the task queue
// start getting executed. 
// let has block scope hence each log() accesses the i of its own loop iteration
// i.e. the i present in its own iteration of for(){}. Due to Closure, each log()
// is able to access the i defined at the time of its iteration and hence first 
// log() has i = 0, second has i = 1, and last has i = 2.
// function a() {
//     for (let i = 0;i < 3;i++) {
//         setTimeout(function log() {
//             console.log(i);
//         }, i * 1000);
//     }
// }
// a();


// Question - Predict the output:
// Promise.resolve()
//     .then(function a() {
//         Promise.resolve().then(function d() {
//             console.log('d Runs');
//         });
//         Promise.resolve().then(function e() {
//             console.log('e Runs');
//         });
//         throw new Error("Error Occurred!");
//         Promise.resolve().then(function f() {
//             console.log('f Runs');
//         });
//     })
//     .catch(function b() {
//         console.log('b Runs');
//     })
//     .then(function c() {
//         console.log('c Runs');
//     });

// o/p:
// d Runs
// e Runs
// b Runs
// c Runs


// Question - Predict the output:
// Promise.resolve()
//     .then(function a() {
//         Promise.resolve().then(setTimeout(function d() {
//             console.log('d Runs');
//         }, 0));
//         Promise.resolve().then(function e() {
//             console.log('e Runs');
//         });
//         throw new Error("Error Occurred!");
//         Promise.resolve().then(function f() {
//             console.log('f Runs');
//         });
//     })
//     .catch(function b() {
//         console.log('b Runs');
//     })
//     .then(function c() {
//         console.log('c Runs');
//     });

// o/p:
// e Runs
// b Runs
// c Runs
// d Runs


// Predict the output:
// function pause(millis) {
//     return new Promise(function p(resolve) {
//         setTimeout(function s() {
//             resolve("resolved");
//         }, millis);
//     });
// }

// const start = Date.now();
// console.log("Start");

// pause(1000).then((res) => {
//     const end = Date.now();
//     const secs = (end - start) / 1000;
//     console.log(res, ":", secs);
// });

// o/p:
// Start
// resolved : 1.155

// (Note: The exact elapsed time might vary slightly due to the nature of timing
// and event loop handling in JavaScript.)