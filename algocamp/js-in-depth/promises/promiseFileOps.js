/*
Promises solve the problems faced in callbacks:
1. Inversion of Control: No need to pass the function as callback, as we have resolve() to call and define in .then()
2. Callback Hell: Promise Chaining due to .then() makes it easy to avoid the pyramid-like structure formed in Callback Hell.
*/

function downloadData(url) {
    /*
    Downloads data from given url.
    */
    console.log("Start Download - download from url", url);
    return new Promise(function exec(resolve, reject) {
        setTimeout(function download() {
          console.log("End Download");
          const data = 'ABCDEF';
          resolve(data);
        }, 2000);
    });
}

function writeFile(data) {
    /*
    Writes given data to a file
    */
    console.log("Start Write - Start Writing data", data, " in file");
    return new Promise(function exec(resolve, reject) {
        setTimeout(function write() {
            console.log("End Write");
            const file = "abc.txt";
            resolve(file);
        }, 3000);
    });
}

function uploadFile(file, url) {
    /*
    Uploads given file to given url.
    */
    console.log("Start Upload - uploading file ", file, "at url ", url);
    return new Promise(function exec(resolve, reject) {
        setTimeout(function upload() {
            console.log("End Upload");
            const status = "SUCCESS";
            resolve(status);
        }, 2000);
    });
}

downloadData("www.yourSite.com").then(function processDownload(data) {
   console.log("We are now going to process the downloaded data.");
   return writeFile(data);
}).then(function processWrite(file) {
    console.log("We have downloaded the data and written it into a file, now will upload.");
    return uploadFile(file, "www.mySite.com");
}).then(function processUpload(status) {
    console.log("The upload status is: ", status);
});