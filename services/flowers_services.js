dataManagement = require("../data_management.js");

// get flowers 
const getFlowers = () => {
    return dataManagement.getFlowers();
}

module.exports = {
    getFlowers
}