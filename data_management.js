const fs = require("fs");
const data = require("./data.json");

// // get all users
// const getUsers = () => {
//     return data["users"];
// };

// get only client without password
const getClients = () => {
    var keyToDelete = "password";

    (users = data["users"]), (clients = []);
    for (let user in users) {
        if (users[user].role == "client") {
            client = users[user];
            delete client[keyToDelete];
            clients.push(client);
        }
    }
    return clients;
};

// get user by id
const getUser = (id) => {
    const users = data["users"];
    for (let user in users) {
        if (users[user].id == id) {
            return users[user];
        }
    }
    return undefined;
};

// get user by username
const getUserByUsername = (username) => {
    const users = data["users"];
    for (let user in users) {
        if (users[user].username == username) {
            return users[user];
        }
    }
    return undefined;
};

// add new user
const addUser = (user) => {
    const users = data["users"];
    const lastUserId = users[users.length - 1].id;
    user.id = lastUserId + 1;

    // check if there is another user with the same username
    const username = user.username;
    for (let user in users) {
        if (users[user].username == username) {
            return "user name already exists";
        }
    }
    data["users"].push(user);

    // write the updated data.json file
    fs.writeFile(
        "./server/data/data.json",
        JSON.stringify(data, null, 2),
        (err) => {
            if (err) {
                return "fail to save";
            }
        }
    );
    return user;
};

// delete user by id
const deleteUser = (id) => {
    const users = data["users"];
    for (let user in users) {
        if (users[user].id == id) {
            users.splice(user, 1);
            // write the updated data.json file
            fs.writeFile(
                "./server/data/data.json",
                JSON.stringify(data, null, 2),
                (err) => {
                    if (err) {
                        return "fail to save";
                    }
                }
            );
            return id;
        }
    }
    return id;
};

// update user by id
const updateUser = (id, updatedUser) => {
    const users = data["users"];
    for (let user in users) {
        if (users[user].id == id) {
            users[user] = updatedUser;
            // write the updated data.json files
            fs.writeFile(
                "./server/data/data.json",
                JSON.stringify(data, null, 2),
                (err) => {
                    if (err) {
                        return "fail to save";
                    }
                }
            );
            return id;
        }
    }
    return id;
};

// get flowers
const getFlowers = () => {
    const flowers = data["flowers"];
    return flowers;
};

module.exports = {
    getClients,
    getUser,
    getUserByUsername,
    addUser,
    deleteUser,
    updateUser,
    getFlowers,
};
