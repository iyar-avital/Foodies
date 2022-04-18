var express = require('express');
var router = express.Router();
const { flowersView, flowersData } = require('../controllers/flowers_controller.js');

router.get('/data', flowersData);
router.get('/', flowersView);

module.exports = router;
