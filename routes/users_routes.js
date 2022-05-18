var express = require('express');
var router = express.Router();
const { 
    usersView,
    usersData,
    addUser,
    deleteUser,
    updateUser
} = require('../controllers/users_controller.js');

router.get('/data', usersData);
router.post('/add', addUser);
router.delete('/delete/:name', deleteUser);
router.put('/update/:name', updateUser);
router.get('/', usersView);

module.exports = router;
