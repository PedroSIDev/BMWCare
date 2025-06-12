class ListVehicles {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }
  async execute({ user }) {
    if (user.role === 'admin') {
      return this.vehicleRepository.findAll();
    }
    return this.vehicleRepository.findByOwnerId(user.id);
  }
}
module.exports = ListVehicles;