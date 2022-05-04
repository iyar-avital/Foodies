const service = require("../services/users_services");
require("./manage_access");

authUser = async (username, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${username}`);
    console.log(`Value of "Password" in authUser function ----> ${password}`);

    var user = await service.getUserByUsername(username);
    if (user == undefined)
        return done(null, false);
    if (user.password == password)
        return done(null, user);
    return done(null, false);
};

serializeUser = (user, done) => {
    done(null, user);
};

deserializeUser = (user, done) => {
    done(null, user);
};

checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next()
    res.send('<h1>You are not logged in</h1>');
};

checkStaffAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        user = req.session.passport.user;
        if (is_staff(user))
            return next();
    }
    res.send('<h1>You are not logged in</h1>');
};

module.exports = {
    authUser,
    serializeUser,
    deserializeUser,
    checkAuthenticated,
    checkStaffAuthenticated
}