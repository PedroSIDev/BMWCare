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
      throw new Error('Veículo associado à manutenção não foi encontrado.');
    }

    if (user.role !== 'admin') {
      throw new Error('Acesso negado. Apenas administradores podem atualizar veículos.');
    }

    Object.assign(maintenance, updates);
    return this.maintenanceRepository.update(maintenance);
  }
}

module.exports = UpdateMaintenance;