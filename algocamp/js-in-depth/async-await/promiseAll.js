function downloadData(url, time) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from", url);
    setTimeout(function download() {
      console.log("Downloading completed from ", url);

      const data = "ABCDEF from" + url;

      if (time > 3000) {
        reject(data);
      }

      resolve(data);
    }, time);
  });
}

const p1 = downloadData("www.abc1.com", 5000);
const p2 = downloadData("www.abc2.com", 1000);
const p3 = downloadData("www.abc3.com", 3000);
Promise.all([p1, p2, p3]).then(function fulfillHandler(values) {
  console.log(values);
});