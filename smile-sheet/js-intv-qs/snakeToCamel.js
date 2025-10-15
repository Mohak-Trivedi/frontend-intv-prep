// Problem: https://bigfrontend.dev/problem/convert-snake_case-to-camelCase


/**
 * @param {string} str
 * @return {string}
 */
function snakeToCamel(str) {
  let camelCaseStr = "";

  for(let i = 0;i < str.length;i++) {
    let currChar = str.charAt(i);

    if(currChar === '_') {
      if(i == 0 || i == str.length-1) {
        camelCaseStr += currChar;
      } else if(i-1>=0 && str.charAt(i-1)==='_') {
        camelCaseStr += currChar;
      } else if(i+1 < str.length && str.charAt(i+1)==='_') {
        camelCaseStr += currChar;
      }
    } else if(i-1>0 && str.charAt(i-1)==='_' && str.charAt(i-2)!=='_') {
      camelCaseStr += currChar.toUpperCase();
    } else {
      camelCaseStr += currChar;
    }
  }

  return camelCaseStr;
}