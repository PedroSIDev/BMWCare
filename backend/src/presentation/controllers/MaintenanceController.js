const CreateMaintenance = require('../../application/use-cases/maintenance/CreateMaintenance');
const ListMaintenancesForVehicle = require('../../application/use-cases/maintenance/ListMaintenancesForVehicle');
const UpdateMaintenance = require('../../application/use-cases/maintenance/UpdateMaintenance');
const DeleteMaintenance = require('../../application/use-cases/maintenance/DeleteMaintenance');
const ListAllMaintenances = require('../../application/use-cases/maintenance/ListAllMaintenances');

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
      if (error.message.includes('encontrado')) return res.status(404).json({ message: error.message });
      res.status(400).json({ message: error.message });
    }
  }

  async listForVehicle(req, res) {
    try {
      const { vehicleId } = req.params;
      const listMaintenances = new ListMaintenancesForVehicle(this.maintenanceRepository, this.vehicleRepository);
      const maintenances = await listMaintenances.execute({ vehicleId, user: req.user });
      res.status(200).json(maintenances);
    } catch (error) {
      if (error.message.includes('Acesso negado')) return res.status(403).json({ message: error.message });
      if (error.message.includes('encontrado')) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updateMaintenance = new UpdateMaintenance(this.maintenanceRepository, this.vehicleRepository);
      const updatedMaintenance = await updateMaintenance.execute({ maintenanceId: id, updates, user: req.user });
      res.status(200).json(updatedMaintenance);
    } catch (error) {
      if (error.message.includes('Acesso negado')) return res.status(403).json({ message: error.message });
      if (error.message.includes('encontrada')) return res.status(404).json({ message: error.message });
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleteMaintenance = new DeleteMaintenance(this.maintenanceRepository, this.vehicleRepository);
      const result = await deleteMaintenance.execute({ maintenanceId: id, user: req.user });
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('Acesso negado')) return res.status(403).json({ message: error.message });
      if (error.message.includes('encontrada')) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async listAll(req, res) {
    try {
      // O caso de uso já verifica se o usuário é admin
      const listAllMaintenances = new ListAllMaintenances(this.maintenanceRepository);
      const maintenances = await listAllMaintenances.execute({ user: req.user });
      res.status(200).json(maintenances);
    } catch (error) {
        if (error.message.includes('Acesso negado')) return res.status(403).json({ message: error.message });
        res.status(500).json({ message: "Erro ao buscar todas as manutenções." });
    }
  }
}

module.exports = MaintenanceController;