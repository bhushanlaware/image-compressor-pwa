import imageCompression from "browser-image-compression";

export default async (files, size, quality) => {
  let compressed = [];
  var options = {
    maxSizeMB: 1,
    maxWidthOrHeight: size,
    useWebWorker: true,
    maxIteration: quality,
  };
  for (const imageFile of files) {
    const comImg = await imageCompression(imageFile, options);
    comImg.blobURL = URL.createObjectURL(comImg);
    compressed.push(comImg);
  }
  return compressed;
};
