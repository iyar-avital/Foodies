require("../utils/manage_access.js");
const service = require("../services/users_services.js");

var DELAY_IN_USER_REQUEST = 1000;

const usersView = async (req, res) => {
    var result = '';
    user = await service.getUserByUsername(req.query.username);
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

const usersData = async (req, res) => {
    var result = [{}];
    user = await service.getUserByUsername(req.query.username);
    if (user != undefined) {
        if (is_emplyoee(user)) {
            result = await service.getClients();
        }
        else if (is_admin(user)) {
            result = await service.getUsers();
        }
    }
    res.json(result);
}

// add new user
const addUser = async (req, res) => {
    setTimeout(async function () {
        body = req.body;
        user = [body.username, body.password, body.role];
        let newUser = await service.addUser(user);
        if (typeof newUser !== "string") {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
}


// delete user by id
const deleteUser = async (req, res) => {
    setTimeout(async function () {
        params = req.params;
        let user = await service.getUserByUsername(params.name);
        let newUser = service.deleteUser(user.id);
        if (newUser === user.id) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
};

// update user by id
const updateUser = async (req, res) => {
    setTimeout(async function () {
        params = req.params;
        let user = await service.getUserByUsername(params.name);
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