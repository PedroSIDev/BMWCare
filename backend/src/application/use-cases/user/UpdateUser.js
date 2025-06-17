class UpdateUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService; 
    }

    async execute({ userId, updates }) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        if (updates.password) {
            updates.password = await this.authService.hashPassword(updates.password);
        }

        Object.assign(user, updates);

        return this.userRepository.update(user);
    }
}
module.exports = UpdateUser;