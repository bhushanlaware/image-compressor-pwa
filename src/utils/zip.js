import JSZipUtils from "jszip-utils";
import jszip from "jszip";
import { saveAs } from "file-saver";

function urlToPromise(url) {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default (files) =>
  new Promise((resolve, reject) => {
    const zip = new jszip();

    files.forEach((imgFile) => {
      zip.file(imgFile.name, imgFile, { binary: true });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      saveAs(content, "_ImageCompressor_.zip");
      resolve("Saved");
    });
  });
