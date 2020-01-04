const Promise = require('bluebird')
const AppDAO = require('./dao')
const PeopleDB = require('./people')

function main() {
    const dao = new AppDAO('./people.sqlite3')
    const peopleDB = new PeopleDB(dao)

    peopleDB.createTable()
        .then(() => peopleDB.createPerson("TomTheCat", "Jianyan Li", "1a3d"))
        .then(() => peopleDB.getPersonByName("TomTheCat"))
        .then((record) => console.log(record))
}

main()