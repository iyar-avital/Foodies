const model = require('../model')("User");

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
async function addUser(user) {
    try {
        return await model.CREATE(user);
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

// delete user
async function deleteUser(id) {
    try {
        return await model.DELETE(id);
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

// update user
async function updateUser(id, args) {
    try {
        return await model.UPDATE(id, args);
    } catch (err) {
        debug(`Failed: ${err}`);
    }
}

module.exports = {
    getUsers,
    getClients,
    getUserByUsername,
    addUser,
    deleteUser,
    updateUser
}