const localStorage = require("nativescript-localstorage");
const stateKey = "dpd-test";

function handleErrors(error) {
    console.error(error.message);
}

exports.logout = function () {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem(`${stateKey}/user`, undefined);
            resolve();
        } catch (e) {
            handleErrors(e);
            reject();
        }
    });
}

exports.register = function (user) {
    return new Promise((resolve, reject) => {
        try {
            let userData = {
                username: user.email,
                password: user.password,
            };
            localStorage.setItem(`${stateKey}/user`, JSON.stringify(userData));
            // Adding user to the end of the list, not checking doubles
            let userDb = JSON.parse(localStorage.getItem(`${stateKey}/users`)) || [];
            userDb.push(userData);
            localStorage.setItem(`${stateKey}/users`, JSON.stringify(userDb));
            resolve();
        } catch (e) {
            handleErrors(e);
            reject();
        }
    });
};


exports.login = function (user) {
    return new Promise((resolve, reject) => {
        try {
            let userData = {
                username: user.email,
                password: user.password,
            };
            let userDb = JSON.parse(localStorage.getItem(`${stateKey}/users`)) || [];
            let matchedUser = userDb.filter(({ username, password }) => {
                return username === user.email && password === user.password
            });
            if (!matchedUser.length) {
                throw new Error("Couldn't find that user");
            }
            localStorage.setItem(`${stateKey}/user`, JSON.stringify(matchedUser[0]));
            resolve();
        } catch (e) {
            handleErrors(e);
            reject();
        }
    });
};

exports.resetPassword = function (email) {
    // This does nothing for now
}
