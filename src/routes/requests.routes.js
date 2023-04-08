const { Router } = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const RequestsController = require('../controllers/RequestsController');
const requestsController = new RequestsController();

const requestsRoutes = Router();
requestsRoutes.use(ensureAuthenticated);

requestsRoutes.post('/', requestsController.create);
requestsRoutes.get('/', requestsController.index);
requestsRoutes.delete('/:id', requestsController.delete);

module.exports = requestsRoutes;
