class ListAllMaintenances {
  constructor(maintenanceRepository) {
    this.maintenanceRepository = maintenanceRepository;
  }

  async execute({ user }) {
    if (user.role !== 'admin') {
      throw new Error('Acesso negado.');
    }

    return this.maintenanceRepository.findAll();
  }
}

module.exports = ListAllMaintenances;