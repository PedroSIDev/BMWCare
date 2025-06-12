const IMaintenanceRepository = require('../../domain/repositories/IMaintenanceRepository');
const Maintenance = require('../../domain/entities/Maintenance');

function rowToMaintenance(row) {
    if (!row || Object.keys(row).length === 0) return null;
    return new Maintenance(row.id, row.description, row.date, row.cost, row.vehicleId);
}

class MaintenanceRepositorySQLite extends IMaintenanceRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    async add(maintenance) {
        const stmt = this.db.prepare("INSERT INTO maintenances (description, date, cost, vehicleId) VALUES (?, ?, ?, ?)");
        stmt.run(maintenance.description, maintenance.date, maintenance.cost, maintenance.vehicleId);
        stmt.free();
        const res = this.db.exec("SELECT last_insert_rowid() as id;");
        const lastId = res[0].values[0][0];
        return new Maintenance(lastId, maintenance.description, maintenance.date, maintenance.cost, maintenance.vehicleId);
    }

    async findById(id) {
        const stmt = this.db.prepare("SELECT * FROM maintenances WHERE id = ?");
        stmt.bind([id]);
        const row = stmt.step() ? stmt.getAsObject() : null;
        stmt.free();
        return rowToMaintenance(row);
    }

    async findByVehicleId(vehicleId) {
        const stmt = this.db.prepare("SELECT * FROM maintenances WHERE vehicleId = ? ORDER BY date DESC");
        stmt.bind([vehicleId]);
        const maintenances = [];
        while (stmt.step()) {
            maintenances.push(rowToMaintenance(stmt.getAsObject()));
        }
        stmt.free();
        return maintenances;
    }

    async update(maintenance) {
        const stmt = this.db.prepare("UPDATE maintenances SET description = ?, date = ?, cost = ? WHERE id = ?");
        stmt.run(maintenance.description, maintenance.date, maintenance.cost, maintenance.id);
        stmt.free();
        return maintenance;
    }

    async delete(id) {
        const stmt = this.db.prepare("DELETE FROM maintenances WHERE id = ?");
        stmt.run(id);
        stmt.free();
        return true;
    }
}

module.exports = MaintenanceRepositorySQLite;