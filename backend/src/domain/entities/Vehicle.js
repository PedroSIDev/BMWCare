class Vehicle {
  constructor(id, model, year, plate, ownerId) {
    this.id = id;
    this.model = model; // Ex: "BMW 320i"
    this.year = year;
    this.plate = plate; // Placa do veículo
    this.ownerId = ownerId; // ID do usuário dono
  }
}

module.exports = Vehicle;