const Property = require("../models/Property");

exports.getHome = (req, res, next) => {
  Property.find()
    .then((properties) => {
      if (!properties) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      res.status(200).json({ message: "Success!", properties: properties });
    })
    .catch((err) => console.log(err));
};

exports.getProperties = (req, res, next) => {
  Property.find()
    .then((properties) => {
      if (!properties) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      res.status(200).json({ message: "Success!", properties: properties });
    })
    .catch((err) => console.log(err));
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
      res
        .status(201)
        .json({ message: "Property created successfuly", property: result });
    })
    .catch((err) => console.log(err));
};
