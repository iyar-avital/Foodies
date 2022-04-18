const service = require("../services/flowers_services.js");

const flowersView = (req, res) => {
    res.render("flowers");
}

const flowersData = (req, res) => {
    res.json(service.getFlowers());
}

module.exports = {
    flowersView,
    flowersData
};


