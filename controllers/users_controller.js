require("../utils/manage_access.js");
const service = require("../services/users_services.js");

//#region personal area
const personalAreaView = (req, res) => {
    res.render("personal_area");
};

const personalAreaData = async (req, res) => {
    res.json(req.session.passport.user);
};
//#endregion


//#region users
const usersView = async (req, res) => {
    var result = '';
    user = req.session.passport.user;
    if (is_emplyoee(user))
        result = 'clients';
    else if (is_admin(user))
        result = 'users';
    res.render(result);
}

const usersData = async (req, res) => {
    var result = [{}];
    user = req.session.passport.user;
    if (is_emplyoee(user)) {
        result = await service.getClients();
    }
    else if (is_admin(user)) {
        result = await service.getUsers();
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
        let deletedUser = await service.deleteUser(user._id);
        if (deletedUser._id.equals(user._id)) {
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
        let updatedUser = await service.updateUser(user._id, req.body);
        if (updatedUser._id.equals(user._id)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
};
//#endregion

module.exports = {
    personalAreaView,
    personalAreaData,
    usersView,
    usersData,
    addUser,
    deleteUser,
    updateUser
};