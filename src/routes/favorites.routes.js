const { Router } = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const FavoritesController = require('../controllers/FavoritesController');
const favoritesController = new FavoritesController();

const favoritesRoutes = Router();

favoritesRoutes.post('/', ensureAuthenticated,favoritesController.create);
favoritesRoutes.get('/', ensureAuthenticated,favoritesController.index);
favoritesRoutes.delete('/:id', favoritesController.delete);

module.exports = favoritesRoutes;
