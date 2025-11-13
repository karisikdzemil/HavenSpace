const Property = require("../models/Property");

exports.getHome = (req, res, next) => {
  Property.find()
    .then((properties) => {
      if (!properties) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ message: "Success!", properties: properties });
    })
    .catch((err) => {
      err.statusCode(500);
      next(err);
    });
};

exports.getProperties = (req, res, next) => {
  Property.find()
    .then((properties) => {
      if (!properties) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ message: "Success!", properties: properties });
    })
    .catch((err) => {
      err.statusCode(500);
      next(err);
    });
};

exports.getProperty = (req, res, next) => {
  const propertyId = req.params.id;

  Property.findOne(propertyId)
    .then((property) => {
      if (!property) {
        const error = new Error("Property Not Found!");
        error.statusCode = 500;
        throw error;
      }
      res.status(200).json({ message: "Property found!", property: property });
    })
    .catch((err) => {
      err.statusCode(500);
      next(err);
    });
};

exports.postProperty = (req, res, next) => {
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
      err.statusCode(500);
      next(err);
    });
};

exports.editProperty = (req, res, next) => {
  const propertyId = req.params.id;
  const newTitle = req.body.title;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  const editedProperty = {
    _id: propertyId,
    title: newTitle,
    price: newPrice,
    description: newDescription,
  };
  editedProperty
    .save()
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
      err.statusCode(500);
      next(err);
    });
};

exports.deleteProperty = (req, res, next) => {
  const propertyId = req.params.id;

  Property.findOneAndDelete(propertyId)
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
      err.statusCode(500);
      next(err);
    });
};
