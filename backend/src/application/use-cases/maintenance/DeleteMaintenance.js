class DeleteMaintenance {
  constructor(maintenanceRepository, vehicleRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async execute({ maintenanceId, user }) {
    const maintenance = await this.maintenanceRepository.findById(maintenanceId);
    if (!maintenance) {
      throw new Error('Manutenção não encontrada.');
    }

    const vehicle = await this.vehicleRepository.findById(maintenance.vehicleId);
    if (!vehicle) {
      throw new Error('Veículo associado à manutenção não foi encontrado.');
    }

    if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
      throw new Error('Acesso negado.');
    }

    await this.maintenanceRepository.delete(maintenanceId);
    return { message: 'Manutenção deletada com sucesso.' };
  }
}

module.exports = DeleteMaintenance;