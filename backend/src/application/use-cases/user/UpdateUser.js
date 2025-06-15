class UpdateUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService; // Precisamos para hashear a senha, se for alterada
    }

    async execute({ userId, updates }) {
        // Regra: Somente admins podem editar usuários (já verificado na rota, mas bom ter aqui)

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        // Se uma nova senha for fornecida no corpo da requisição, hasheie-a
        if (updates.password) {
            updates.password = await this.authService.hashPassword(updates.password);
        }

        // Mescla os dados existentes com as atualizações
        Object.assign(user, updates);

        return this.userRepository.update(user);
    }
}
module.exports = UpdateUser;