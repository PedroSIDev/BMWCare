class GetVehicleDetails {
  constructor(vehicleRepository, maintenanceRepository) {
    this.vehicleRepository = vehicleRepository;
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute({ vehicleId, user }) {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new Error('Veículo não encontrado.');
    }

    // REGRA DE NEGÓCIO: Ou você é admin, ou o veículo é seu.
    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado.');
    }

    const maintenances = await this.maintenanceRepository.findByVehicleId(vehicleId);

    // Retorna o veículo com suas manutenções aninhadas
    return { ...vehicle, maintenances };
  }
}

module.exports = GetVehicleDetails;