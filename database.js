const Database = require("better-sqlite3");

const db = new Database("internships.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS internships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT NOT NULL,
        stipend TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("SQLite database connected successfully!");

module.exports = db;