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

const MAX_PROPERTY_IMAGES = 20;

const uploadAvatarMulter = multer({ storage, fileFilter }).single("avatar");
const uploadPropertyImagesMulter = multer({ storage, fileFilter }).array("images", MAX_PROPERTY_IMAGES);

const friendlyMulterError = (err) => {
  if (err.code === "LIMIT_UNEXPECTED_FILE" || err.code === "LIMIT_FILE_COUNT") {
    return Object.assign(
      new Error(`You can upload up to ${MAX_PROPERTY_IMAGES} images per listing.`),
      { statusCode: 422 }
    );
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return Object.assign(new Error("One of your images is too large."), { statusCode: 422 });
  }
  return err;
};

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
    if (err) return next(friendlyMulterError(err));
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
    if (err) return next(friendlyMulterError(err));
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
