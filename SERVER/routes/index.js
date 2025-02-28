var express = require('express');
var router = express.Router();

/* GET home page and redirect to localhost:5173 */
router.get('/', function (req, res, next) {
  // Redirect to the new URL (localhost:5173)
  res.redirect('http://localhost:5173');
});

module.exports = router;