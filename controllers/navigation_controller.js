require("../utils/manage_access.js");
const user_service = require("../services/users_services.js");
const nav_service = require("../services/navigation_services.js");

const navigationView = (req, res) => {
    res.render("navigation");
}

const navigationData = async (req, res) => {
    var result = nav_service.getDefaultNav();
    user = await user_service.getUserByUsername(req.query.username);
    if (user != undefined) {
        if (is_client(user)) {
            result = nav_service.getClientNav();
        }
        else if (is_admin(user) || is_emplyoee(user)) {
            result = nav_service.getAdminTeamNav();
        }
    }
    res.json(result);
}

module.exports = {
    navigationView,
    navigationData
};
