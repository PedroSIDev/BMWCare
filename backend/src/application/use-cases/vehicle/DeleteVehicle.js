class DeleteVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ vehicleId, user }) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Veículo não encontrado.');
    }

    if (user.role !== 'admin') {
      throw new Error('Acesso negado. Apenas administradores podem atualizar veículos.');
    }

    await this.vehicleRepository.delete(vehicleId);
    return { message: 'Veículo deletado com sucesso.' };
  }
}

module.exports = DeleteVehicle;