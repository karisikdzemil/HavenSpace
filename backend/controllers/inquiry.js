const { validationResult } = require("express-validator");
const Inquiry = require("../models/Inquiry");
const Property = require("../models/Property");

exports.createInquiry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }

  const { name, email, phone, message, type, propertyId, ownerId } = req.body;

  try {
    let owner = ownerId || null;

    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (!property) {
        const error = new Error("Property not found!");
        error.statusCode = 404;
        throw error;
      }
      owner = property.owner;
    }

    const inquiry = await Inquiry.create({
      property: propertyId || undefined,
      owner: owner || undefined,
      name,
      email,
      phone,
      message,
      type: type || "contact",
    });

    res.status(201).json({ message: "Inquiry sent successfully!", inquiry });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({ owner: req.userId })
      .populate("property", "title images")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Inquiries found!", inquiries });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.markInquiryRead = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      const error = new Error("Inquiry not found!");
      error.statusCode = 404;
      throw error;
    }

    if (!inquiry.owner || inquiry.owner.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    inquiry.status = "read";
    await inquiry.save();

    res.status(200).json({ message: "Inquiry marked as read!", inquiry });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
