const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class FavoritesController {
  async create(request, response) {
    const { dish_id } = request.body;
    const user_id = request.user.id;

    const user = await knex('users').where({ id: user_id }).first();
    const dish = await knex('dishes').where({ id: dish_id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    if (!dish) {
      throw new AppError('Prato não encontrado');
    }

    await knex.raw(
      `
        INSERT OR IGNORE INTO favorites (user_id, dish_id)
        VALUES (?, ?)
      `,
      [user_id, dish_id]
    );

    return response.status(201).json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const dishFavorites = await knex('favorites')
      .select(['dishes.name', 'dishes.photo', 'favorites.id'])
      .innerJoin('dishes', 'dishes.id', 'favorites.dish_id')
      .where('favorites.user_id', user_id);

    return response.json(dishFavorites);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('favorites').where({ id }).delete();

    return response.json();
  }
}

module.exports = FavoritesController;
