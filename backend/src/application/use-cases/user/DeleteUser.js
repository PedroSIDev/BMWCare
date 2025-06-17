class DeleteUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ userIdToDelete, currentUserId }) {
        if (userIdToDelete === currentUserId) {
            throw new Error('Um administrador não pode excluir a própria conta.');
        }

        return this.userRepository.delete(userIdToDelete);
    }
}
module.exports = DeleteUser;