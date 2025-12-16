// Problem: https://bigfrontend.dev/problem/what-is-composition-create-a-pipe



/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
	// your code here
	return function inner(val) {
		let result = val;
		for(let func of funcs) {
			result = func.call(this, result);
		}
		return result;
	}
}

/* e.g. usage:
const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) =>  (x) => x - y
const divide = (y) => (x) => x / y

let myFunc = pipe([
  times(2),
  times(3)
])
console.log(myFunc(2)) // 12

myFunc = pipe([
  times(2),
  subtract(3),
  divide(4)
])
console.log(myFunc(2)) // 0.25
*/

// Solving with reduce:
/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
	// your code here
	return function inner(val) {
		// let result = val;
		// for(let func of funcs) {
		// 	result = func.call(this, result);
		// }
		// return result;

		let result = val;
		return funcs.reduce((result, func) => {
			return func.call(this, result);
		}, result);
	}
}