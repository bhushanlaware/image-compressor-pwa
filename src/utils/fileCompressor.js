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
    compressed.push(comImg);
  }
  return compressed;
};
