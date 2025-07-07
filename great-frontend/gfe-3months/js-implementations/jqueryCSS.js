// Problem link: https://www.greatfrontend.com/questions/javascript/jquery-css?list=three-months

/**
 * @param {string} selector
 * @return {{css: Function}}
 */
export default function $(selector) {
  const ele = document.querySelector(selector);

  const obj = {
    css: function (prop, val) {
      // setter
      if (prop && val) {
        if (ele != null) ele.style[prop] = val; // only if element exists, we can set the style
        return this;
      }
      // getter
      if (!val) {
        if (!ele) return undefined; // if element not present, its property's value will be undefined
        const value = ele.style[prop]; // element exists: get the value of the property of the element
        return value === "" ? undefined : value; // css property not set: return undefined, else return value
      }
    },
  };
  return obj;
}
