const fs = require("fs");
const path = require("path");

module.exports = function deleteFile(filePath) {
  const fullPath = path.join(__dirname, "..", "assets", filePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.log("Failed to delete file:", err);
    }
  });
};
