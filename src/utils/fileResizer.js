import Resizer from "react-image-file-resizer";
import arrayBufferToBuffer from "arraybuffer-to-buffer";
import sizeOf from "buffer-image-size";

const resizeFile = (file, dimention, quality) =>
  new Promise((resolve, reject) => {
    console.log(file.name.split(".").pop());
    console.log("H", dimention.height);
    console.log("W", dimention.width);
    Resizer.imageFileResizer(
      file,
      dimention.height,
      dimention.width,
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
    //const dataUrl = URL.createObjectURL(files[index]);
    // const imgEl = document.createElement("img");
    // imgEl.src = dataUrl;

    // imgEl.onload = async function () {
    //   const resFile = await resizeFile(
    //     files[index],
    //     {
    //       height: (imgEl.naturalHeight / 100) * size,
    //       width: (imgEl.naturalWidth / 100) * size,
    //     },
    //     quality
    //   );
    // newFiles.push(resFile);
    const arrayBuffer = await files[index].arrayBuffer();
    const dimention = sizeOf(arrayBufferToBuffer(arrayBuffer));
    const resFile = await resizeFile(
      files[index],
      {
        height: (dimention.height / 100) * size,
        width: (dimention.width / 100) * size,
      },
      quality
    );
    newFiles.push(resFile);
  }

  return newFiles;
};

export default resizeFiles;
