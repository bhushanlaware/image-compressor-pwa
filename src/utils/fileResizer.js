import React from "react";
import Resizer from "react-image-file-resizer";

const resizeFile = (file, size, quality) =>
  new Promise((resolve, reject) => {
    console.log(file.name.split(".").pop());
    Resizer.imageFileResizer(
      file,
      size * 20,
      size * 20,
      file.name.split(".").pop(),
      quality,
      0,
      (uri) => {
        resolve({ file, uri });
      },
      "base64"
    );
  });

const resizeFiles = async (files, size, quality) => {
  const newFiles = [];
  for (let index = 0; index < files.length; index++) {
    // const imgEl = React.createElement("img", {
    //   src: URL.createObjectURL(files[index].uri),
    // });
    //  console.log(imgEl);
    const resFile = await resizeFile(files[index], size, quality);
    newFiles.push(resFile);
  }
  return newFiles;
};

export default resizeFiles;
