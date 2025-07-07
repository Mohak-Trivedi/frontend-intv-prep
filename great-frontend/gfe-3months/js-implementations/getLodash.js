// Problem link: https://www.greatfrontend.com/questions/javascript/get?list=three-months

// Solution:
/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 */
export default function get(objectParam, pathParam, defaultValue) {
  let properties;

  // If path is a string, split it by '.'
  if (typeof pathParam === "string") {
    properties = pathParam.split(".");
  } else {
    properties = pathParam;
  }

  // Loop through the properties in the path
  for (let property of properties) {
    // If objectParam is null, undefined, or a primitive type that isn't an object, return undefined
    if (
      objectParam === null ||
      objectParam === undefined ||
      typeof objectParam !== "object"
    ) {
      return defaultValue;
    }

    // Move one level deeper in the object
    objectParam = objectParam[property];

    // If the next level doesn't exist, return defaultValue
    // Consider : get({}, 'a', 1))
    if (objectParam === undefined) {
      return defaultValue;
    }
  }

  return objectParam;
}
