// Problem Link: https://www.greatfrontend.com/questions/javascript/classnames?list=three-months

/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */

export default function classNames(...args) {
  let res = "";

  for (let arg of args) {
    if (typeof arg === "string" && arg.length > 0) {
      res += arg + " ";
    } else if (Array.isArray(arg)) {
      // typeof [] gives 'object', so you need to handle arrays before objects.
      res += classNames(...arg) + " ";
    } else if (typeof arg === "object") {
      for (let prop in arg) {
        if (arg[prop]) {
          res += prop + " ";
        }
      }
    } else if (typeof arg === "number" && arg !== 0) {
      res += arg + " ";
    }
  }

  return res.trim();
}

// Alternative Approach:
// export type ClassValue =
//   | ClassArray
//   | ClassDictionary
//   | string
//   | number
//   | null
//   | boolean
//   | undefined;
// export type ClassDictionary = Record<string, any>;
// export type ClassArray = Array<ClassValue>;

// export default function classNames(...args: Array<ClassValue>): string {
//   const classes: Array<string> = [];

//   function classNamesImpl(...args: Array<ClassValue>) {
//     args.forEach((arg) => {
//       // Ignore falsey values.
//       if (!arg) {
//         return;
//       }

//       const argType = typeof arg;

//       // Handle string and numbers.
//       if (argType === 'string' || argType === 'number') {
//         classes.push(String(arg));
//         return;
//       }

//       // Handle arrays.
//       if (Array.isArray(arg)) {
//         for (const cls of arg) {
//           classNamesImpl(cls);
//         }

//         return;
//       }

//       // Handle objects.
//       if (argType === 'object') {
//         const objArg = arg as ClassDictionary;
//         for (const key in objArg) {
//           // Only process non-inherited keys.
//           if (Object.hasOwn(objArg, key) && objArg[key]) {
//             classes.push(key);
//           }
//         }

//         return;
//       }
//     });
//   }

//   classNamesImpl(...args);

//   return classes.join(' ');
// }
