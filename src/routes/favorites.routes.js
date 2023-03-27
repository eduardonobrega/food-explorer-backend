const { Router } = require('express');

const FavoritesController = require('../controllers/FavoritesController');
const favoritesController = new FavoritesController();

const favoritesRoutes = Router();

favoritesRoutes.post('/', favoritesController.create);
favoritesRoutes.get('/:user_id', favoritesController.index);
favoritesRoutes.delete('/:id', favoritesController.delete);

module.exports = favoritesRoutes;
