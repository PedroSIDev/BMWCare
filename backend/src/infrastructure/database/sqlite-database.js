const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'bmw_maintenance.db');

const db = new Database(dbPath, { verbose: console.log });

db.pragma('journal_mode = WAL');

function initializeDatabase() {

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );
    `;
    const createVehiclesTable = `
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            model TEXT NOT NULL,
            year INTEGER NOT NULL,
            plate TEXT NOT NULL UNIQUE,
            ownerId INTEGER,
            FOREIGN KEY (ownerId) REFERENCES users (id)
        );
    `;
    const createMaintenancesTable = `
        CREATE TABLE IF NOT EXISTS maintenances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            date TEXT NOT NULL,
            cost REAL NOT NULL,
            vehicleId INTEGER,
            FOREIGN KEY (vehicleId) REFERENCES vehicles (id)
        );
    `;
    
    // Executa os comandos de criação de tabela
    db.exec(createUsersTable);
    db.exec(createVehiclesTable);
    db.exec(createMaintenancesTable);
}

module.exports = { db, initializeDatabase };