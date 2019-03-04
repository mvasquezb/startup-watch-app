const localStorage = require("nativescript-localstorage");
const usersService = require("~/services/user-service");
const http = require("http");

const stateKey = "dpd-test";
const API_KEY = 'AIzaSyC3FPTr_N3xBMmSlynSj__nhmOHsFV0JhI';

const FIELD_MAP = {
    'Nombre': 'name',
    'Industria': 'industry',
    'Tipo de solución': 'solution',
    'País': 'country', 
    'Fecha de contacto': 'contactDate',
    'Página web': 'website',
    'Universidad incubadora': 'incubator',
};

function handleErrors(e) {
    console.log(e.stack);
    console.log(e.message);
}

function formatJSONResults(values) {
    let fields = values.splice(0, 1)[0];
    let startups = values.map((entry) => {
        let startup = entry.reduce((acc, value, index) => {
            let fieldName = fields[index];
            acc[FIELD_MAP[fieldName]] = value;
            return acc;
        }, {});
        // Fill missing field, only trailing columns or rows are omitted
        if (!(FIELD_MAP[fields[fields.length - 1]] in startup)) {
            startup[FIELD_MAP[fields[fields.length - 1]]] = "";
        }
        return startup;
    });
    return startups;
}

function markFavourites(startups, user) {
    let favouritesByUser = JSON.parse(localStorage.getItem(`${stateKey}/${user.username}/favourites`));
    return startups.map(({ favourite, ...startup }) => {
        return { 
            favourite: startup.name in favouritesByUser,
            ...startup
        };
    });
}

exports.getStartups = () => {
    return new Promise((resolve, reject) => {
        try {
            let startups = JSON.parse(localStorage.getItem(`${stateKey}/startups`));
            resolve(startups);
        } catch(e) {
            handleErrors(e);
            reject(e);
        }
    });
}

exports.getRemoteStartups = (spreadsheetId, range) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
    
    return new Promise((resolve, reject) => {
        http.getJSON(url).then((result) => {
            let startups = formatJSONResults(result.values);
            let currentUser = usersService.currentUser();
            startups = markFavourites(startups, currentUser);
            localStorage.setItem(`${stateKey}/startups`, JSON.stringify(startups));
            resolve(startups);
        }).catch((e) => {
            handleErrors(e);
            reject(e);
        });
    });
}

exports.toggleFavourite = (startup) => {
    return new Promise((resolve, reject) => {
        try {
            let currentUser = usersService.currentUser();
            let userFavourites = JSON.parse(localStorage.getItem(`${stateKey}/${currentUser.username}/favourites`));
            if (startup.name in userFavourites) {
                delete userFavourites[startup.name];
                startup.favourite = false;
            } else {
                userFavourites[startup.name] = true;
                startup.favourite = true;
            }
            localStorage.setItem(`${stateKey}/${currentUser.username}/favourites`, JSON.stringify(userFavourites));
            let startups = JSON.parse(localStorage.getItem(`${stateKey}/startups`));
            localStorage.setItem(`${stateKey}/startups`, JSON.stringify(markFavourites(startups, currentUser)));
            resolve(startup);
        } catch (e) {
            handleErrors(e);
            reject(e);
        }
    });
}