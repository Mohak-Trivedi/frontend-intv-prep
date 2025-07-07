// Debouncing and Throttling
// Question - Create a button UI and debounce as follows:
// - Show "Button Pressed <X> Times" every time button is pressed.
// - Increase "Triggered <Y> Times" count after 800ms of debounce.

// Answer:
// const btn = document.querySelector('.increment_btn');
// const btnPress = document.querySelector('.increment_pressed');
// const count = document.querySelector('.increment_count');

// var pressedCount = 0;
// var triggeredCount = 0;

// // Method 1: Using inbuilt Lodash debounce function
// const debouncedCount = _.debounce(() => {
//     count.innerHTML = ++triggeredCount;
// }, 800);

// btn.addEventListener('click', () => {
//     btnPress.innerHTML = ++pressedCount;
//     debouncedCount();
// });


// Question - Create a button UI and throttle as follows:
// - Show "Button Pressed <X> Times" every time button is pressed.
// - Increase "Triggered <Y> Times" count after 800ms of debounce.

// Answer:
// const btn = document.querySelector('.increment_btn');
// const btnPress = document.querySelector('.increment_pressed');
// const count = document.querySelector('.increment_count');

// var pressedCount = 0;
// var triggeredCount = 0;

// // Method 1: Using inbuilt Lodash throttle function
// const throttledCount = _.throttle(() => {
//     count.innerHTML = ++triggeredCount;
// }, 800);

// btn.addEventListener('click', () => {
//     btnPress.innerHTML = ++pressedCount;
//     throttledCount();
// });


// Question - Debounce Polyfill

// Answer:
// const btn = document.querySelector('.increment_btn');
// const btnPress = document.querySelector('.increment_pressed');
// const count = document.querySelector('.increment_count');

// var pressedCount = 0;
// var triggeredCount = 0;

// // Method 2: Using Debounce Polyfill
// // Requirements seen from Lodash debounce():
// // - Takes in : a callback and a time (delay)
// // - Returns: a debounced function
// const myDebounce = (cb, delay) => {
//     // Since we need to measure the time after every keystroke or button press,
//     // we need to maintain a timer.
//     let timer;

//     // ...args to rest the extra arguments that we pass to myDebouncedCount()
//     // that must also be passed to the callback
//     return function (...args) {
//         if(timer) clearTimeout(timer);

//         timer = setTimeout(() => {
//             cb(...args);
//         }, delay);
//     }
// };

// const myDebouncedCount = myDebounce(() => {
//     count.innerHTML = ++triggeredCount;
// }, 800);

// btn.addEventListener('click', () => {
//     btnPress.innerHTML = ++pressedCount;
//     myDebouncedCount();
// });

// What happens if we don't mention:
// if(timer) clearTimeout(timer);
// In that case, suppose, we press button 3 times before 800ms gap, callback
// won't be executed at all, but, after 800ms pass after the 3rd click and we haven't 
// made another click, then instead of executing callback only once i.e. for the
// 3rd click, the callback is executed 3 times i.e. for all the 3 clicks.
// This happens because the timeout of the previous clicks still exists as their
// time hasn't exhausted yet and we made another click.


// Question - Throttle Polyfill

// Answer:
// const btn = document.querySelector('.increment_btn');
// const btnPress = document.querySelector('.increment_pressed');
// const count = document.querySelector('.increment_count');

// var pressedCount = 0;
// var triggeredCount = 0;

// // Method 1: Using inbuilt Lodash throttle function
// const throttledCount = _.throttle(() => {
//     count.innerHTML = ++triggeredCount;
// }, 800);

// Method 2: Using Throttle Polyfill
// Requirements seen from the Lodash throttle function:
// - Takes in: a callback and a time (delay)
// - Returns: a throttled function 
// const myThrottle = (cb, delay) => {
//     let last = 0; // the time at which the last callback got executed

//     return function (...args) {
//         let now = new Date().getTime(); // current event's time
//         if (now - last < delay) return; // delay not achieved so don't execute callback for current event
//         last = now; // delay achieved, so this time is the 'last' time
//         return cb(...args); // execute callback and return the value returned by it.
//     };
// }; 

// const myThrottledCount = myThrottle(() => {
//     count.innerHTML = ++triggeredCount;
// }, 800);

// btn.addEventListener('click', () => {
//     btnPress.innerHTML = ++pressedCount;
//     myThrottledCount();
// });