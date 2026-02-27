// Problem: https://www.greatfrontend.com/questions/javascript/deep-merge?practice=practice&tab=coding

export default function deepMerge(valA, valB) {
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [ ...valA, ...valB ];
  }

  if (isPlainObject(valA) && isPlainObject(valB)) {
    const newObj = { ...valA };

    for (const [key, value] of Object.entries(valB)) {
      if (Object.prototype.hasOwnProperty.call(valA, key)) {
        newObj[key] = deepMerge(valA[key], valB[key]);
      } else {
        newObj[key] = value;
      }
    }

    return newObj;
  }

  return valB;
}

function isPlainObject(value) {
  if (value === null) {
    return;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}