const Database = require('better-sqlite3');
const path = require('path');

// Caminho para o nosso arquivo de banco de dados
const dbPath = path.join(__dirname, 'bmw_maintenance.db');

// Cria ou abre a conexão com o banco de dados.
// O arquivo é lido e escrito diretamente, não há "saveDatabase()" separado.
const db = new Database(dbPath, { verbose: console.log });

// Otimização para performance em escritas
db.pragma('journal_mode = WAL');

function initializeDatabase() {
    console.log("Conexão com better-sqlite3 estabelecida.");
    
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