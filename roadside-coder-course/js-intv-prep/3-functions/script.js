// Functions in JavaScript

// What is function declaration/function definition/function statement?
// Defines what a function can accept and define what the function is supposed to do.
// e.g.:
// function square(num) {
//     return num * num;
// }


// What is function expression?
// Function statement assigned to a variable, hence, forming an expression.
// e.g.:
// const square = function (num) { //can be named as well
//     return num * num;
// }

// console.log(square(5));


// What is an anonymous function?
// RHS of above e.g.
// A function that has no name

// What do we mean by "First Class Functions"?
// A language where functions can be treated as variables, there the functions are
// called as "First Class Functions" or "Functions as First Class Citizens".
//e.g.:
// function square(num) {
//     return num * num;
// }

// function displaySquare(fn) {
//     console.log("Square is: " + fn(5));
// }

// displaySquare(square); // function square passed as argument to function displaySquare


// What is IIFE?
// IIFE : Immediately Invoked Function Expressions
// e.g.:
// (function square(num) {
//     console.log(num * num);
// })(5);


// IIFE-based predict the output question:
// (function (x) {
//     return (function (y) {
//         console.log(x);
//     })(2);
// })(1);
// Output will be 1.
// The inner function is able to access x even though it is not defined in it due
// to closure.


// Explain Function Scope.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope
// The following variables are defined in the global scope
// Show e.g.:
// const num1 = 20;
// const num2 = 3;
// const name = "Chamakh";

// // This function is defined in the global scope
// function multiply() {
//   return num1 * num2;
// }

// console.log(multiply()); // 60

// // A nested function example
// function getScore() {
//   const num1 = 2;
//   const num2 = 3;

//   function add() {
//     return `${name} scored ${num1 + num2}`;
//   }

//   return add();
// }

// console.log(getScore()); // "Chamakh scored 5"
 

// Function-scope-based predict the output function:
// for(var i = 0;i < 5;i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, i * 1000);
// }

// o/p:
// 5
// 5
// 5
// 5
// 5

// Explanation:
// Because of the asynchronous nature of setTimeout, the loop will finish 
// executing before any of the setTimeout callbacks are invoked. So, by the time 
// each callback runs, the value of i will be equal to the final value of i after 
// the loop has finished, which is 5. All of the setTimeouts will refer to the same
// i and won't have their own block's i, because i is a var variable and hence has
// function scope, not block scope.

// for(let i = 0;i < 5;i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, i * 1000);
// }

// o/p:
// 0
// 1
// 2
// 3
// 4

// Explanation:
// In this modified code, let is used instead of var to declare the variable i. 
// Unlike var, let has block scope, which means it creates a new binding of i 
// for each iteration of the loop. Consequently, each iteration of the loop 
// will have its own scoped i variable.Therefore, when the setTimeout function 
// inside the loop runs, it captures the value of i at the time it was declared 
// in each iteration, resulting in the above output.


// Explain function hoisting.
// - Functions are hoisted completely, unlike variables where hoisting of only
// the declaration is done not of the initialization. Hence, while accessing variables
// before their declaration, you'll get undefined, but while accessing functions
// before their declaration, you'll get the entire function, not undefined.
// - [show e.g. and use chrome dev tools debugger and watch Scope]
// functionName();
// console.log(x);

// function functionName() {
//     console.log("Learn by doing.");
// }

// var x = 5;
// Even in function scope, only the variable declaration is hoisted. 
// e.g.2:
// functionName();

// function functionName() {
//     console.log(x);
//     console.log("Learn by doing.");

//     var x = 5;
// }

// var x = 5;


// Function hoisting based predict the output:
// var x = 21;

// var fun = function () {
//     console.log(x);
//     var x = 20;
// };

// fun();

// o/p: undefined

// give explanation and also show local scope in devtools   


// Params vs arguments
// function square (num) { // num is parameter/param
//     return num * num;
// }
// square(5); // 5 is argument


// Spread vs Rest operators
// function multiply (...nums) { // Here ... is rest operator as it rests 5,6 into [5,6]
//     console.log(nums[0] * nums[1]);
// }

// var arr = [5, 6];
// multiply(...arr); // Here ... is called spread operator as it spread [5,6] as 5,6


// Rest vs Spread operator predict the output based question
// const fn = (a, ...numbers, x, y) => {
//     console.log(x, y, numbers);
// };

// fn(5, 6, 3, 7, 8, 9);

// o/p: Uncaught SyntaxError: Rest parameter must be last formal parameter
// Because, rest operator or spread operator must always be mentioned last.

// const fn = (a, x, y, ...numbers) => {
//     console.log(x, y, numbers);
// };

// fn(5, 6, 3, 7, 8, 9);

// o/p: 6 3 [7, 8, 9]


// What are callback functions?
// - A callback function is a function passed into another function as an argument,
// which is then invoked inside the outer function to complete some kind of routine 
// or action.
// [- show e.g.: inbuilt function using callback such as map, or user-defined 
// function using callback]


// What are arrow functions?
// - Introduced in ES6 version of JS.
// - Just like normal function expressions but more compact syntax.
// - [show e.g.: create function expression and change it to arrow function]
// e.g.
// const add = (firstNum, secondNum) => firstNum + secondNum;
// - No need of {} if function has a single line. 
// - No need to use return in case of single line function and that is the line 
// that we want to return.
// - No need to use () for parameters if passing only single parameter, just mention
// directly.


// Arrow Functions vs Regular Function 
// - Syntax:
// function square (num) {
//     return num * num;
// }

// const square = (num) => {
//     return num * num;
// };

// - Implicit return keyword usage:
// function square (num) {
//     return num * num;
// }

// const square = (num) => num * num; // implicit return 

// - arguments
// In regular functions, we can access the arguments by using the arguments
// keyword, even though we haven't mentioned parameters.
// But we can't do this in arrow functions.
// const fn() {
//     console.log(arguments); // [1,2,3]
// }

// fn(1,2,3);

// const fnArrow = () => {
//     console.log(arguments); // arguments is not defined
// }

// fnArrow();

// - "this" keyword
// let user = {
//     username: "Mohak Trivedi",
//     rc1: () => {
//         console.log("Subscribe to " + this.username); // subscribe to undefined
//         // because "this" refers to global object not this (user) object.
//     },
//     rc2() {
//         console.log("Subscribe to " + this.username); // subscribe to Mohak Trivedi
//         // because "this" refers to this (user) object.
//     }
// };

// user.rc1();
// user.rc2();