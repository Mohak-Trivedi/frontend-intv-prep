// Question - What is Prototype in JS?
// Object
// let obj = {
//     name: "Mohak Trivedi",
//     age: 25,
// };
// In console, type out - obj
// Apart from name and age, you'll notice: [[Prototype]]: Object
// You'll also notice the same when you type - Object.prototype
// You'll also notice the same when you type - obj.__proto__
// This means, each object that we create in JS, gets __proto__ property which
// is provided by the Object in JS.
// This [[Prototype]]: Object, added as additional property in each object we define 
// is called as prototype.
// It provides many methods and properties that enable us to deal with objects
// conveniently.

// Number
// let num = 10;
// In console, type out - num, you'll get just 10.
// But next, type out - num.__proto__, you'll notice a Number object which contains
// some predefined methods to be used for manipulating numbers.
// But, in it, you'll also notice: [[Prototype]]: Object
// which is exactly the same thing that you saw for the object that we defined.

// String
// let name = "RoadsideCoder";
// Similarly, for string you'll get notice [[Prototype]]: Object in String object
// if you type name.__proto__

// Boolean
// let bool = true;
// Similarly, for string you'll get notice [[Prototype]]: Object in Boolean object
// if you type bool.__proto__

// Hence proved, even a number, string and boolean is an object in JS.

// Function
// function add(a, b) {
//     return a + b;
// }
// console.log(add(1, 2));
// In console, type out add.__proto__.__proto__
// we get the same prototype object.
// Hence, even a function is an object in JS.
// We can even add a property to it.
// Try, add.name = "Mohak";
// And then, check add, you'll notice the property name being added with the value 
// as "Mohak".


// Question - Prototype Chaining
// let person = {
//     name: "Mohak Trivedi",
//     age: 25,
// };

// console.log(person.alias()); // TypeError: person.alias is not a function
// console.log(person.toString()); // [object Object]
// toString() is not defined in person, but still we get o/p for it, because JS
// further looks for toString() in the [[Prototype]]: Object of person. If we 
// would've defined toString() in person, then that would've got executed instead.

// We get an error for alias() because it is neither defined in the person object
// nor in the [[Prototype]]: Object of the person.

// let additional = {
//     name: "Mohak",
//     username: "Mohkya",
//     alias: function() {
//         console.log(`${this.name} is also known as ${this.username}`); 
//     }
// };

// person.__proto__ = additional; // replacing the prototype of person with our 
// own defined object additional. NOT RECOMMENDED IN REAL WQRLD, JUST A DEMO.
// So, the this in additional will refer to person, not additional.

// console.log(person.alias()); // Mohak Trivedi is also known as Mohkya
// JS looks for alias() in person, but didn't find it so searched in its prototype,
// i.e. additional. Found it in additional and executed it.
// In alias(), for this.name, looked for name in person and found it as "Mohak Trivedi"
// and for this.username, couldn't find in person, so looked in prototype i.e. 
// additional and found it as "Mohkya", so used these values in the console log.
// This is called as Prototype Chaining.


// Question - [V.IMP] - Prototype Inheritance
// Even though, we are just replacing the prototype in the above e.g., we are
// kind of inheriting the properties of additional in person object.

// Defined a Constructor function
// function Animal(name) {
//     this.name = name;
// }

// type out Animal.prototype in console, you'll notice:
// constructor and [[Prototype]]: Object

// Add a method to the prototype
// Animal.prototype.sayName = function () {
//     console.log("My name is " + this.name);
// };

// type out Animal.prototype in console, you'll notice:
// sayName(), constructor and [[Prototype]]: Object

// Create object animal1 of Animal
// var animal1 = new Animal("Tiger");
// new keyword creates a new object and sets the constructor and sets the prototype
// of Animal as the prototype of this new object created, 
// i.e. typing animal1.__proto__ will give same result as Animal.prototype.
// type out animal1 in console, you'll notice: Animal { name: "Tiger" }
// Upon expanding that Animal, you'll notice: name and [[Prototype]]: Object
// Upon expanding the Prototype, you'll notice the same output that you got
// upon typing Animal.prototype

