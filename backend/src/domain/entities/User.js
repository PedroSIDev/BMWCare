class User {
  constructor(id, name, email, password, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // O hash da senha
    this.role = role; // 'admin' ou 'user'
  }
}

module.exports = User;