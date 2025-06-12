const express = require('express');
const cors = require('cors');

// Importa a conexão 'db' diretamente
const { db } = require('./src/infrastructure/database/sqlite-database');

// Importações dos Serviços e Repositórios
const AuthService = require('./src/infrastructure/services/AuthService');
const UserRepositorySQLite = require('./src/infrastructure/repositories/UserRepositorySQLite');
const VehicleRepositorySQLite = require('./src/infrastructure/repositories/VehicleRepositorySQLite');
const MaintenanceRepositorySQLite = require('./src/infrastructure/repositories/MaintenanceRepositorySQLite');

// Importações dos Controladores
const UserController = require('./src/presentation/controllers/UserController');
const VehicleController = require('./src/presentation/controllers/VehicleController');
const MaintenanceController = require('./src/presentation/controllers/MaintenanceController');

const setupRoutes = require('./src/infrastructure/webserver/routes');

// A função main não precisa mais ser async
function main() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    // Cria instâncias dos serviços e repositórios, passando a conexão 'db'
    const authService = new AuthService();
    const userRepository = new UserRepositorySQLite(db);
    const vehicleRepository = new VehicleRepositorySQLite(db);
    // Adapte o MaintenanceRepository para better-sqlite3 também, se ainda não o fez
    const maintenanceRepository = new MaintenanceRepositorySQLite(db); 

    // Cria instâncias dos controladores
    const userController = new UserController(userRepository, authService);
    const vehicleController = new VehicleController(vehicleRepository, maintenanceRepository);
    const maintenanceController = new MaintenanceController(maintenanceRepository, vehicleRepository);
    
    // Configura as rotas
    setupRoutes(app, { userController, vehicleController, maintenanceController });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

main();