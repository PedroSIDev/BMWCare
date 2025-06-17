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

    if (user.role !== 'admin') {
      throw new Error('Acesso negado. Apenas administradores podem atualizar veículos.');
    }

    Object.assign(vehicle, updates);

    return this.vehicleRepository.update(vehicle);
  }
}

module.exports = UpdateVehicle;