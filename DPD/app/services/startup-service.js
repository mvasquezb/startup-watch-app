const localStorage = require("nativescript-localstorage");
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
        startup[FIELD_MAP[fields[fields.length - 1]]] = "";
        return startup;
    });
    return startups;
}

exports.getSpreadSheetData = (spreadsheetId, range) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
    
    return new Promise((resolve, reject) => {
        http.getJSON(url).then((result) => {
            let startups = formatJSONResults(result.values);
            localStorage.setItem(`${stateKey}/startups`);
            resolve(startups);
        }).catch((e) => {
            handleErrors(e);
            reject(e);
        });
    });
}

exports.markFavourite = (startup, selected = true) => {
    return new Promise((resolve, reject) => {
        try {
            let currentUser = JSON.parse(localStorage.getItem(`${stateKey}/user`));
            let favouritesByUser = JSON.parse(localStorage.getItem(`${stateKey}/${currentUser.username}/favourites`));
            if (startup.name in favouritesByUser) {
                if (!selected) {
                    delete favouritesByUser[startup.name];
                    startup.favourite = false;
                }
            } else {
                if (selected) {
                    favouritesByUser[startup.name] = true;
                    startup.favourite = true;
                }
            }
            localStorage.setItemObject(`${stateKey}/${currentUser.name}/favourites`, favouritesByUser);
            resolve(startup);
        } catch (e) {
            handleErrors(e);
            reject(e);
        }
    });
}