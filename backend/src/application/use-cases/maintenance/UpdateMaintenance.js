class UpdateMaintenance {
  constructor(maintenanceRepository, vehicleRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ maintenanceId, updates, user }) {
    const maintenance = await this.maintenanceRepository.findById(maintenanceId);
    if (!maintenance) {
      throw new Error('Manutenção não encontrada.');
    }

    const vehicle = await this.vehicleRepository.findById(maintenance.vehicleId);
    if (!vehicle) {
      // Isso não deveria acontecer se os dados estiverem consistentes
      throw new Error('Veículo associado à manutenção não foi encontrado.');
    }

    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado.');
    }

    Object.assign(maintenance, updates);
    return this.maintenanceRepository.update(maintenance);
  }
}

module.exports = UpdateMaintenance;