require("../utils/manage_access.js");
const service = require("../services/navigation_services.js");

const navigationView = (req, res) => {
    res.render("navigation");
}

const navigationData = async (req, res) => {
    var result = service.getDefaultNav();
    user = req.session.passport.user;
    if (user != undefined) {
        if (is_client(user)) {
            result = service.getClientNav();
        }
        else if (is_staff(user)) {
            result = service.getAdminTeamNav();
        }
    }
    res.json(result);
}

module.exports = {
    navigationView,
    navigationData
};
