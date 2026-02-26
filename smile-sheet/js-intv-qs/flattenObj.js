// Problem: ttps://www.greatfrontend.com/questions/javascript/squash-object

// Approach 1: Fails null test case.
// function flatten(obj, prefix) {
//   let res = {};

//   for (let k in obj) {
//     const val = obj[k];
//     const newKey = prefix ? prefix + "." + k : k;

//     if (typeof val === "object") {
//       if (Array.isArray(val)) {
//         const arrToObj = { ...val }; // convert array to object

//         const newObj = flatten(arrToObj, newKey);
//         res = { ...res, ...newObj };
//       } else {
//         const newObj = flatten(val, newKey);
//         res = { ...res, ...newObj };
//       }
//     } else {
//       res = { ...res, [newKey]: val };
//     }
//   }

//   return res;
// }

// const nested = {
//   A: "12",
//   B: 23,
//   C: {
//     P: 23,
//     O: {
//        L: 56
//     },
//     Q: [1, 2]
//    }
// };

// console.log(flatten(nested));

// Better approach:
/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj) {
  function squashImpl(obj_, path, output) {
    for(const [key, value] of Object.entries(obj_)) {
      if(typeof value !== "object" || value === null) {
        output[path.concat(key).filter(Boolean).join('.')] = value;
      } else {
        squashImpl(value, path.concat(key), output);
      }
    }
  }

  const out = {};
  squashImpl(obj, [], out);
  return out;
}