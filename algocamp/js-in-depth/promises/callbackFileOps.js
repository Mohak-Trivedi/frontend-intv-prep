/*
Issues with callback:
1. Inversion of Control
2. Callback Hell
*/

function downloadData(url, cb) {
    /*
    Downloads data from given url.
    */
    console.log("Start Download - download from url", url);
    setTimeout(function download() {
      console.log("End Download");
      const data = 'ABCDEF';
      cb(data);
    }, 2000);
}

function writeFile(data, cb) {
    /*
    Writes given data to a file
    */
    console.log("Start Write - Start Writing data", data, " in file");
    setTimeout(function write() {
        console.log("End Write");
        const file = "abc.txt";
        cb(file);
    }, 3000);
}

function uploadFile(file, url, cb) {
    /*
    Uploads given file to given url.
    */
    console.log("Start Upload - uploading file ", file, "at url ", url);
    setTimeout(function upload() {
        console.log("End Upload");
        const status = "SUCCESS";
        cb(status);
    }, 2000)
}

downloadData("www.yourSite.com", function processDownload(data) {
    console.log("We are now going to process the downloaded data.");
    writeFile(data, function processWrite(file) {
        console.log("We have downloaded the data and written it into a file, now will upload.");
        uploadFile(file, "www.mySite.com", function processUpload(status) {
            console.log("The upload status is: ", status);
        });
    });
});