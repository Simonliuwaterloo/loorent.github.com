const Promise = require('bluebird')
const AppDAO = require('./helpers/dao')
const PeopleDB = require('./helpers/people')
const PlacesDB = require('./helpers/places')

let express = require('express');
let app = express();

function dbsetup() {
    const dao = new AppDAO('./people.sqlite3')
    const peopleDB = new PeopleDB(dao)
    const placesDB = new PlacesDB(dao)

    peopleDB.createTable().then(() => console.log("successfully set up people table"))

    placesDB.createTable().then(() => console.log("successfully set up places table"))
}

dbsetup()