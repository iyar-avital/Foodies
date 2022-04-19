var express = require('express');
var router = express.Router();
const { flowersView, flowersData, addFlower } = require('../controllers/flowers_controller.js');

router.get('/data', flowersData);
router.post('/add', addFlower);
router.get('/', flowersView);

module.exports = router;
