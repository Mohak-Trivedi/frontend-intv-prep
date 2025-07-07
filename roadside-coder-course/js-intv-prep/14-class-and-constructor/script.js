// Class and Constructors

// Classes were introduced in ES6. Before that we used to use constructor functions.

// class Teacher {
//     constructor(name, channel, likes = 0) {
//         this.name = name;
//         this.channel = channel;
//         this.videoLikes = likes;
//     }

//     // no need to use function keyword
//     intro() {
//         return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
//     }

//     like() {
//         this.videoLikes++;
//         return `Liked this video! Current Likes: ${this.videoLikes}`;
//     }
// }

// const mohakCoder = new Teacher("Mohak", "MohakCoder");
// Now type mohakCoder in browser console, you'll get:
// Teacher {name: 'Mohak', channel: 'MohakCoder', videoLikes: 0}
// Upon expanding, you'll notice [[Prototype]]: Object, upon expanding it, you'll get:
// intro(), like(), constructor() and [[Prototype]]: Object i.e. the Object Prototype
// If you type in console: mohakCoder.like() 3 times 
// and then type mohakCoder, you'll see the videoLikes: 3 
// const mohakCoder2 = new Teacher("MohakTrivedi", "MohakCoder2");
// Now, if you check videoLikes for mohakCoder2, it will be different, as 
// videoLikes of each object of Teacher is bound only to that object.
// In this manner, classes are also useful for maintaining states for each instance.


// Question: Convert the above class into a function constructor code.
// Answer:
// function Teacher(name, channel, likes = 0) {
//     this.name = name;
//     this.channel = channel;
//     this.videoLikes = likes;
// }

// Teacher.prototype.intro = function () {
//         return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
// }

// Teacher.prototype.like = function () {
//     this.videoLikes++;
//     return `Liked this video! Current Likes: ${this.videoLikes}`;
// }

// const mohakCoder = new Teacher("Mohak", "MohakCoder");


// Inheritance
// Parent class
// class Teacher {
//     constructor(name, channel, likes = 0) {
//         this.name = name;
//         this.channel = channel;
//         this.videoLikes = likes;
//     }

//     intro() {
//         return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
//     }

//     like() {
//         this.videoLikes++;
//         return `Liked this video! Current Likes: ${this.videoLikes}`;
//     }
// }

// // Child inherits from Parent class Teacher
// class YouTubeTeacher extends Teacher {
//     constructor(name, channel, likes, subscribers) {
//         super(name, channel, likes, subscribers);
//         this.subscribers = subscribers;
//     }

//     subscribersCount() {
//         return `${this.channel} has ${this.subscribers} subscribers.`;
//     }
// }

// const ytTeacher = new YouTubeTeacher("Mohak", "MohakCoder", 70, "70k");

// Type ytTeacher in console, you get:
// YouTubeTeacher {name: 'Mohak', channel: 'MohakCoder', videoLikes: 70, subscribers: '70k'}
// Upon expanding it, you get:
// name, channel, videoLikes, subscribers and [[Prototype]]: Object. 
// Upon expanding [[Prototype]]: Object, you get:
// constructor(), subscribersCount() and [[Prototype]]: Object
// Upon expanding [[Prototype]]: Object, you get:
// the prototype of Teacher i.e.:
// constructor() of Teacher, intro(), like() and [[Prototype]]: Object i.e. the Object Prototype

// Also, you'll be able to execute:
// ytTeacher.subscribersCount()
// ytTeacher.intro()
// i.e. even the methods of the parent.


// Static Methods
// Static Methods are usually made for factory usage i.e. some internal setting
// related work of the class.
// e.g. the static method paidCourse() will be used for initializing an object
// of the class. Not a good e.g. though.
// Static methods can't be accessed by any instance of the class nor within the 
// class. You have to access it by using the class name only as seen in below e.g. 
// class Teacher {
//     constructor(name, channel, likes = 0) {
//         this.name = name;
//         this.channel = channel;
//         this.videoLikes = likes;
//     }

//     static paidCourse() {
//         console.log('Not everyone should access this. This is a paid course.');
//         return new Teacher("Mohak", "MohakCoder", 70);
//     }

//     intro() {
//         return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
//     }

//     like() {
//         this.videoLikes++;
//         return `Liked this video! Current Likes: ${this.videoLikes}`;
//     }
// }

// const teacher1 = Teacher.paidCourse();
// Type and check in console that an object of teacher has been created and its
// reference is given to teacher1.

////////////////////////////////////////////////////////

// Interview Questions:

// Question - Explain the difference between class and object in JS.
// A class is a blueprint that defines the structure and behavior of objects.
// Objects are instances of classes that passes properties and methods defined
// by the class.
// E.g.:
// Class
// class Teacher {
//     constructor(name, subject) {
//         this.name = name;
//         this.subject = subject;
//         this.classes = 0;
//     }

//     intro() {
//         return `Hello students! My name is ${this.name}, and I'll teach you ${this.subject}`;
//     }

//     teach() {
//         this.classes++;
//     }
// }

// // Objects
// const teacher1 = new Teacher("Ram", "History");
// const teacher2 = new Teacher("Shyam", "Computer Science");
// console.log(teacher1.intro());
// console.log(teacher2.intro()); 


