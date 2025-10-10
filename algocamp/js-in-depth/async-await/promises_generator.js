function downloadData(url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from url", url);
    setTimeout(function download() {
      console.log("Downloading completed");
      const data = "ABCDEF"; // downloaded data dummy
      resolve(data);
    }, 6000);
  });
}

function writeFile(data) {
  return new Promise(function exec(resolve, reject) {
    console.log("Started writing a file with", data);
    setTimeout(function write() {
      console.log("Completed writing the data in a file");
      const fileName = "file.txt";
      resolve(fileName);
    }, 5000);
  });
}

function uploadFile(file, url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Started uploading", file, "on", url);
    setTimeout(function upload() {
      console.log("Upload completed");
      const status = "SUCCESS";
      resolve(status);
    }, 2000);
  });
}

function doAfterReceiving(value) {
  let future = iter.next(value);
  if (future.done) return;
  future.value.then(doAfterReceiving);
}

function* steps() {
  const downloadedData = yield downloadData("www.xyz.com");
  console.log("data downloaded is", downloadedData);
  const fileWritten = yield writeFile(downloadedData);
  console.log("File written is", fileWritten);
  const uploadStatus = yield uploadFile(fileWritten, "www.drive.google.com");
  console.log("Upload status is", uploadStatus);
  return uploadStatus;
}

const iter = steps();
const downloadYield = iter.next();
downloadYield.value.then(doAfterReceiving);