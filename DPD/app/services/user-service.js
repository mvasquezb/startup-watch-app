const localStorage = require("nativescript-localstorage");
const stateKey = "dpd-test";
const stateUserKey = "user";

function handleErrors(error) {
    console.error(error.message);
}

exports.logout = function () {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem(`${stateKey}/${stateUserKey}`, undefined);
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
            logout();
            let user = {
                username: user.email,
                password: user.password,
            };
            localStorage.setItem(`${stateKey}/${stateUserKey}`, user);
            resolve();
        } catch (e) {
            handleErrors(e);
            reject();
        }
    });
};

// Same as register, separated to future proof app
exports.login = function (user) {
    return new Promise((resolve, reject) => {
        try {
            let user = {
                username: user.email,
                password: user.password,
            };
            localStorage.setItem(`${stateKey}/${stateUserKey}`, user);
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
