// Problem link: https://www.greatfrontend.com/questions/javascript/debounce?list=three-months

export default function debounce(func, wait) {
  let timerId;
  return function debounced(...arg) {
    let self = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.call(self, ...arg);
    }, wait);
  };
}
