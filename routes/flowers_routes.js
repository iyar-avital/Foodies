var express = require('express');
var router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

const { flowersView, flowersData, addFlower } = require('../controllers/flowers_controller.js');

router.get('/data', flowersData);
router.post('/add', upload.single('image'), addFlower);
router.get('/', flowersView);

module.exports = router;
