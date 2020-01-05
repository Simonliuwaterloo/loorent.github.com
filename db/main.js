const Promise = require('bluebird')
const AppDAO = require('./helpers/dao')
const PeopleDB = require('./helpers/people')
const PlacesDB = require('./helpers/places')

const express = require('express');
const app = express();
const port = 3000

const dao = new AppDAO('./people.sqlite3')
const peopleDB = new PeopleDB(dao)
const placesDB = new PlacesDB(dao)

/**
Routing:
/
	health check
/people
	/create
		create person
	/info
		return person info
/places
	/create
		create place
	/location
		get place by location
 **/
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/people/create/:name/:relName/:pw', async(req, res) => {
    //put password in url is stupid, use authencation server later
    const name = req.params.name
    const relName = req.params.relName
    const pw = req.params.pw
    const rec = await peopleDB.getPersonByName(name)
    if (rec == undefined) {
        await peopleDB.createPerson(name, relName, pw)
        res.sendStatus(201)
    } else {
        res.sendStatus(409)
    }
})

app.get('/people/info/:name', async(req, res) => {
    const name = req.params.name
    const rec = await peopleDB.getPersonByName(name)
    if (rec == undefined) {
        res.sendStatus(404)
    } else {
        res.send(rec)
    }

})

app.post('/places/create/:location/:price/:description/:images/:tel/:mail/:owner', async(req, res) => {
    //for now, do not check multiple postings about same property
    //but owner has to be in people db
    const params = req.params
    const rec = await peopleDB.getPersonByName(params.owner)
    if (rec == undefined) {
        console.log(`owner ${req.owner}is undefined`)
        res.sendStatus(409)
    } else {
        await placesDB.createPlace(params.location,
            params.price,
            params.description,
            params.images,
            params.tel,
            params.mail,
            params.owner)
        res.sendStatus(201)
    }

})

app.get('/places/location/:location', async(req, res) => {
    const loc = req.params.location
    const rec = await placesDB.getPlaceByLoc(loc)
    if (rec == undefined) {
        res.sendStatus(404)
    } else {
        res.send(rec)
    }

})

async function main() {
    await peopleDB.createTable()
    await placesDB.createTable()
    console.log("DB is up")
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

main();