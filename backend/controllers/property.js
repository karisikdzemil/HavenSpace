const Property = require("../models/Property");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const deleteFile = require("../utils/deleteFile");

exports.getProperties = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 6);
    const skip = (page - 1) * limit;

    const { type, city, minPrice, maxPrice, bedNum, bathNum } = req.query;

    const filter = {
      status: "active",
    };

    if (type && type !== "any") {
      filter.type = type;
    }

    if (city && city.trim() !== "") {
      filter["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    if (bedNum && bedNum !== "any") {
      filter.bedNum = Number(bedNum);
    }

    if (bathNum && bathNum !== "any") {
      filter.bathNum = Number(bathNum);
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const total = await Property.countDocuments(filter);

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      properties,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProperty = (req, res, next) => {
  const propertyId = req.params.id;

  Property.findById(propertyId)
    .populate("owner", "avatar name surname position email phone")
    .then((property) => {
      if (!property) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ message: "Property found!", property: property });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUserProperties = (req, res, next) => {
  const id = req.params.id;
  Property.find({ owner: id })
    .then((properties) => {
      res.status(200).json({
        message: "User properties found successfully!",
        properties: properties,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 404;
      }
      next(err);
    });
};

exports.postProperty = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }
  const title = req.body.title;
  const price = req.body.price;
  const city = req.body.city;
  const address = req.body.address;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const description = req.body.description;
  const images = req.files ? req.files.map((file) => file.path) : [];
  const type = req.body.type;
  const bedNum = req.body.bedNum;
  const bathNum = req.body.bathNum;
  const area = req.body.area;
  const garage = req.body.garage;
  const status = req.body.status;
  const interiorFeatures = req.body.interiorFeatures;
  const exteriorFeatures = req.body.exteriorFeatures;

  const location = {
    city: city,
    address: address,
    lat: lat,
    lng: lng,
  };

  const property = new Property({
    title: title,
    price: price,
    location: location,
    description: description,
    images: images,
    owner: req.userId,
    type: type,
    bedNum: bedNum,
    bathNum: bathNum,
    area: area,
    garage: garage,
    status: status,
    interiorFeatures: interiorFeatures,
    exteriorFeatures: exteriorFeatures,
  });

  property
    .save()
    .then((result) => {
      if (!result) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res
        .status(201)
        .json({ message: "Property created successfuly", property: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.soldProperty = async (req, res, next) => {
  const { status } = req.body;
  const propertyId = req.params.id;
  const userId = req.userId;

  const allowedStatuses = ["active", "sold", "rent"];

  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid status!");
    error.statusCode = 422;
    throw error;
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      throw Object.assign(new Error("Property not found!"), {
        statusCode: 404,
      });
    }

    if (property.owner.toString() !== userId) {
      throw Object.assign(new Error("Not authorized!"), { statusCode: 403 });
    }

    if (property.status === status) {
      return res.status(200).json({ message: "Status unchanged" });
    }

    const oldStatus = property.status;
    property.status = status;
    await property.save();

    if (oldStatus !== "sold" && status === "sold") {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $inc: {
            soldProperties: 1,
            totalSales: property.price,
          },
        },
        { new: true }
      ).select("-password");
      return res.status(200).json({
        message: "Property status updated!",
        status: status,
        updatedUser: user,
      });
    }
    res
      .status(200)
      .json({ message: "Property status updated!", status: status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editProperty = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }
  const propertyId = req.params.id;
  const newTitle = req.body.title;
  const newPrice = req.body.price;
  const newLocation = {
    city: req.body.city,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng,
  };
  const newDescription = req.body.description;
  const newType = req.body.type;
  const newBedNum = req.body.bedNum;
  const newBathNum = req.body.bathNum;
  const newArea = req.body.area;
  const newGarage = req.body.garage;
  const newStatus = req.body.status;
  const newInteriorFeatures = req.body.interiorFeatures;
  const newExteriorFeatures = req.body.exteriorFeatures;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      const error = new Error("Property Not Found!");
      error.statusCode = 404;
      throw error;
    }

    if (property.owner.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    let keptImages = property.images;
    if (req.body.removedImages) {
      const removed = Array.isArray(req.body.removedImages)
        ? req.body.removedImages
        : [req.body.removedImages];
      removed.forEach((imgPath) => deleteFile(imgPath));
      keptImages = keptImages.filter((img) => !removed.includes(img));
    }
    if (req.files && req.files.length) {
      const newImages = req.files.map((file) => file.path);
      keptImages = [...keptImages, ...newImages];
    }

    property.title = newTitle;
    property.price = newPrice;
    property.location = newLocation;
    property.description = newDescription;
    property.type = newType;
    property.bedNum = newBedNum;
    property.bathNum = newBathNum;
    property.area = newArea;
    property.garage = newGarage;
    property.status = newStatus;
    property.interiorFeatures = newInteriorFeatures;
    property.exteriorFeatures = newExteriorFeatures;
    property.images = keptImages;

    const result = await property.save();

    res
      .status(201)
      .json({ message: "Property updated successfully", property: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProperty = async (req, res, next) => {
  const propertyId = req.params.id;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      const error = new Error("Property Not Found!");
      error.statusCode = 404;
      throw error;
    }

    if (property.owner.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    property.images.forEach((imgPath) => {
      deleteFile(imgPath);
    });

    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({ message: "Property deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

