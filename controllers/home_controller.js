DELAY_IN_USER_REQUEST = 1000;

const indexView = (req, res) => {
    res.render("index", { user: req.session.passport.user });
}

const aboutUsView = (req, res) => {
    res.render("about_us");
}

const contactUsView = (req, res) => {
    res.render("contact_us");
}

module.exports = {
    indexView,
    aboutUsView,
    contactUsView
};



