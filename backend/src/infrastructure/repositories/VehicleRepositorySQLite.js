const IVehicleRepository = require('../../domain/repositories/IVehicleRepository');
const Vehicle = require('../../domain/entities/Vehicle');

class VehicleRepositorySQLite extends IVehicleRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    add(vehicle) {
        const stmt = this.db.prepare("INSERT INTO vehicles (model, year, plate, ownerId) VALUES (@model, @year, @plate, @ownerId)");
        const info = stmt.run({
            model: vehicle.model,
            year: vehicle.year,
            plate: vehicle.plate,
            ownerId: vehicle.ownerId
        });
        return new Vehicle(info.lastInsertRowid, vehicle.model, vehicle.year, vehicle.plate, vehicle.ownerId);
    }

    update(vehicle) {
        const stmt = this.db.prepare("UPDATE vehicles SET model = @model, year = @year, plate = @plate WHERE id = @id");
        const info = stmt.run({
            model: vehicle.model,
            year: vehicle.year,
            plate: vehicle.plate,
            id: vehicle.id
        });
        // O método .run() retorna um objeto com .changes, que nos diz se a linha foi alterada.
        if (info.changes === 0) {
            throw new Error('Veículo não encontrado ou dados idênticos.');
        }
        return vehicle;
    }

    delete(id) {
        // better-sqlite3 pode executar múltiplas sentenças em uma transação para segurança
        const deleteFn = this.db.transaction(() => {
            this.db.prepare("DELETE FROM maintenances WHERE vehicleId = ?").run(id);
            const info = this.db.prepare("DELETE FROM vehicles WHERE id = ?").run(id);
            if (info.changes === 0) {
                throw new Error('Veículo não encontrado para deletar.');
            }
        });
        deleteFn();
        return true;
    }

    findById(id) {
        const stmt = this.db.prepare("SELECT * FROM vehicles WHERE id = ?");
        const row = stmt.get(id); // .get() para um único resultado
        return row ? new Vehicle(row.id, row.model, row.year, row.plate, row.ownerId) : null;
    }

    findByOwnerId(ownerId) {
        const stmt = this.db.prepare("SELECT * FROM vehicles WHERE ownerId = ?");
        const rows = stmt.all(ownerId); // .all() para múltiplos resultados
        return rows.map(row => new Vehicle(row.id, row.model, row.year, row.plate, row.ownerId));
    }

    findAll() {
        const stmt = this.db.prepare("SELECT * FROM vehicles");
        const rows = stmt.all();
        return rows.map(row => new Vehicle(row.id, row.model, row.year, row.plate, row.ownerId));
    }
}

module.exports = VehicleRepositorySQLite;