const express = require("express");
const propertyController = require("../controllers/property");
const { body } = require("express-validator");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// router.get("/", propertyController.getHome);

router.get("/properties", propertyController.getProperties);

router.get("/property/:id", propertyController.getProperty);

router.post(
  "/property",
  [
    body("title").trim().isLength(5),
    body("price").isNumeric(),
    body("description").isLength(5),
  ],
  isAuth,
  propertyController.postProperty
);

router.put(
  "/property/:id",
  [
    body("title").trim().isLength(5),
    body("price").isNumeric(),
    body("description").isLength(5),
  ],
  propertyController.editProperty
);

router.delete("/property/:id", propertyController.deleteProperty);

module.exports = router;
