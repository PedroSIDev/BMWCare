const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { db } = require('./src/infrastructure/database/sqlite-database');

// Importações
const AuthService = require('./src/infrastructure/services/AuthService');
const UserRepositorySQLite = require('./src/infrastructure/repositories/UserRepositorySQLite');
const VehicleRepositorySQLite = require('./src/infrastructure/repositories/VehicleRepositorySQLite');
const MaintenanceRepositorySQLite = require('./src/infrastructure/repositories/MaintenanceRepositorySQLite');
const UserController = require('./src/presentation/controllers/UserController');
const VehicleController = require('./src/presentation/controllers/VehicleController');
const MaintenanceController = require('./src/presentation/controllers/MaintenanceController');
const setupRoutes = require('./src/infrastructure/webserver/routes');

function main() {
    const app = express();

    const corsOptions = {
        origin: 'https://bmw-care.vercel.app',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(express.json());

    // Instâncias
    const authService = new AuthService();
    const userRepository = new UserRepositorySQLite(db);
    const vehicleRepository = new VehicleRepositorySQLite(db);
    const maintenanceRepository = new MaintenanceRepositorySQLite(db); 
    const userController = new UserController(userRepository, authService);
    const vehicleController = new VehicleController(vehicleRepository, maintenanceRepository);
    const maintenanceController = new MaintenanceController(maintenanceRepository, vehicleRepository);

    setupRoutes(app, { userController, vehicleController, maintenanceController });
        
    // Porta do Backend
    const PORT = process.env.PORT || 3001; 
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

main();