// Question - Predict the Output:
// class Rectangle {
//     constructor(width, height) {
//         this.width = width;
//         this.height = height;
//     }

//     area() {
//         return this.width * this.height;
//     }
// }

// const square = new Rectangle(5, 5);
// const rect = new Rectangle(4, 6);

// console.log(square.area());
// console.log(rect.area());

// Answer:
// 25
// 24


// Question - How does inheritance work in JS classes?

// Answer:
// Inheritance in JS classes is achieved using the extends keyword. It allows
// a subclass (child class) to inherit properties and methods from a super class
// (parent class).
// E.g.:
// class Teacher {
//     constructor(name, subject) {
//         this.name = name;
//         this.subject = subject;
//         this.classes = 0;
//     }

//     intro() {
//         return `Hello students! My name is ${this.name}, and I'll teach you ${this.subject}`;
//     }

//     teach() {
//         this.classes++;
//     }
// }

// class YouTubeTeacher extends Teacher {
//     constructor(name, subject, channel, subscribers = 0) {
//         super(name, subject);
//         this.channel = channel;
//         this.subscribers = subscribers; 
//     }

//     subscribe() {
//         this.subscribers++;
//         return `Thanks for subscribing to my channel ${this.channel}. We have
//          ${this.subscribers} subscribers as of now.`;
//     }
// }

// const ytTeacher1 = new YouTubeTeacher('Mohak', 'Coding', 'MohakCoder', 70);
// console.log(ytTeacher1.intro());
// console.log(ytTeacher1.subscribe());


// Question: Predict the output:
// class Employee {
//     constructor() {
//         this.name = "John";
//     }
//     constructor() {
//         this.age = 30;
//     }
// }

// var employeeObject = new Employee();
// console.log(employeeObject.name);

// Answer:
// Uncaught SyntaxError: A class may only have one constructor


// Question: Which approach is better and why?
// const jamesbond = {
//     firstName: "Roadside",
//     lastName: "Coder",
//     getFullName: function() {
//         return `${this.firstName} ${this.lastName}`.trim();
//     }
// };

// jamesbond.getFullName();

// // OR

// class Person {
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }

// Person.prototype.getFullName = function() {
//     return `${this.firstName} ${this.lastName}`.trim();
// };

// const jamesBond = new Person("Roadside", "Coder");
// jamesBond.getFullName();

// Answer:
// The first approach is better, because in the second approach, a closure is
// maintained for each copy of an object containing the getFullName() method,
// whereas in the second approach, the method is registered in the prototype 
// rather than in every single object, so it is more memory-efficient. 


// Question: Implement this:
// const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
// console.log(result);
// We must able to invoke such functions infinitely in a chained manner.

// Answer:
// class Calculator {
//     constructor() {
//         this.result = 0;
//     }

//     add(num) {
//         this.result += num;
//         return this;
//     }

//     subtract(num) {
//         this.result -= num;
//         return this;
//     }

//     multiply(num) {
//         this.result *= num;
//         return this;
//     }

//     divide(num) {
//         this.result /= num;
//         return this;
//     }

//     getResult() {
//         return this.result;
//     }
// }

// const calc = new Calculator();
// const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
// console.log(result);


// Question: Inheritance and Polymorphism
// Implement a `Shape` class with an `area()` method.
// Create subclasses `Circle` and `Square` that inherit from `Shape` and override
// the `area()` method to calculate their respective areas.
// class Shape {
//     area() {
//         return 0;
//     }
// }

// class Circle extends Shape {
//     constructor(radius) {
//         super();
//         this.radius = radius;
//     }

//     area() {
//         return Math.PI * this.radius * this.radius;
//     }
// }

// class Square extends Shape {
//     constructor(side) {
//         super();
//         this.side = side;
//     }

//     area() {
//         return this.side ** 2;
//     }
// }

// const circle1 = new Circle(4);
// const square1 = new Square(2);
// console.log(circle1.area());
// console.log(square1.area());


// Question: What are Getters and Setters in JS?

// Answer: 
// Getters and Setters are methods used to control access to the properties of a
// class.
// They're also used to add some validation to be done before getting or updating
// a property.
// e.g.:
// class Teacher {
//     constructor(name, channel) {
//         this.name = name;
//         this.channel = channel;
//         this._videoLikes = 0; // _ is just a naming convention to indicate private property
//     }

//     intro() {
//         return `Hey, it's ${this.name}! Welcome to ${this.channel}`;
//     }

//     like() {
//         this._videoLikes++;
//         return `Liked this video! Current Likes: ${this._videoLikes}`;
//     }

//     get videoLikes() {
//         return this._videoLikes;
//     }

//     set videoLikes(likes) {
//         if(likes < 0) throw new Error("Must be more than 0");
//         else this._videoLikes = likes;
//     }
// }

// const mohakcoder = new Teacher("Mohak", "MohakCoder");

// In console, 
// type out: mohakcoder._videoLikes
// you get: 0
// type out: mohakcoder._videoLikes=-1
// you get: -1 (Instead of getting an error)
// Now refresh the browser and in console:
// type out: mohakcoder.videoLikes (not ._videoLikes i.e. accessing via getter)
// you get: 0
// type out: mohakcoder.videoLikes=-1 (not ._videoLikes i.e. accessing via setter)
// you get: Uncaught Error: Must be more than 0