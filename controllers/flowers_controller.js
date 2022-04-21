const service = require("../services/flowers_services.js");

const flowersView = (req, res) => {
    res.render("flowers");
}

const flowersData = async (req, res) => {
    res.json(await service.getFlowers());
}

// add new user
const addFlower = async (req, res) => {
    setTimeout(async function () {
        let body = req.body;
        let file = req.file;
        flower = [body.name, file.filename, body.color, body.price];
        let newFlower = await service.addFlower(flower);
        if (typeof newFlower !== "string") {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    }, DELAY_IN_USER_REQUEST);
}

module.exports = {
    flowersView,
    flowersData,
    addFlower
};


