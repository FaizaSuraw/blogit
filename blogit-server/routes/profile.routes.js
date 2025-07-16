const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updatePassword
} = require("../controllers/profile.controller");
const authenticate = require("../middlewares/auth.middleware");

router.get("/", authenticate, getProfile);
router.patch("/", authenticate, updateProfile);
router.patch('/update-password', authenticate,updatePassword);

module.exports = router;
