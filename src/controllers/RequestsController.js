const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class RequestsController {
  async create(request, response) {
    const { user_id, dish_id, quantity } = request.body;

    const user = await knex('users').where({ id: user_id }).first();
    const dish = await knex('dishes').where({ id: dish_id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    if (!dish) {
      throw new AppError('Prato não encontrado');
    }

    await knex('requests').insert({ user_id, dish_id, quantity });
2
    return response.json();
  }
}

module.exports = RequestsController;
