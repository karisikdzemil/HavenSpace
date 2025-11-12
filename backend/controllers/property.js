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

