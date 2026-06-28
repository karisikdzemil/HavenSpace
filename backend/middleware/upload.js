const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();

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

const uploadAvatarMulter = multer({ storage, fileFilter }).single("avatar");
const uploadPropertyImagesMulter = multer({ storage, fileFilter }).array("images", 5);

const uploadToCloudinary = (file, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `havenspace/${folder}` },
      (err, result) => {
        if (err) return reject(err);
        resolve({ path: result.secure_url, filename: result.public_id });
      }
    );
    stream.end(file.buffer);
  });

exports.uploadAvatar = (req, res, next) => {
  uploadAvatarMulter(req, res, async (err) => {
    if (err) return next(err);
    if (!req.file) return next();

    try {
      const result = await uploadToCloudinary(req.file, "avatars");
      req.file.path = result.path;
      req.file.filename = result.filename;
      next();
    } catch (uploadErr) {
      next(uploadErr);
    }
  });
};

exports.uploadPropertyImages = (req, res, next) => {
  uploadPropertyImagesMulter(req, res, async (err) => {
    if (err) return next(err);
    if (!req.files || !req.files.length) return next();

    try {
      const uploaded = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file, "properties"))
      );
      req.files.forEach((file, i) => {
        file.path = uploaded[i].path;
        file.filename = uploaded[i].filename;
      });
      next();
    } catch (uploadErr) {
      next(uploadErr);
    }
  });
};
