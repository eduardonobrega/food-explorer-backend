const { Router } = require('express');

const RequestsController = require('../controllers/RequestsController');
const requestsController = new RequestsController();

const requestsRoutes = Router();

requestsRoutes.post('/', requestsController.create);
requestsRoutes.get('/:user_id', requestsController.index);

module.exports = requestsRoutes;
