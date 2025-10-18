// Problem: https://bigfrontend.dev/problem/add-comma-to-number

// Without regex:

/**
 * @param {number} num
 * @return {string}
 */
function addComma(num) {
  // removing -ve sign before converting to string so that we don't need to check if current char is number or not each time
  // as each char will be number only
  const sign = num < 0 ? -1 : 1;
  if(sign < 0) {
    num *= -1;
  }

  // no need to add commas in the part after decimal point, so separate it out
  const str = num.toString();
  const [integer, fraction] = str.split('.');
  const digits = integer.split('');

  let result = "";

  for(let i = 0;i < digits.length;i++) {
    const digit = digits[i];

    const countOfRest = digits.length - (i + 1);

    // We add comma when there are multiple-of-3 no. of digits ahead (countOfRest%3 === 0)
    // When we are at last digit (countOfRest === 0) no need to add comma
    if(countOfRest!==0 && countOfRest%3===0) {
      result += digit + ",";
    } else {
      result += digit;
    }
  }

  // Put back the -ve sign that we had removed
  if(sign < 0) {
    result = "-" + result;
  }

  // Put back the fractional part that we had removed
  if(fraction) {
    result += "." + fraction;
  }

  return result;
}

