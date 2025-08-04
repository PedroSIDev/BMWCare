const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const { apiReference } = require('@scalar/express-api-reference');

const swaggerSpec = require('./config/swaggerConfig');

const { db } = require('./src/infrastructure/database/sqlite-database');
const setupRoutes = require('./src/infrastructure/webserver/routes');
const AuthService = require('./src/infrastructure/services/AuthService');
const UserRepositorySQLite = require('./src/infrastructure/repositories/UserRepositorySQLite');
const VehicleRepositorySQLite = require('./src/infrastructure/repositories/VehicleRepositorySQLite');
const MaintenanceRepositorySQLite = require('./src/infrastructure/repositories/MaintenanceRepositorySQLite');
const UserController = require('./src/presentation/controllers/UserController');
const VehicleController = require('./src/presentation/controllers/VehicleController');
const MaintenanceController = require('./src/presentation/controllers/MaintenanceController');

function main() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    app.use('/api-reference', apiReference({ spec: { content: swaggerSpec } }));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Instâncias
    const authService = new AuthService();
    const userRepository = new UserRepositorySQLite(db);
    const vehicleRepository = new VehicleRepositorySQLite(db);
    const maintenanceRepository = new MaintenanceRepositorySQLite(db);
    const userController = new UserController(userRepository, authService);
    const vehicleController = new VehicleController(vehicleRepository, maintenanceRepository);
    const maintenanceController = new MaintenanceController(maintenanceRepository, vehicleRepository);

    setupRoutes(app, { userController, vehicleController, maintenanceController });
        
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
        console.log(`Documentação Scalar disponível em http://localhost:${PORT}/api-reference`);
    });
}

main();