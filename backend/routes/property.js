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
    body("description")
      .isLength({ min: 25 })
      .withMessage("The description must be longer than 25 letters!"),
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
