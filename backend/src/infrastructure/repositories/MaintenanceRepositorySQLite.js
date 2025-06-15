const IMaintenanceRepository = require('../../domain/repositories/IMaintenanceRepository');
const Maintenance = require('../../domain/entities/Maintenance');

class MaintenanceRepositorySQLite extends IMaintenanceRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    add(maintenance) {
        const stmt = this.db.prepare("INSERT INTO maintenances (description, date, cost, vehicleId) VALUES (@description, @date, @cost, @vehicleId)");
        const info = stmt.run({
            description: maintenance.description,
            date: maintenance.date,
            cost: maintenance.cost,
            vehicleId: maintenance.vehicleId
        });
        return new Maintenance(info.lastInsertRowid, maintenance.description, maintenance.date, maintenance.cost, maintenance.vehicleId);
    }

    findById(id) {
        const stmt = this.db.prepare("SELECT * FROM maintenances WHERE id = ?");
        const row = stmt.get(id);
        return row ? new Maintenance(row.id, row.description, row.date, row.cost, row.vehicleId) : null;
    }

    findByVehicleId(vehicleId) {
        const stmt = this.db.prepare("SELECT * FROM maintenances WHERE vehicleId = ? ORDER BY date DESC");
        const rows = stmt.all(vehicleId);
        return rows.map(row => new Maintenance(row.id, row.description, row.date, row.cost, row.vehicleId));
    }

    findAll() {
        const sql = `
            SELECT
                m.id,
                m.description,
                m.date,
                m.cost,
                m.vehicleId,
                v.model as vehicleModel,
                v.plate as vehiclePlate
            FROM
                maintenances m
            LEFT JOIN
                vehicles v ON m.vehicleId = v.id
            ORDER BY m.date DESC
        `;
        const stmt = this.db.prepare(sql);
        const rows = stmt.all();
        return rows;
    }

    update(maintenance) {
        const stmt = this.db.prepare("UPDATE maintenances SET description = @description, date = @date, cost = @cost WHERE id = @id");
        const info = stmt.run({
            description: maintenance.description,
            date: maintenance.date,
            cost: maintenance.cost,
            id: maintenance.id
        });
        if (info.changes === 0) throw new Error("Manutenção não encontrada para atualizar.");
        return maintenance;
    }

    delete(id) {
        const stmt = this.db.prepare("DELETE FROM maintenances WHERE id = ?");
        const info = stmt.run(id);
        if (info.changes === 0) throw new Error("Manutenção não encontrada para deletar.");
        return true;
    }
}

module.exports = MaintenanceRepositorySQLite;