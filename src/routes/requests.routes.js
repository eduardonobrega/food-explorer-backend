const { Router } = require('express');

const RequestsController = require('../controllers/RequestsController');
const requestsController = new RequestsController();

const requestsRoutes = Router();

requestsRoutes.post('/', requestsController.create);

module.exports = requestsRoutes;
