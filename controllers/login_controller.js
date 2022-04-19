const service = require("../services/users_services.js");

const login = async (req, res) => {
    var users = await service.getUsers();
    const userExists = (user) =>
        user.username == req.body.username && user.password == req.body.password;
    if (users.find(userExists)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}

module.exports = {
    login
};
