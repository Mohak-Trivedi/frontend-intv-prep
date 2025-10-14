// Problem: https://learnersbucket.com/examples/interview/deep-flatten-object-in-javascript-1/

function flatten(obj, prefix) {
  let res = {};

  for (let k in obj) {
    const val = obj[k];
    const newKey = prefix ? prefix + "." + k : k;

    if (typeof val === "object") {
      if (Array.isArray(val)) {
        const arrToObj = { ...val }; // convert array to object

        const newObj = flatten(arrToObj, newKey);
        res = { ...res, ...newObj };
      } else {
        const newObj = flatten(val, newKey);
        res = { ...res, ...newObj };
      }
    } else {
      res = { ...res, [newKey]: val };
    }
  }

  return res;
}

const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
       L: 56
    },
    Q: [1, 2]
   }
};

console.log(flatten(nested));