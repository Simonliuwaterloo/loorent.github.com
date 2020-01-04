const Promise = require('bluebird')
const AppDAO = require('./helpers/dao')
const PeopleDB = require('./helpers/people')
const PlacesDB = require('./helpers/places')

function main() {
    const dao = new AppDAO('./people.sqlite3')
    const peopleDB = new PeopleDB(dao)
    const placesDB = new PlacesDB(dao)

    peopleDB.createTable()
        .then(() => peopleDB.createPerson("TomTheCat", "Jianyan Li", "1a3d"))
        .then(() => peopleDB.getPersonByName("TomTheCat"))
        .then((record) => console.log(record))

    placesDB.createTable()
        .then(() => placesDB.createPlace("123 Abc st", "650", "cozy place", "sample.com,example.com", "12345", "abs@123.com", "TomTheCat"))

}

main()