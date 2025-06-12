class ListMaintenancesForVehicle {
  constructor(maintenanceRepository, vehicleRepository) {
    this.maintenanceRepository = maintenanceRepository;
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

    return this.maintenanceRepository.findByVehicleId(vehicleId);
  }
}

module.exports = ListMaintenancesForVehicle;