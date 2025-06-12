const CreateMaintenance = require('../../application/use-cases/maintenance/CreateMaintenance');

class MaintenanceController {
  constructor(maintenanceRepository, vehicleRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async create(req, res) {
    try {
      const { vehicleId } = req.params;
      const { description, date, cost } = req.body;
      const createMaintenance = new CreateMaintenance(this.maintenanceRepository, this.vehicleRepository);
      const maintenance = await createMaintenance.execute({ description, date, cost, vehicleId, user: req.user });
      res.status(201).json(maintenance);
    } catch (error) {
      if (error.message.includes('Acesso negado')) return res.status(403).json({ message: error.message });
      if (error.message.includes('não encontrado')) return res.status(404).json({ message: error.message });
      res.status(400).json({ message: error.message });
    }
  }
}
module.exports = MaintenanceController;