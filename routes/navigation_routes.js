var express = require('express');
var router = express.Router();
const { navigationView, navigationData } = require('../controllers/navigation_controller.js');

router.get('/data', navigationData);
router.get('/', navigationView);

module.exports = router;