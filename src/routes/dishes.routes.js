const { Router } = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const DishesController = require('../controllers/DishesController');
const dishesController = new DishesController();

const dishesRoutes = Router();
dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', dishesController.create);
dishesRoutes.put('/:id', dishesController.update);
dishesRoutes.delete('/:id', dishesController.delete);
dishesRoutes.get('/:id', dishesController.show);
dishesRoutes.get('/', dishesController.index);

module.exports = dishesRoutes;
