const indexView = (req, res) => {
    res.render("index");
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



