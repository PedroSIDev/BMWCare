const CreateVehicle = require('../../application/use-cases/vehicle/CreateVehicle');
const ListVehicles = require('../../application/use-cases/vehicle/ListVehicles');
const GetVehicleDetails = require('../../application/use-cases/vehicle/GetVehicleDetails');
const UpdateVehicle = require('../../application/use-cases/vehicle/UpdateVehicle');
const DeleteVehicle = require('../../application/use-cases/vehicle/DeleteVehicle');

class VehicleController {
  constructor(vehicleRepository, maintenanceRepository) {
    this.vehicleRepository = vehicleRepository;
    this.maintenanceRepository = maintenanceRepository;
  }

  // MÉTODO CREATE ATUALIZADO
  async create(req, res) {
    try {
      // Agora pegamos também o ownerId que pode vir do corpo da requisição
      const { model, year, plate, ownerId: ownerIdFromRequest } = req.body;

      let ownerId;

      // Lógica de permissão para definir o dono
      if (req.user.role === 'admin' && ownerIdFromRequest) {
        // Se o requisitante é admin e especificou um dono, usamos o especificado.
        ownerId = ownerIdFromRequest;
      } else {
        // Para todos os outros casos, o dono é o próprio usuário logado.
        ownerId = req.user.id;
      }

      const createVehicle = new CreateVehicle(this.vehicleRepository);
      const vehicle = await createVehicle.execute({ model, year, plate, ownerId });
      
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // ... (seus outros métodos: list, getDetails, update, delete) permanecem iguais
  
  async list(req, res) {
    try {
      const listVehicles = new ListVehicles(this.vehicleRepository);
      const vehicles = await listVehicles.execute({ user: req.user });
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDetails(req, res) {
    try {
      const { id } = req.params;
      const getVehicleDetails = new GetVehicleDetails(this.vehicleRepository, this.maintenanceRepository);
      const vehicleDetails = await getVehicleDetails.execute({ vehicleId: id, user: req.user });
      res.status(200).json(vehicleDetails);
    } catch (error) {
      if (error.message === 'Acesso negado.') return res.status(403).json({ message: error.message });
      if (error.message === 'Veículo não encontrado.') return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updateVehicle = new UpdateVehicle(this.vehicleRepository);
      const updatedVehicle = await updateVehicle.execute({ vehicleId: id, updates, user: req.user });
      res.status(200).json(updatedVehicle);
    } catch (error) {
      if (error.message === 'Acesso negado.') return res.status(403).json({ message: error.message });
      if (error.message === 'Veículo não encontrado.') return res.status(404).json({ message: error.message });
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleteVehicle = new DeleteVehicle(this.vehicleRepository);
      const result = await deleteVehicle.execute({ vehicleId: id, user: req.user });
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Acesso negado.') return res.status(403).json({ message: error.message });
      if (error.message === 'Veículo não encontrado.') return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = VehicleController;