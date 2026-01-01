const Property = require("../models/Property");
const { validationResult } = require("express-validator");

// exports.getHome = (req, res, next) => {
//   Property.find()
//     .then((properties) => {
//       if (properties.length === 0) {
//         const error = new Error("Property Not Found!");
//         error.statusCode = 500;
//         throw error;
//       }
//       res.status(200).json({ message: "Success!", properties: properties });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

exports.getProperties = (req, res, next) => {
  Property.find()
    .then((properties) => {
      // if (properties.length === 0) {
      //   const error = new Error("Property Not Found!");
      //   error.statusCode = 500;
      //   throw error;
      // }
      res.status(200).json({ message: "Success!", properties: properties });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProperty = (req, res, next) => {
  const propertyId = req.params.id;

  Property.findById(propertyId)
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
  Property.find({ owner: req.userId })
    .populate("owner", "-password")
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
  const location = req.body.location;
  const description = req.body.description;
  // const images = req.body.images;
  const type = req.body.type;
  const bedNum = req.body.bedNum;
  const bathNum = req.body.bathNum;
  const area = req.body.area;
  const garage = req.body.garage;
  const status = req.body.status;
  const interiorFeatures = req.body.interiorFeatures;
  const exteriorFeatures = req.body.exteriorFeatures;

  const property = new Property({
    title: title,
    price: price,
    location: location,
    description: description,
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

exports.editProperty = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed.", errors: errors.array() });
  }
  const propertyId = req.params.id;
  const newTitle = req.body.title;
  const newPrice = req.body.price;
  const newLocation = req.body.location;
  const newDescription = req.body.description;
  // const images = req.body.images;
  const newType = req.body.type;
  const newBedNum = req.body.bedNum;
  const newBathNum = req.body.bathNum;
  const newArea = req.body.area;
  const newGarage = req.body.garage;
  const newStatus = req.body.status;
  const newInteriorFeatures = req.body.interiorFeatures;
  const newExteriorFeatures = req.body.exteriorFeatures;

  Property.findByIdAndUpdate(
    propertyId,
    {
      title: newTitle,
      price: newPrice,
      location: newLocation,
      description: newDescription,
      type: newType,
      bedNum: newBedNum,
      bathNum: newBathNum,
      area: newArea,
      garage: newGarage,
      status: newStatus,
      interiorFeatures: newInteriorFeatures,
      exteriorFeatures: newExteriorFeatures,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res
        .status(201)
        .json({ message: "Property updated successfully", property: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProperty = (req, res, next) => {
  const propertyId = req.params.id;

  Property.findByIdAndDelete(propertyId)
    .then((property) => {
      if (!property) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Property deleted!", property: property });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
