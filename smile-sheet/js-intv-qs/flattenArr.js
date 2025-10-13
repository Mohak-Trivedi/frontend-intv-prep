// Problem: https://bigfrontend.dev/problem/implement-Array-prototype.flat

// Edge case: Sparse array: flat([1,2,empty,empty,undefined,[3,4,[5,6,[7,8,[9,10]]]]], Infinity)

// Recursive approach
function flat(arr, depth = 1) {
  const res = [];

  // Use only for...in loop as it skips the empty elements. Because (i in arr) is false for index i
  // of arr if arr[i] is empty. For other types of loops e.g. for...of or forEach, arr[i] gives
  // undefined instead of empty.
  for (let i in arr) {
    const ele = arr[i];

    if (Array.isArray(ele) && depth > 0) {
      res.push(...flat(ele, depth - 1));
    } else {
      res.push(ele);
    }
  }

  return res;
}