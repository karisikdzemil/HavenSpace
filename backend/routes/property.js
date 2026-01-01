const express = require("express");
const propertyController = require("../controllers/property");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// router.get("/", propertyController.getHome);

router.get("/properties", propertyController.getProperties);

router.get("/property/:id", propertyController.getProperty);

router.get("/user-properties", isAuth, propertyController.getUserProperties);

router.post(
  "/property",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("The name must be longer than 5 letters!"),
    body("price")
      .isNumeric()
      .withMessage("The value must be a number!")
      .isInt({ gt: 0 })
      .withMessage("The value must be greater than 0!"),
    body("location")
      .exists()
      .withMessage("Location is required!")
      .isObject()
      .withMessage("Location must be an object!"),
    body("location.city").trim().notEmpty().withMessage("City is required!"),
    body("location.address")
      .trim()
      .notEmpty()
      .withMessage("Address is required!"),
    body("location.lat")
      .notEmpty()
      .withMessage("Latitude is required!")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be between -90 and 90"),
    body("location.lng")
      .notEmpty()
      .withMessage("Longitude is required!")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be between -180 and 180"),
    body("description")
      .isLength({ min: 25 })
      .withMessage("The description must be longer than 25 letters!"),
    body("type")
      .notEmpty()
      .withMessage("Type is required!")
      .isIn(["rent", "sale"])
      .withMessage("Type must be either rent or sale"),
    body("bedNum")
      .notEmpty()
      .withMessage("Bedroom number is required!")
      .isNumeric.withMEssage("Value must be a number!")
      .isInt({ gt: 0 })
      .withMessage("The value must be greater than 0!"),
    body("bathNum")
      .notEmpty()
      .withMessage("Bathroom number is required!")
      .isNumeric.withMEssage("Value must be a number!")
      .isInt({ gt: 0 })
      .withMessage("The value must be greater than 0!"),
    body("area")
      .notEmpty()
      .withMessage("Property area is required!")
      .isNumeric.withMEssage("Value must be a number!")
      .isInt({ gt: 0 })
      .withMessage("The value must be greater than 0!"),
    body("garage").isNumeric().withMessage("Value must be a number!"),
    body("interiorFeatures")
      .isArray({ min: 1 })
      .withMessage("Interior features must an array!"),
    body("interiorFeatures.*")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Each interior feature must be between 2-3 words!"),
    body("exteriorFeatures")
      .isArray({ min: 1 })
      .withMessage("Exterior features must an array!"),
    body("exteriorFeatures.*")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Each exterior feature must be between 2-3 words!"),
  ],
  isAuth,
  propertyController.postProperty
);

router.put(
  "/edit-property/:id",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("The name must be longer than 5 letters!"),
    body("price")
      .isNumeric()
      .withMessage("The value must be a number!")
      .isInt({ gt: 0 })
      .withMessage("The value must be greater than 0!"),
    body("description")
      .isLength({ min: 25 })
      .withMessage("The description must be longer than 25 letters!"),
  ],
  isAuth,
  propertyController.editProperty
);

router.delete("/property/:id", isAuth, propertyController.deleteProperty);

module.exports = router;
