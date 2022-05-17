var express = require('express');
var router = express.Router();
const { personalAreaView,
    personalAreaData,
    usersView,
    usersData,
    addUser,
    deleteUser,
    updateUser
} = require('../controllers/users_controller.js');

// ------------- personal area -------------
router.get("/personal_area", personalAreaView);
router.get("/personal_area/data", personalAreaData);

// ----------------- users -----------------
router.get('/data', usersData);
router.post('/add', addUser);
router.delete('/delete/:name', deleteUser);
router.put('/update/:name', updateUser);
router.get('/', usersView);

module.exports = router;
