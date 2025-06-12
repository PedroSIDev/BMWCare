const express = require('express');
const { initializeDatabase, saveDatabase } = require('./src/infrastructure/database/sqlite-database');

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
const cors = require('cors'); // Instale: npm install cors

async function main() {
    const app = express();
    app.use(cors()); // Permite requisições do seu frontend
    app.use(express.json());
    
    // 1. Inicializa o banco de dados
    const db = await initializeDatabase();

    // 2. Cria instâncias dos serviços e repositórios
    const authService = new AuthService();
    const userRepository = new UserRepositorySQLite(db);
    const vehicleRepository = new VehicleRepositorySQLite(db);
    const maintenanceRepository = new MaintenanceRepositorySQLite(db);

    // 3. Cria instâncias dos controladores, injetando as dependências
    const userController = new UserController(userRepository, authService);
    const vehicleController = new VehicleController(vehicleRepository, maintenanceRepository);
    const maintenanceController = new MaintenanceController(maintenanceRepository, vehicleRepository);
    
    // 4. Configura as rotas, passando os controladores
    setupRoutes(app, { userController, vehicleController, maintenanceController });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    
    // Salva o banco de dados ao encerrar a aplicação
    process.on('SIGINT', () => {
        saveDatabase();
        process.exit();
    });
}

main();