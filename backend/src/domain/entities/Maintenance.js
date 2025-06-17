class Maintenance {
  constructor(id, description, date, cost, vehicleId) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.cost = cost;
    this.vehicleId = vehicleId;
  }
}

module.exports = Maintenance;