dataManagement = require("../data_management.js");
const model = require('../model')("Flower");

// get flowers 
async function getFlowers() {
    try {
        return await model.REQUEST();
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

// add flower 
async function addFlower(flower) {
    try {
        return await model.CREATE(flower);
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

module.exports = {
    getFlowers,
    addFlower
}