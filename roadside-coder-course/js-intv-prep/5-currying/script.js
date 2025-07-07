// Currying in JS
// Example f(a, b) into f(a)(b)
// function f(a, b) {
//     return `${a} ${b}`;
// }

// function f(a) {
//     return function (b) {
//         return `${a} ${b}`;
//     };
// }
// console.log(f(5)(6));   


// Question - sum(2)(6)(1)
// After writing the code, can explain by running sum(2) first then sum(2)(6)
// and finally sum(2)(6)(1) 
// function sum (a) {
//     return function (b) {
//         return function (c) {
//             return (a + b + c);
//         }
//     }
// }
// console.log(sum(2)(6)(1));


// Question - 
/* 
evaluate("sum")(4)(2) -> 6
evaluate("multiply")(4)(2) -> 8
evaluate("divide")(4)(2) -> 2
evaluate("subtract")(4)(2) -> 2
 */

// function evaluate (oper) {
//     return function (num1) {
//         return function (num2) {
//             switch (oper) {
//                 case 'sum':
//                     return num1 + num2;
//                 case 'multiply':
//                     return num1 * num2;
//                 case 'divide':
//                     return num1 / num2;
//                 case 'subtract':
//                     return num1 - num2;
//             }
//         }
//     }
// }
// console.log(evaluate("sum")(4)(2));
// console.log(evaluate("multiply")(4)(2));
// console.log(evaluate("divide")(4)(2));
// console.log(evaluate("subtract")(4)(2));


// Question - Infinite Currying -> sum(1)(2)(3)...(n)
// sum(1)(2)(); -> 3
// sum(1)(2)(4)(5)(); -> 12

// function sum (a) {
//     return function (b) {
//         if (b) return sum (a + b);
//         return a;
//     }
// }
// console.log(sum(5)(2)(4)(8)()); // 19


// Question - Currying v/s Partial Application

// For sum of 3 numbers: 
// Currying: sum(a)(b)(c)
// function sum(a) {
//     return function (b) {
//         return function (c) {
//             return a + b + c;
//         }
//     }
// }
// console.log(sum(2)(4)(7)); // 13

// Partial Application: sum(a)(b, c)
// function sum (a) {
//     return function(b, c) {
//         return a + b + c;
//     }
// }
// console.log(sum(2)(4, 7)); // 13


// Question - Give a real world scenario for using Currying for building web applications
// We can use Currying for DOM Manipulation
// function updateElementText (id) {
//     return function (content) {
//         document.querySelector("#" + id).textContent = content;
//     };
// } 
// // This way we can just select the element once by just calling updateElementText() 
// // once and then update its content again and again by using the returned function
// // whenever required.
// const updateHeader = updateElementText("heading");  
// // Now whenever we want to update the content of the element having id "heading"
// // we can simply call updateHeader() with just the required content, no need to 
// // pass the element id as it remembers it from updateElementText().
// updateHeader("Subscribe to Mohak Trivedi");


// Question - Implement curry() such that given a function f(a, b, c) 
// it converts it into f(a)(b)(c)
// (Usually asked in senior interviews)
// function curry (func) {
//     return function curriedFunc (...args) {
//         console.log(args.length, func.length); // use this for explanation
//         if (args.length >= func.length) { // base case: currying acheived: when no. of args = no. of parameters expected by func 
//         // (in this case sum i.e. 4)
//             return func (...args); // call sum(1, 6, 5, 6) and return the value returned by it
//         } else { // currying not yet achieved: no. of args != no. of parameters expected by func
//             return function (...next) { // return a new function that takes in next set of arguments
//                 // call curriedFunc() with the existing arguments concatenated 
//                 // with the next arguments, and return the value returned by it
//                 return curriedFunc (...args, ...next);
//             };
//         }
//     };
// }

// const sum = (a, b, c, d) => a + b + c + d;

// const totalSum = curry(sum); // sum(a,b,c) -> sum(a)(b)(c)
// // We can pass in any function instead of sum() and even that will get curried

// console.log(totalSum(1)(6)(5)(6));


// Explanation:
// First call: totalSum(1) logs 1, 4 (1 argument received, 4 needed) and returns 
// a function waiting for three more arguments.
// Second call: (6) logs 2, 4 (2 arguments received in total) and returns a 
// function waiting for two more arguments.
// Third call: (5) logs 3, 4 (3 arguments received in total) and returns a 
// function waiting for one more argument.
// Fourth call: (6) logs 4, 4 (4 arguments received, 4 needed), so sum(1, 6, 5, 6) 
// is called, and the sum 18 is returned and logged.
// This demonstrates the process of currying, where each function call handles 
// part of the input until all expected arguments have been received.