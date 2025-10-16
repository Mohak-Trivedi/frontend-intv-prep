// Problem: https://bigfrontend.dev/problem/create-a-sum

/*
To implement function sum(num):
We need to return the final sum value only when comparison (==, ===) is made.
In all other cases, we return a new function (say, inner) that takes in a single number as argument (say, num2).
This inner function adds that argument to the total sum accumulated until now and again returns an
inner function so that we can take in another number to add.
i.e. we can say that it is like returning value returned by invoking sum with the num + num2 as argument .

In order to return the sum accumulated until now as soon as a comparison is made, we need to override
the built-in valueOf() that gets invoked automatically whenever any comparison is made in JS, such that
it must return the sum accumulated until now.
*/

/**
 * @param {number} num
 */
function sum(num) {
  function inner(num2) {
    return sum(num + num2);
  }

  inner.valueOf = function() {
    return num;
  }

  return num;
}
