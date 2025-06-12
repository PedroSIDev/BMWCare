class DeleteVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ vehicleId, user }) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Veículo não encontrado.');
    }

    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado.');
    }

    await this.vehicleRepository.delete(vehicleId);
    return { message: 'Veículo deletado com sucesso.' };
  }
}

module.exports = DeleteVehicle;