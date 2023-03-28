const { Router } = require('express');

const PurchasesController = require('../controllers/PurchasesController');
const purchasesController = new PurchasesController();

const purchasesRoutes = Router();

purchasesRoutes.post('/', purchasesController.create);
purchasesRoutes.patch('/:id', purchasesController.update);

module.exports = purchasesRoutes;
