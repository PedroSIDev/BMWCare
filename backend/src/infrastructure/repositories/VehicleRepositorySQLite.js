const IVehicleRepository = require('../../domain/repositories/IVehicleRepository');
const Vehicle = require('../../domain/entities/Vehicle');
const { saveDatabase } = require('../database/sqlite-database');

function rowToVehicle(row) {
    if (!row || Object.keys(row).length === 0) return null;
    return new Vehicle(row.id, row.model, row.year, row.plate, row.ownerId);
}

class VehicleRepositorySQLite extends IVehicleRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    // ... métodos add, update, delete ...
    // Certifique-se de que eles estão aqui e chamando saveDatabase()

    async add(vehicle) {
        const stmt = this.db.prepare("INSERT INTO vehicles (model, year, plate, ownerId) VALUES (:model, :year, :plate, :ownerId)");
        stmt.run({
            ':model': vehicle.model,
            ':year': vehicle.year,
            ':plate': vehicle.plate,
            ':ownerId': vehicle.ownerId
        });
        stmt.free();
        saveDatabase();
        const res = this.db.exec("SELECT last_insert_rowid() as id;");
        const lastId = res[0].values[0][0];
        return new Vehicle(lastId, vehicle.model, vehicle.year, vehicle.plate, vehicle.ownerId);
    }

    async update(vehicle) {
    // Log para ver o objeto completo que o método recebe
    console.log('[REPO-UPDATE-START] Objeto recebido para atualizar:', vehicle);

    const stmt = this.db.prepare("UPDATE vehicles SET model = ?, year = ?, plate = ? WHERE id = ?");

    // Isolando as variáveis para ter certeza do que está sendo passado
    const modelVal = vehicle.model;
    const yearVal = vehicle.year;
    const plateVal = vehicle.plate;
    const idVal = vehicle.id;

    console.log('--- [DEBUG ANTES DO UPDATE RUN] ---');
    console.log(`Tentando executar: UPDATE vehicles SET model = '${modelVal}', year = ${yearVal}, plate = '${plateVal}' WHERE id = ${idVal}`);
    console.log('-----------------------------------');
    
    try {
        stmt.run(modelVal, yearVal, plateVal, idVal);
    } catch (dbError) {
        console.error('[ERRO NO UPDATE]', dbError);
    } finally {
        stmt.free();
    }
    
    console.log('[REPO-UPDATE-END] Chamando saveDatabase()');
    saveDatabase();
    
    return vehicle;
}
    async delete(id) {
        const deleteMaintStmt = this.db.prepare("DELETE FROM maintenances WHERE vehicleId = ?");
        deleteMaintStmt.run(id);
        deleteMaintStmt.free();
        const deleteVehicleStmt = this.db.prepare("DELETE FROM vehicles WHERE id = ?");
        deleteVehicleStmt.run(id);
        deleteVehicleStmt.free();
        saveDatabase();
        return true;
    }
    
    // --- MÉTODOS DE LEITURA ---

    async findById(id) {
        const stmt = this.db.prepare("SELECT * FROM vehicles WHERE id = ?");
        stmt.bind([id]);
        const row = stmt.step() ? stmt.getAsObject() : null;
        stmt.free();
        return rowToVehicle(row);
    }

    // MÉTODO QUE FALTAVA
    async findByOwnerId(ownerId) {
        const stmt = this.db.prepare("SELECT * FROM vehicles WHERE ownerId = ?");
        stmt.bind([ownerId]);
        const vehicles = [];
        while (stmt.step()) {
            vehicles.push(rowToVehicle(stmt.getAsObject()));
        }
        stmt.free();
        return vehicles;
    }

    // MÉTODO NECESSÁRIO PARA O ADMIN
    async findAll() {
        const stmt = this.db.prepare("SELECT * FROM vehicles");
        const vehicles = [];
        while (stmt.step()) {
            vehicles.push(rowToVehicle(stmt.getAsObject()));
        }
        stmt.free();
        return vehicles;
    }
}

module.exports = VehicleRepositorySQLite;