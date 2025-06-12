class Maintenance {
  constructor(id, description, date, cost, vehicleId) {
    this.id = id;
    this.description = description; // Ex: "Troca de óleo e filtro"
    this.date = date;
    this.cost = cost;
    this.vehicleId = vehicleId;
  }
}

module.exports = Maintenance;