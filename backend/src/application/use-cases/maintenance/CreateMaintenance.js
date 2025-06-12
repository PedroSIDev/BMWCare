const Maintenance = require('../../../domain/entities/Maintenance');

class CreateMaintenance {
  constructor(maintenanceRepository, vehicleRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ description, date, cost, vehicleId, user }) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Veículo não encontrado.');
    }
    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado: você não é o dono deste veículo.');
    }
    const newMaintenance = new Maintenance(null, description, date, cost, vehicleId);
    return this.maintenanceRepository.add(newMaintenance);
  }
}
module.exports = CreateMaintenance;