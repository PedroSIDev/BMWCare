const express = require('express');
const authMiddleware = require('../../presentation/middlewares/authMiddleware');

function setupRoutes(app, { userController, vehicleController, maintenanceController }) {
    const router = express.Router();

    // --- Rotas Públicas ---
    router.post('/users', userController.create.bind(userController));
    router.post('/login', userController.login.bind(userController));

    // --- A partir daqui, todas as rotas exigem autenticação ---
    router.use(authMiddleware());

    // --- Rotas de Usuário (Protegidas) ---
    router.get('/users', authMiddleware(['admin']), userController.list.bind(userController));
    router.put('/users/:id', authMiddleware(['admin']), userController.update.bind(userController));
    router.delete('/users/:id', authMiddleware(['admin']), userController.delete.bind(userController));


    // --- Rotas de Veículos (CRUD Completo) ---
    router.post('/vehicles', vehicleController.create.bind(vehicleController));
    router.get('/vehicles', vehicleController.list.bind(vehicleController));
    router.get('/vehicles/:id', vehicleController.getDetails.bind(vehicleController));
    router.put('/vehicles/:id', vehicleController.update.bind(vehicleController));
    router.delete('/vehicles/:id', vehicleController.delete.bind(vehicleController));

    // --- Rotas de Manutenção (Protegidas) ---
    router.get('/maintenances', authMiddleware(['admin']), maintenanceController.listAll.bind(maintenanceController));
    router.post('/vehicles/:vehicleId/maintenances', maintenanceController.create.bind(maintenanceController));
    router.get('/vehicles/:vehicleId/maintenances', maintenanceController.listForVehicle.bind(maintenanceController));
    router.put('/maintenances/:id', maintenanceController.update.bind(maintenanceController));
    router.delete('/maintenances/:id', maintenanceController.delete.bind(maintenanceController));

    app.use('/api', router);
}

module.exports = setupRoutes;