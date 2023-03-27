const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class FavoritesController {
  async create(request, response) {
    const { user_id, dish_id } = request.body;

    const user = await knex('users').where({ id: user_id }).first();
    const dish = await knex('dishes').where({ id: dish_id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    if (!dish) {
      throw new AppError('Prato não encontrado');
    }

    await knex
      .raw(
        `
        INSERT OR IGNORE INTO favorites (user_id, dish_id)
        VALUES (?, ?)
      `,
        [user_id, dish_id]
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });

    return response.json();
  }

 
}

module.exports = FavoritesController;
