// Generator Function
function* fetchNextElement() {
  console.log("I am inside the generator function");
  yield 1;
  yield 2;
  console.log("somewhere in the middle");
  yield 3;
  yield 4;
}

// Storing Generator i.e. a special type of Iterator object returned by the Generator Function
const iter = fetchNextElement();

// Invoking the next() method of the generator to get the value
console.log(iter.next());
// Invoking the next() method of the generator to get the next value
console.log(iter.next());
// Invoking the next() method of the generator to get the next value
console.log(iter.next());
// Invoking the next() method of the generator to get the next value
console.log(iter.next());
// Invoking the next() method of the generator to get the next value
console.log(iter.next());
// Invoking the next() method of the generator to get the next value
console.log(iter.next());