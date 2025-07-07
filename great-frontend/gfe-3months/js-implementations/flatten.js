// Problem Link: https://www.greatfrontend.com/questions/javascript/flatten?list=three-months

/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  let res = [];
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      res = res.concat(...flatten(value[i])); // [2,3,4,[5]] //
    } else {
      res.push(value[i]);
    }
  }

  return res;
}
