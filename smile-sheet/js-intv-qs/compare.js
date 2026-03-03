function compare(val1, val2) {
    // Some validations before doing the actual comparison
    // Check if both are arrays or objects
    const val1Type = Object.prototype.toString.call(val1);
    const val2Type = Object.prototype.toString.call(val2);
    if(["[object Object]", "[object Array]"].indexOf(val1Type) < 0 || ["[object Object]", "[object Array]"].indexOf(val2Type) < 0) {
        return false;
    }

    // Check if both are of the same type i.e. both are arrays or both are objects
    if(val1Type !== val2Type) return false;

    // Check if both are of the same length
    const val1Len = val1Type === "[object Array]" ? val1.length : Object.keys(val1).length;
    const val2Len = val2Type === "[object Array]" ? val2.length : Object.keys(val2).length;
    if(val1Len !== val2Len) return false;

    function equal(item1, item2) {
        // Some validations before doing the actula comparison
        const item1Type = Object.prototype.toString.call(item1);
        const item2Type = Object.prototype.toString.call(item2);
        // Check if both are of the same type
        if (item1Type !== item2Type) return false;

        // If both are arrays/objects, compare recursively
        if (["[object Object]", "[object Array]"].includes(item1Type)) {
            return compare(item1, item2);
        }

        // Handle functions separately
        if (item1Type === "[object Function]") {
            return item1.toString() === item2.toString();
        }

        // Compare primitive types
        return item1 === item2;
    }

    // Now, let's do the actual comparison i.e. check equality index by index or key by key
    if(val1Type === "[object Array]") {
        for(let i = 0;i < val1Len;i++) {
            if(equal(val1[i], val2[i]) === false) return false;
        }
    } else {
        for(let key in val1) {
            if(val1.hasOwnProperty(key)) {
                if(equal(val1[key], val2[key]) === false) return false;
            }
        }
    }

    // all tests passed
    return true;
}

/*
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 3, 2, 4, 5];
console.log(compare(arr1, arr2));
// returns false

let arrObj1 = [1, 2, {
	a: 1,
	b: 2,
	c: 3,
  d: function(){
    console.log("abcd");
  }
}, 4, 5];
let arrObj2 = [1, 2, {
	c: 3,
	b: 2,
	a: 1,
  d: function(){
    console.log("abcd");
  }
}, 4, 5];
console.log(compare(arrObj1, arrObj2));
// returns true

let arr4 = [[1, 2], [3, 4, 5]];
let arr3 = [[1, 2], [3, 4, 5]];
console.log(compare(arr4, arr3));
// returns true
*/