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
      if (properties.length === 0) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
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

exports.postProperty = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Enter a valid data!');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;

  const property = new Property({
    title: title,
    price: price,
    description: description,
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
  if(!errors.isEmpty()){
    const error = new Error('Enter a valid data!');
    error.statusCode = 500;
    throw error;
  }
  const propertyId = req.params.id;
  const newTitle = req.body.title;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  Property.findByIdAndUpdate(
    propertyId,
    {
      title: newTitle,
      price: newPrice,
      description: newDescription,
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
