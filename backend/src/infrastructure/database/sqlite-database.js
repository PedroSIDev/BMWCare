const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

let db = null;

async function initializeDatabase() {
  if (db) return db;

  const SQL = await initSqlJs();
  // Persiste o banco em um arquivo para não perder os dados
  const dbPath = path.join(__dirname, 'bmw_maintenance.db');
  const fileBuffer = fs.existsSync(dbPath) ? fs.readFileSync(dbPath) : null;
  
  db = new SQL.Database(fileBuffer);
  console.log("Banco de dados SQLite inicializado.");
  
  return db;
}

function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        const dbPath = path.join(__dirname, 'bmw_maintenance.db');
        fs.writeFileSync(dbPath, buffer);
        console.log("Banco de dados salvo com sucesso!");
    }
}

module.exports = { initializeDatabase, saveDatabase };