const { initializeDatabase, saveDatabase } = require('./src/infrastructure/database/sqlite-database');
const bcrypt = require('bcryptjs');

async function run() {
    const db = await initializeDatabase();
    console.log("Criando tabelas...");

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            model TEXT NOT NULL,
            year INTEGER NOT NULL,
            plate TEXT NOT NULL UNIQUE,
            ownerId INTEGER,
            FOREIGN KEY (ownerId) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS maintenances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            date TEXT NOT NULL,
            cost REAL NOT NULL,
            vehicleId INTEGER,
            FOREIGN KEY (vehicleId) REFERENCES vehicles (id)
        );
    `);

    console.log("Tabelas criadas. Inserindo dados iniciais...");

    // Hashear senhas
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    try {
        db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", ["Admin User", "admin@bmw.com", adminPassword, "admin"]);
        db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", ["Common User", "user@bmw.com", userPassword, "user"]);
        console.log("Usuários criados.");
    } catch (error) {
        console.log("Usuários provavelmente já existem.", error.message);
    }
    
    // Inserir um veículo e uma manutenção para o usuário comum
    // ...

    saveDatabase();
    console.log("Script finalizado.");
}

run();