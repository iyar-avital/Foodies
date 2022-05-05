const service = require("../services/users_services");
require("./manage_access");

authUser = async (username, password, done) => {
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

    res.locals.message = 'You are not logged in, please login.';
    res.locals.error = {};
    res.status(500);
    res.render('error');
};

checkStaffAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        user = req.session.passport.user;
        if (is_staff(user))
            return next();
        res.locals.message = 'You have no premission.';
        res.locals.error = {};
        res.status(500);
        res.render('error');
        return;
    }
    res.locals.message = 'You are not logged in, please login.';
    res.locals.error = {};
    res.status(500);
    res.render('error');
};

module.exports = {
    authUser,
    serializeUser,
    deserializeUser,
    checkAuthenticated,
    checkStaffAuthenticated
}