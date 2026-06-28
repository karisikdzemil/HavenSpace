const crypto = require("crypto");
const User = require("../models/User");
const Property = require("../models/Property");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const deleteFile = require("../utils/deleteFile");
const { sendResetPasswordEmail } = require("../config/mailer");

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed.",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error("User doesn't exist!");
        error.statusCode = 422;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          const error = new Error("Passwords don't match!");
          error.statusCode = 422;
          throw error;
        }

        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );

        user.password = undefined;

        res.status(200).json({
          message: "Login successful!",
          user: user,
          token: token,
        });
      });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }
  const {
    name,
    surname,
    email,
    password,
    confirmPassword,
    position,
    description,
    yearsExperience,
    phone,
    location,
    linkedin,
    facebook,
    instagram,
    languages,
  } = req.body;
  const avatar = req.file ? req.file.path.replace("assets/", "") : null;

  if (password !== confirmPassword) {
    const error = new Error("Passwords don't match!");
    error.statusCode = 422;
    throw error;
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("Email already exists!");
        error.statusCode = 409;
        throw error;
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        surname: surname,
        email: email,
        avatar: avatar,
        password: hashedPassword,
        position: position,
        description: description,
        yearsExperience: yearsExperience,
        phone: phone,
        location: location,
        linkedin: linkedin,
        facebook: facebook,
        instagram: instagram,
        languages: languages,
      });
      return user.save();
    })
    .then((result) => {
      result.password = undefined;
      const token = jwt.sign({ email: result.email, userId: result._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.status(201).json({
        message: "User created successfully!",
        user: result,
        token: token
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAgents = (req, res, next) => {
  User.find().then(users => {
    if(!users){
      const error = new Error('Agents not found!');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({message: "Agents found!", agents: users})

  }).catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}

exports.getUser = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId).then(user => {
    if(!user){
      const error = new Error('User not found!');
      error.statusCode = 500;
      throw error;
    }
    res.status(200).json({message: 'User found!', user: user});
  }).catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}

exports.editUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    const {
      name, surname, position, description, phone, location,
      linkedin, facebook, instagram, languages, yearsExperience,
    } = req.body;

    if (name !== undefined) user.name = name;
    if (surname !== undefined) user.surname = surname;
    if (position !== undefined) user.position = position;
    if (description !== undefined) user.description = description;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (facebook !== undefined) user.facebook = facebook;
    if (instagram !== undefined) user.instagram = instagram;
    if (yearsExperience !== undefined) user.yearsExperience = yearsExperience;
    if (languages !== undefined) {
      user.languages = Array.isArray(languages) ? languages : [languages];
    }

    if (req.file) {
      if (user.avatar) deleteFile(user.avatar);
      user.avatar = req.file.path.replace("assets/", "");
    }

    const result = await user.save();
    result.password = undefined;

    res.status(200).json({ message: "Profile updated successfully!", user: result });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    const error = new Error("A valid current and new password (min 6 characters) are required.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const user = await User.findById(req.userId).select("+password");
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      const error = new Error("Current password is incorrect!");
      error.statusCode = 422;
      throw error;
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.userId).select("+password");
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password || "", user.password);
    if (!isMatch) {
      const error = new Error("Password is incorrect!");
      error.statusCode = 422;
      throw error;
    }

    const properties = await Property.find({ owner: user._id });
    properties.forEach((property) => {
      property.images.forEach((imgPath) => deleteFile(imgPath));
    });
    await Property.deleteMany({ owner: user._id });

    if (user.avatar) deleteFile(user.avatar);

    await User.findByIdAndDelete(user._id);

    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "If an account with that email exists, a reset link has been sent.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${rawToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    res.status(200).json({
      message: "If an account with that email exists, a reset link has been sent.",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    const error = new Error("Password must be at least 6 characters long.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      const error = new Error("Reset link is invalid or has expired.");
      error.statusCode = 400;
      throw error;
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully! You can now log in." });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.toggleFavorite = async (req, res, next) => {
  const propertyId = req.params.id;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    const index = user.favorites.findIndex((fav) => fav.toString() === propertyId);
    let isFavorite;
    if (index > -1) {
      user.favorites.splice(index, 1);
      isFavorite = false;
    } else {
      user.favorites.push(propertyId);
      isFavorite = true;
    }

    await user.save();

    res.status(200).json({ message: "Favorites updated!", isFavorite, favorites: user.favorites });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("favorites");
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Favorites found!", properties: user.favorites });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
