const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = path.join("assets", folder);
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") +
          "-" +
          file.originalname
      );
    },
  });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid image format"), false);
  }
};

exports.uploadAvatar = multer({
  storage: storage("avatar"),
  fileFilter,
}).single("avatar");

exports.uploadPropertyImages = multer({
  storage: storage("images"),
  fileFilter,
}).array("images", 5);
