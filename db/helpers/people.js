/**
PeopleDB is the class for creating and updating a database for "people".
People are those who have accounts at loorent

Each record should cantain name(should be unique), realName, id(auto generated) and password(hashed)

People database should be and only be updated when an new account is registered
**/
class PeopleDB {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
          CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY,     
            name TEXT,
            realName TEXT,
            password TEXT)`
        return this.dao.run(sql)
    }

    createPerson(name, realName, password) {
        return this.dao.run(
            `INSERT INTO people (name, realName, password)
                VALUES (?, ?, ?)`, [name, realName, password])
    }

    getPersonByName(name) {
        return this.dao.get(
            `SELECT * FROM people
            WHERE name = ?`, [name])
    }

}

module.exports = PeopleDB;