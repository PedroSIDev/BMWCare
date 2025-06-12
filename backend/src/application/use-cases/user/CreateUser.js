const User = require('../../../domain/entities/User');

class CreateUser {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute({ name, email, password, role = 'user' }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Este e-mail já está em uso.');
    }
    const hashedPassword = await this.authService.hashPassword(password);
    const newUser = new User(null, name, email, hashedPassword, role);
    return this.userRepository.add(newUser);
  }
}
module.exports = CreateUser;