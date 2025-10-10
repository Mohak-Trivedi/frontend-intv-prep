// Normal throttle
// function throttle(func, wait) {
//   let shouldThrottle = false;

//   return function (...args) {
//     if (shouldThrottle) {
//       return;
//     }

//     shouldThrottle = true;
//     setTimeout(() => {
//       shouldThrottle = false;
//     }, wait);
//     func.apply(this, args);
//   };
// }

// Modified throttle
function throttle(tasksQueue, limit, func, wait) {
  let shouldThrottle = false;

  return function (...args) {
    if (shouldThrottle) {
      return;
    }

    shouldThrottle = true;
    setTimeout(() => {
      shouldThrottle = false;
    }, wait);
    const executeTasks = tasksQueue.splice(0, limit);
    func(executeTasks);
  };
}

const btn = document.getElementById("btn");
btn.addEventListener(
  "click",
  throttle(
    [1, 2, 3, 4, 5, 6, 7, 8],
    2,
    (tasks) => {
      console.log(tasks);
    },
    1000
  )
);