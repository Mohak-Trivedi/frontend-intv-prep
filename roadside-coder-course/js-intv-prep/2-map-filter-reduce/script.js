// map, filter and reduce

// What is map()?
// map() method is used to create a new array from an existing one by applying a
// function to each one of the elements of the first array.

// const nums = [1, 2, 3, 4];

// const multiplyThree = nums.map((num, idx, arr) => {
//     return num * 3 + idx;
// });

// console.log(multiplyThree);


/////////////////////////////////////////////////////


// What is filter()?
// filter() method takes each element in an array and applies a conditional statement
// against it. If the conditional returns true the element gets pushed into the 
// new array, else the element is ignored.
// In short filter() returns an array containing only those elements that satisfy the
// mentioned condition.

// const nums = [1, 2, 3, 4];

// const moreThanTwo = nums.filter((num, idx, arr) => {
//     return num > 2;
// });

// console.log(moreThanTwo);


/////////////////////////////////////////////////////


// What is reduce()?
// reduce() method reduces an array of values down to a single value. Just like
// map() and filter(), it applies the callback function to each element of the 
// array.

// It takes in 2 parameters:
// - a callback function
// - an initial value (= 0th element of the array if not specified)

// The callback function, apart from taking in:
// current value, index, array
// also takes in an accumulator i.e. single value accumulated until now 

// const nums = [1, 2, 3, 4];

// const sum = nums.reduce((acc, num, idx, arr) => {
//     return acc + num;
// }, 0);

// console.log(sum);


/////////////////////////////////////////////////////


// Polyfill of map()

// map syntax for reference: 
// Array.map((curr, idx, arr) => {});

// Define Polyfill
// Array.prototype.myMap = function (cb) {
//     let temp = [];

//     // nums.myMap -> nums = this
//     for(let i = 0;i < this.length;i++) {
//         temp.push(cb(this[i], i, this));
//     }

//     return temp;
// };

// Test polyfill:
// const nums = [1, 2, 3, 4];

// const multiplyThree = nums.myMap((num, idx, arr) => {
//     return num * 3 + idx;
// });

// console.log(multiplyThree);


/////////////////////////////////////////////////////


// Polyfill of filter()

// filter syntax for reference:
// Array.filter((curr, idx, arr) => {});

// Define Polyfill
// Array.prototype.myFilter = function (cb) {
//     let temp = [];

//     for(let i = 0;i < this.length;i++) {
//         if(cb(this[i], i, this)) {
//             temp.push(this[i]);
//         }
//     }

//     return temp;
// }

// Test polyfill:
// const nums = [1, 2, 3, 4];

// const moreThanTwo = nums.myFilter((num, idx, arr) => {
//     return num > 2;
// });

// console.log(moreThanTwo);


/////////////////////////////////////////////////////


// Polyfill of reduce()

// reduce syntax for reference:
// Array.reduce((acc, curr, idx, arr) => {}, initialValue);

// Define Polyfill
// Array.prototype.myReduce = function (cb, initialValue) {
//     var accumulator = initialValue;

//     for(let i = 0;i < this.length;i++) {
//         accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
//     }

//     return accumulator;
// };

// Test polyfill:
// const nums = [1, 2, 3, 4];

// const sum = nums.myReduce((acc, num, idx, arr) => {
//     return acc + num;
// }, 0);

// console.log(sum);


/////////////////////////////////////////////////////

// o/p based questions:

let students = [
  { name: "Piyush", rollNumber: 31, marks: 80 },
  { name: "Jenny", rollNumber: 15, marks: 69 },
  { name: "Kaushal", rollNumber: 16, marks: 35 },
  { name: "Dilpreet", rollNumber: 7, marks: 55 },
];

// Q1 - Return only the names of students in capital

// Using Traditional for-loop:
// let names = [];
// for(let obj of students) {
//     names.push(obj.name.toUpperCase());
// }
// console.log(names);

// Using forEach():
// let names = [];
// students.forEach((stu) => {
//     names.push(stu.name.toUpperCase());
// })
// console.log(names);

// Using map
let names = students.map((stu) => stu.name.toUpperCase());
console.log(names);


// Q2 - we want to get the details of students who scored more than 60 marks.
let gradeAstuds = students.filter((stu) => stu.marks>60);
console.log(gradeAstuds);

// Q3 - Get the details of students who scored more than 60 marks and have rollNumber greater than 15.
let details = students.filter((stu) => stu.marks>60 && stu.rollNumber>15);
console.log(details);

// Q4 - Sum total of the marks of the students
let total = students.reduce((acc, stu) => {
    return acc + stu.marks;
}, 0);
console.log(total);

// Q5 - Get only the names of the students who scored more than 60 marks
let gradeAnames = students.filter((stu) => stu.marks > 60).map((stu) => stu.name);
console.log(gradeAnames);

// Q6 - print the total marks of the students with marks greater than 60 after 20 marks has been added to those students who scored less than 60.
let grace = students.map((stu) => {
    if(stu.marks < 60) {
        stu.marks += 20;
    }

    return stu;
})
.filter((stu) => stu.marks > 60)
.reduce((acc, stu) => {
    return acc + stu.marks;
}, 0);

console.log(grace);