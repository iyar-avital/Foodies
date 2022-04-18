dataManagement = require("../data_management.js");

// get users 
const getUsers = () => {
    return dataManagement.getUsers();
}

// get clients
const getClients = () => {
    return dataManagement.getClients();
}

// get user by name
const getUserByUsername = (username) => {
    return dataManagement.getUserByUsername(username);
}

// add user 
const addUser = (user) => {
    return dataManagement.addUser(user);
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