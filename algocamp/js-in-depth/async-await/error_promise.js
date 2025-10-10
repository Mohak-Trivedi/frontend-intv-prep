function downloadData(url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from url", url);
    setTimeout(function download() {
      console.log("Downloading completed");
      const data = "ABCDEF";
      reject(data);
    }, 6000);
  });
}

function writeFile(data) {
  return new Promise(function exec(resolve, reject) {
    console.log("Started writing in a file with", data);
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

downloadData("www.xyz.com")
  .then(function processDownload(value) {
    console.log("downloading done with the following value", value);
    return writeFile(value);
  }, function downloadReject(value) {
    console.log("download reject", value);
    throw value;
  })
  .then(function processWrite(value) {
    console.log("data written in the file with name", value);
    return uploadFile(value, "www.drive.google.come");
  }, function writeReject(value) {
    console.log("write reject", value);
    throw value;
  })
  .then(function processUpload(value) {
    console.log("we have uploaded with", value);
  }, function uploadReject(value) {
    console.log("upload reject", value);
  });