const Maintenance = require('../../../domain/entities/Maintenance');

class CreateMaintenance {
  constructor(maintenanceRepository, vehicleRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ description, date, cost, vehicleId, user }) {
    // Primeiro, busca o veículo para saber quem é o dono
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    
    if (!vehicle) {
      throw new Error('Veículo não encontrado.');
    }

    // REGRA DE NEGÓCIO: Apenas o dono do veículo ou um admin pode adicionar manutenções.
    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado: você não pode adicionar manutenções a este veículo.');
    }

    const newMaintenance = new Maintenance(null, description, date, cost, vehicleId);
    return this.maintenanceRepository.add(newMaintenance);
  }
}

module.exports = CreateMaintenance;