dataManagement = require("../data_management.js");
const model = require('../model')("User");
const timeout = require("../timeout");

// get users 
async function getUsers() {
    try {
        return await model.REQUEST();
    } catch (err) {
        debug(`Failed: ${err}`);
    }
};


// get clients
async function getClients() {
    try {
        return await model.REQUEST({ 'role': 'client' });
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

// get user by name
async function getUserByUsername(username) {
    try {
        user = await model.REQUEST(username);
        return user == [] ? undefined : user[0];
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

// add user 
const addUser = async (user) => {
    try {
        return await model.CREATE(user);
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

// delete user
const deleteUser = (id) => {
    return dataManagement.deleteUser(id);
}

// update user
const updateUser = (id, user) => {
    return dataManagement.updateUser(id, user);
}

module.exports = {
    getUsers,
    getClients,
    getUserByUsername,
    addUser,
    deleteUser,
    updateUser
}