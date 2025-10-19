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


// With Regex

/**
 * @param {number} num
 * @return {string}
 */
// function addComma(num) {
//   // your code here
//   const sign = (num < 0) ? -1 : 1;
//   if(sign < 0) {
//     num *= -1;
//   }

//   const str = num.toString();
//   let [integer, fraction] = str.split('.');

//   let result = integer.replace(/(\d)(?=(\d{3})+$)/g, '$1,');

//   if(sign < 0) {
//     result = "-" + result;
//   }
//   if(fraction) {
//     result += "." + fraction;
//   }

//   return result;
// }


/*
Regex Explanation:
Break-down — token by token

/ … /g

/ start and end of the regex.

g flag = global, meaning “find all matches” (not just the first).

(\d)

\d matches a single digit (0–9).

The parentheses () create capture group 1 — that digit will be available as $1 in the replacement.

(?= ... )

This is a positive lookahead. It asserts that the pattern inside (?=...) must follow the current position, but it does not consume characters (the lookahead itself doesn’t become part of the matched text).

In other words: “match a digit only if it is followed by the following pattern.”

(\d{3})+ inside the lookahead

\d{3} = exactly three digits.

(...) + = one or more repetitions of that 3-digit chunk.

The inner parentheses create capture group 2, but group 2 is unused in the replacement — group 2 exists because of (\d{3}).

+$ immediately after (\d{3}) inside the lookahead

+ (already mentioned) means “one or more of the 3-digit groups”.

$ anchors the lookahead to the end of the string. So the lookahead requires that the remaining characters after the matched digit are made up of one or more complete 3-digit groups and then the string ends.

That’s how the regex ensures commas are inserted counting from the right-hand side (groups of three digits up to the end).

What the replacement '$1,' does

When a match is found, the matched text is the single digit captured in group 1.

'$1,' replaces that digit with itself ($1) followed by a comma ,.

Because the lookahead didn’t consume the following digits, they remain in the string — so the comma is inserted after the captured digit.
*/