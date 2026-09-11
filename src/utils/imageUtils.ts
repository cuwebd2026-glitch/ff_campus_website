import imageCompression from "browser-image-compression";

/**
 * Compresses an image file and converts it to a base64 data URL,
 * exactly matching the compression profile used in the original
 * standalone form (so payload size/behavior against the Apps Script
 * backend doesn't change).
 */
export const compressAndConvertToBase64 = async (file: File): Promise<string> => {
  const options = { maxSizeMB: 1.0, maxWidthOrHeight: 1920, useWebWorker: true };
  const compressedFile = await imageCompression(file, options);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
};