// Up until now, we saw how to create an instance using Constructor and new keyword 
// and how prototypes contribute in this process.
// This is how we used to create constructors and objects before ES6.
// JS Classes came from ES6 onwards, we will check those in the next session.
// Now, let's see Prototypal Inheritance:

// function Dog(name, breed) {
//     Animal.call(this, name); // inheriting Animal, as Dog is an Animal
//     this.breed = breed; // Dog's own property apart from properties inherited 
//     // from Animal.
// }
// type out Dog.prototype in console, you'll notice:
// constructor and [[Prototype]]: Object

// var dog1 = new Dog("Rolex", "Labrador");
// type out dog1, you'll see:
// Dog {name: 'Rolex', breed: 'Labrador'}
// So, the name is getting assigned from Animal()
// but, this doesn't mean that inheritance is complete. 
// type out dog1.sayName(), you'll get:
// Uncaught TypeError: dog1.sayName is not a function
// because the properties from the prototype of Animal are yet to be inherited.

// Dog.prototype = Object.create(Animal.prototype); // inheriting the properties of
// not just Animal, but also of its prototype.

// var dog1 = new Dog("Rolex", "Labrador");
// Now, if you type out dog1.sayName(), you'll see:
// My name is Rolex

// But, inheriting the prototype of Animal in Dog, will also replace the 
// Constructor of Dog. 
// type out Dog.prototype, you'll notice:
// Animal {}
// Upon expanding it, you get:
// [[Prototype]]: Object
// Upon expanding it, you get the same result as typing out Animal.prototype:
// sayName(), constructor and [[Prototype]]: Object

// We don't want that to happen, so need to mention it explicitly:
// Dog.prototype.constructor = Dog;
// type out Dog.prototype, you'll notice:
// Animal {}
// Upon expanding it, you get:
// constructor: ƒ Dog(name, breed)
// [[Prototype]]: Object 

// Let's add one more method to the prototype of Dog:
// Dog.prototype.bark = function() {
//     console.log("Woof!");
// };

// type out Dog.prototype, you'll notice:
// Animal {bark: ƒ}
// Upon expanding it, you get:
// bark: f()
// constructor: ƒ Dog(name, breed)
// [[Prototype]]: Object 

// var dog1 = new Dog("Rolex", "Labrador");
// dog1.bark();
// dog1.sayName();


// Question - Predict the output:
// function Vehicle() {}

// Vehicle.prototype.drive = function () {
//     console.log('Driving a vehicle.');
// }

// function Car() {}

// Car.prototype = Object.create(Vehicle.prototype);
// Car.prototype.constructor = Car;
// Car.prototype.drive = function () {
//     console.log('Driving a car.');
// }

// var vehicle = new Vehicle();
// var car = new Car();

// vehicle.drive();
// car.drive();

// Answer:
// Driving a vehicle.
// Driving a car.


// Question - Explain the difference between __proto__ and prototype in JavaScript.

// Answer:
/*
Certainly! Understanding the difference between `prototype` and `__proto__` is fundamental in JavaScript when dealing with objects and inheritance.

### `prototype`

The `prototype` is a property of constructor functions in JavaScript. It allows you to add properties and methods to all instances of objects created by that constructor function.

### `__proto__`

The `__proto__` is an internal property of an object that points to the prototype of the constructor function that created the object. It forms part of the prototype chain and is used for inheritance.

### Example

Let's illustrate this with an example:

```
// Constructor function
function Person(name) {
    this.name = name;
}

// Adding a method to the prototype
Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name);
};

// Creating an instance of Person
const alice = new Person("Alice");

// Using the instance's method
alice.greet(); // Output: Hello, my name is Alice

// Checking the prototype and __proto__
console.log(Person.prototype); // Output: { greet: [Function (anonymous)] }
console.log(alice.__proto__);  // Output: { greet: [Function (anonymous)] }
console.log(alice.__proto__ === Person.prototype); // Output: true
```

### Explanation

1. **`Person.prototype`**: This is an object that contains properties and methods that should be inherited by all instances created by the `Person` constructor. In this example, `Person.prototype` has a method called `greet`.

2. **`alice.__proto__`**: This is the internal property of the `alice` instance that points to `Person.prototype`. It means that `alice` inherits properties and methods from `Person.prototype`.

3. **Prototype Chain**: When you call `alice.greet()`, JavaScript looks for the `greet` method on the `alice` object. If it doesn't find it, it follows the `__proto__` reference to `Person.prototype` where it finds and executes the method.

### Conclusion

- `prototype` is used to define properties and methods for all instances created by a constructor function.
- `__proto__` is an internal property that links an object to its constructor's prototype, forming the prototype chain.

This distinction is crucial for understanding inheritance and the prototype chain in JavaScript.
*/


