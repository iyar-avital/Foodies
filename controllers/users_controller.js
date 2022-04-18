require("../utils/manage_access.js");
const service = require("../services/users_services.js");

var DELAY_IN_USER_REQUEST = 1000;

const usersView = (req, res) => {
    var result = '';
    user = service.getUserByUsername(req.query.username);
    if (user != undefined) {
        if (is_emplyoee(user)) {
            result = 'clients';
        }
        else if (is_admin(user)) {
            result = 'users';
        }
    }
    res.render(result);
}

const usersData = (req, res) => {
    var result = [{}];
    user = service.getUserByUsername(req.query.username);
    if (user != undefined) {
        if (is_emplyoee(user)) {
            result = service.getClients();
        }
        else if (is_admin(user)) {
            result = service.getUsers();
        }
    }
    res.json(result);
}

// add new user
const addUser = (req, res) => {
    setTimeout(function () {
        body = req.body;
        user = {
            username: body.username,
            password: body.password,
            role: body.role,
        };
        let newUser = service.addUser(user);
        if (typeof newUser !== "string") {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
}


// delete user by id
const deleteUser = (req, res) => {
    setTimeout(function () {
        params = req.params;
        let user = service.getUserByUsername(params.name);
        let newUser = service.deleteUser(user.id);
        if (newUser === user.id) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
};

// update user by id
const updateUser = (req, res) => {
    setTimeout(function () {
        params = req.params;
        let user = service.getUserByUsername(params.name);
        user.role = params.role;
        let newUser = service.updateUser(user.id, user);
        if (newUser === user.id) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
};

module.exports = {
    usersView,
    usersData,
    addUser,
    deleteUser,
    updateUser
};