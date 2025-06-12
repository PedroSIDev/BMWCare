const Vehicle = require('../../../domain/entities/Vehicle');

class UpdateVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ vehicleId, updates, user }) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Veículo não encontrado.');
    }

    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado.');
    }

    // Atualiza o objeto com os novos dados
    Object.assign(vehicle, updates);

    return this.vehicleRepository.update(vehicle);
  }
}

module.exports = UpdateVehicle;