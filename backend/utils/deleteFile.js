const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const extractPublicId = (url) => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
  return match ? match[1] : null;
};

module.exports = function deleteFile(filePath) {
  if (!filePath) return;

  if (/^https?:\/\//.test(filePath)) {
    const publicId = extractPublicId(filePath);
    if (!publicId) return;
    cloudinary.uploader.destroy(publicId).catch((err) => {
      console.log("Failed to delete Cloudinary file:", err.message);
    });
    return;
  }

  const fullPath = path.join(__dirname, "..", "assets", filePath);
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.log("Failed to delete file:", err.message);
    }
  });
};
