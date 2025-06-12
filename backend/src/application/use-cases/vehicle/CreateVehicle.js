const Vehicle = require('../../../domain/entities/Vehicle');

class CreateVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }
  async execute({ model, year, plate, ownerId }) {
    const newVehicle = new Vehicle(null, model, year, plate, ownerId);
    const createdVehicle = await this.vehicleRepository.add(newVehicle);

    return createdVehicle;
  }
}
module.exports = CreateVehicle;