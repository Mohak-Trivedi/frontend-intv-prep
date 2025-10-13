// Problem: https://learnersbucket.com/examples/interview/debouncing-with-leading-and-trailing-options/

// Normal debounce
// function debounce(func, wait) {
//   let timeoutID = null;

//   return function (...args) {
//     clearTimeout(timeoutID);

//     const context = this;

//     timeoutID = setTimeout(function () {
//       func.apply(context, args);
//     }, wait);
//   };
// }

// Modified debounce
function debounce(func, wait, options = { leading: false, trailing: true }) {
  let timeoutID = null;
  let isLeadingInvoked = false;

  return function (...args) {
    clearTimeout(timeoutID);

    const context = this;

    if (options.leading && !timeoutID) {
      func.apply(context, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    timeoutID = setTimeout(function () {
      if (options.trailing && !isLeadingInvoked) {
        func.apply(context, args);
      }

    }, wait);
  };
}

const onChange = (e) => {
  console.log(e.target.value);
};

const debouncedSearch = debounce(onChange, 1000);

const input = document.getElementById("search");
input.addEventListener('keyup', debouncedSearch);

/**
 * Necessary to maintain state `isLeadingInvoked` to be able to prevent calling trailing call of func
 * when leading call is just made. In case of both true.
 * We use condition (options.trailing && !isLeadingInvoked)
 *
 * Necessary to use `&& !timeoutID` in `options.leading && !timeoutID` for leading func call, to prevent
 * repeating the lead func call i.e. making sure it is only called at the beginning (lead).
 * NOTE: clearTimeout() cancels the timer but doesn't reset the timeoutID to null.
 */