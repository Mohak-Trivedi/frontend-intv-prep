// Problem: https://bigfrontend.dev/problem/compress-a-string


/**
 * @param {string} str
 * @return {string}
 */
function compress(str) {
  let res = "";
  let char = str.charAt(0);
  let freq = 1;

  for(let i = 1;i < str.length;i++) {
    const currChar = str.charAt(i);
    if(currChar === char) {
      freq++;
    } else {
      if(freq > 1) {
        res += char + freq;
      } else {
        res += char;
      }

      char = currChar;
      freq = 1;
    }
  }

  if(freq > 1) {
    res += char + freq;
  } else {
    res += char;
  }

  return res;
}