// Question - What is setPrototypeOf?

// Answer:
// For e.g.:
// Define a prototype object
// var animalPrototype = {
//     sound: function () {
//         console.log('Making a sound...')
//     },
// };

// Create an object with animalPrototype as its prototype
// var dog = Object.create(animalPrototype);

// Create another object with a different prototype
// var cat = {
//     purr: function () {
//         console.log('Purring...');
//     },
// };

// type out dog.__proto__ in console and you will notice the same result as
// typing out animalPrototype i.e. sound() and Object prototype.
// Object.setPrototypeOf(dog, cat);
// Now type out dog, and you will now notice the same result as typing out 
// cat, i.e. purr() and Object prototype.

// So, basically, setPrototypeOf() replaces the prototype of the 1st argument
// with the 2nd argument mentioned.


// Question - What is instanceof?

// Answer:
// // e.g.:
// // Defined a Constructor function
// function Animal(name) {
//     this.name = name;
// }

// // type out Animal.prototype in console, you'll notice:
// // constructor and [[Prototype]]: Object

// // Create object animal1 of Animal
// var animal1 = new Animal("Tiger");

// console.log(animal1 instanceof Animal); // true
// // So, instanceof helps us indentify if the LHS is an instance of RHS


// Question - How can you create an object without a prototype in JS?

// Answer:
// var obj1 = Object.create(null);
// console.log(obj1); // {} i.e. object is created
// console.log(obj1.toString()) // Uncaught TypeError: toString() is not a function
// // i.e. no Object prototype attached to obj1. 


// Question - Predict the output:
// function A() {}
// A.prototype.foo = 10;

// function B() {}
// B.prototype = Object.create(A.prototype);
// B.prototype.constructor = B;
// B.prototype.foo = 20;

// function C() {}
// C.prototype = Object.create(B.prototype);
// C.prototype.constructor = C;
// C.prototype.foo = 30;

// var obj1 = new A();
// var obj2 = new B();
// var obj3 = new C();

// console.log(obj1.foo);
// console.log(obj2.foo);
// console.log(obj3.foo);

// Answer:
// 10
// 20
// 30


// Question - Deep clone an object in JS.

// var obj2 = {
//     a: 1,
//     b: {
//         c: 2,
//         d: [3, 4],
//     },
// };

// var clonedObj = obj2;
// clonedObj.a = 3;
// this changes value of a from 1 to 3 in not just clonedObj, but even in obj2,
// as we haven't done deep cloning because we have passed by reference.

// Answer:
// We will create a function deepClone such that given an object, it will create
// a deep clone of that object.
// function deepClone(obj) {
//     // Handle null and non-object types
//     if(obj === null || typeof obj != 'object') {
//         return obj;
//     }

//     // Create a new object or array based on the type of the input object
//     var clone = Array.isArray(obj) ? [] : {};

//     console.log(obj);

//     // Iterate through each key in the input object
//     for(var key in obj) {
//         if(obj.hasOwnProperty(key)) {
//             clone[key] = deepClone(obj[key]);
//         }
//     }

//     return clone; 
// }

// var obj2 = {
//     a: 1,
//     b: {
//         c: 2,
//         d: [3, 4],
//     },
// };

// var clonedObj = deepClone(obj2);
// clonedObj.a = 3;
// console.log(clonedObj);
// console.log(obj2);
// Now, you'll notice that the value of a has changed from 1 to 3 only in clonedObj
// not in obj2 i.e. we have performed deep cloning successfully.