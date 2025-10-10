function downloadData(url) {
  return new Promise(function exec(resolve, reject) {
    console.log("Starting to download data from url", url);
    setTimeout(function download() {
      console.log("Downloading completed");
      const data = "ABCDEF";
      reject(data);
    }, 1000);
  });
}

async function steps() {
  try {
    console.log("Starting steps");
    const downloadedData = await downloadData("www.xyz.com");
    return downloadedData;
  } catch (error) {
    console.log("we have handled the error", error);
  } finally {
    console.log("ending");
  }
}

steps();