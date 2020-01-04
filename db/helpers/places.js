/**
PlacesDB is the class for creating and updating a database for "places".
Places are places people can rent

Each record should cantain id(auto generated), location(TEXT), price(INTEGER), description(TEXT), images(TEXT, url separated by comma),
tel(TEXT), mail(TEXT), owner(person in PeopleDB, TEXT) 

Places database can be updated when a person create/update a posting
**/
class PlacesDB {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
          CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY,     
            location TEXT,
            price INTEGER,
            description TEXT,
            images TEXT,
            tel TEXT,
            mail TEXT,
            owner TEXT,
            CONSTRAINT places_fk_owner FOREIGN KEY (owner)
            REFERENCES people(name) ON UPDATE CASCADE ON DELETE CASCADE)`
        return this.dao.run(sql)
    }

    createPlace(location, price, description, images, tel, mail, owner) {
        return this.dao.run(
            `INSERT INTO places (location, price, description, images, tel, mail, owner)
                VALUES (?, ?, ?, ?, ?, ?, ?)`, [location, price, description, images, tel, mail, owner])
    }

    getPlaceById(id) {
        return this.dao.get(
            `SELECT * FROM places
            WHERE id = ?`, [id])
    }

}

module.exports = PlacesDB;