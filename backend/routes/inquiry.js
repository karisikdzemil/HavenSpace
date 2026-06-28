const express = require("express");
const { body } = require("express-validator");
const inquiryController = require("../controllers/inquiry");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const inquiryValidation = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Please enter a valid email.").normalizeEmail(),
  body("message").trim().isLength({ min: 5 }).withMessage("Message must be at least 5 characters."),
];

router.post("/inquiries", inquiryValidation, inquiryController.createInquiry);
router.get("/inquiries", isAuth, inquiryController.getInquiries);
router.put("/inquiries/:id/read", isAuth, inquiryController.markInquiryRead);

module.exports = router;
