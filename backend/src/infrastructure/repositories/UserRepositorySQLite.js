const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');

class UserRepositorySQLite extends IUserRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    add(user) {
        const stmt = this.db.prepare("INSERT INTO users (name, email, password, role) VALUES (@name, @email, @password, @role)");
        const info = stmt.run({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        });
        user.id = info.lastInsertRowid;
        return user;
    }

    findByEmail(email) {
        const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
        const row = stmt.get(email);
        return row ? new User(row.id, row.name, row.email, row.password, row.role) : null;
    }

    findById(id) {
        const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
        const row = stmt.get(id);
        return row ? new User(row.id, row.name, row.email, row.password, row.role) : null;
    }

    findAll() {
        const stmt = this.db.prepare("SELECT id, name, email, role FROM users");
        const rows = stmt.all();
        return rows.map(row => new User(row.id, row.name, row.email, null, row.role));
    }
    update(user) {
    const fields = {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
    };
    let sql = "UPDATE users SET name = @name, email = @email, role = @role";

    if (user.password) {
        sql += ", password = @password";
        fields.password = user.password;
    }

    sql += " WHERE id = @id";

    const stmt = this.db.prepare(sql);
    const info = stmt.run(fields);

    if (info.changes === 0) {
        throw new Error("Usuário não encontrado para atualizar.");
    }
    return user;
}

delete(id) {
    const deleteUserFn = this.db.transaction(() => {
        const vehicles = this.db.prepare("SELECT id FROM vehicles WHERE ownerId = ?").all(id);
        const vehicleIds = vehicles.map(v => v.id);

        if (vehicleIds.length > 0) {
            const maintPlaceholders = vehicleIds.map(() => '?').join(',');
            this.db.prepare(`DELETE FROM maintenances WHERE vehicleId IN (${maintPlaceholders})`).run(...vehicleIds);

            const vehiclePlaceholders = vehicleIds.map(() => '?').join(',');
            this.db.prepare(`DELETE FROM vehicles WHERE id IN (${vehiclePlaceholders})`).run(...vehicleIds);
        }

        const info = this.db.prepare("DELETE FROM users WHERE id = ?").run(id);
        if (info.changes === 0) {
            throw new Error("Usuário não encontrado para deletar.");
        }
    });

    deleteUserFn();
    return true;
}
}

module.exports = UserRepositorySQLite;