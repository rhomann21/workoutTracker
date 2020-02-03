const router = require('express').Router();
const path = require("path");


// Create all our routes and set up logic within those routes where required.
router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/exercise.html"));
});

router.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./../public/stats.html"));
});

module.exports = router;