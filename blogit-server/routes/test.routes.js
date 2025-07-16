const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");

router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: `Welcome back, user ${req.user.userId}!`,
  });
});

module.exports = router;
