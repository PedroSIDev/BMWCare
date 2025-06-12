const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
// Não precisa mais de saveDatabase

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
        // Mapeia para a entidade User, omitindo a senha por segurança
        return rows.map(row => new User(row.id, row.name, row.email, null, row.role));
    }
}

module.exports = UserRepositorySQLite;