const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');

function rowToUser(row) {
    if (!row || Object.keys(row).length === 0) return null;
    return new User(row.id, row.name, row.email, row.password, row.role);
}

class UserRepositorySQLite extends IUserRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    async add(user) {
        const stmt = this.db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
        stmt.run(user.name, user.email, user.password, user.role);
        stmt.free();
        const res = this.db.exec("SELECT last_insert_rowid() as id;");
        user.id = res[0].values[0][0];
        return user;
    }

    async findByEmail(email) {
        const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
        stmt.bind([email]);
        const row = stmt.step() ? stmt.getAsObject() : null;
        stmt.free();
        return rowToUser(row);
    }

    async findById(id) {
        const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
        stmt.bind([id]);
        const row = stmt.step() ? stmt.getAsObject() : null;
        stmt.free();
        return rowToUser(row);
    }

    async findAll() {
        const stmt = this.db.prepare("SELECT id, name, email, role FROM users");
        const users = [];
        while (stmt.step()) {
            users.push(rowToUser(stmt.getAsObject()));
        }
        stmt.free();
        return users;
    }
}

module.exports = UserRepositorySQLite;