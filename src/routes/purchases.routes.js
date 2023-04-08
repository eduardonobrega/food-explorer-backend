const { Router } = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const PurchasesController = require('../controllers/PurchasesController');
const purchasesController = new PurchasesController();

const purchasesRoutes = Router();

purchasesRoutes.post('/', ensureAuthenticated, purchasesController.create);
purchasesRoutes.get('/', ensureAuthenticated, purchasesController.index);
purchasesRoutes.patch('/:id', purchasesController.update);

module.exports = purchasesRoutes;
