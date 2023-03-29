const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class RequestsController {
  async create(request, response) {
    const { dish_id, quantity } = request.body;
    const user_id = request.user.id;


    const user = await knex('users').where({ id: user_id }).first();
    const dish = await knex('dishes').where({ id: dish_id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    if (!dish) {
      throw new AppError('Prato não encontrado');
    }

    const existingRequest = await knex('requests')
      .where({ dish_id, user_id })
      .first();

    if (existingRequest) {
      // refatorar (esse método só deve fazer a inserção)
      const newQuantity = Number(quantity) + existingRequest.quantity;
      const updatedRequest = { ...existingRequest, quantity: newQuantity };

      await knex('requests').update(updatedRequest).where({ user_id, dish_id });
    } else {
      await knex('requests').insert({ user_id, dish_id, quantity });
    }

    return response.status(201).json();
  }

  async index(request, response) {
    const user_id  = request.user.id;

    const userRequests = await knex('requests')
      .select([
        'requests.id',
        'requests.quantity',
        'dishes.name',
        'dishes.price',
        'dishes.photo',
      ])
      .innerJoin('dishes', 'dishes.id', 'requests.dish_id')
      .where({ user_id });

    const requestsWithSubTotal = userRequests.map((request) => {
      return { ...request, subTotal: request.price * request.quantity };
    });

    return response.json(requestsWithSubTotal);
  }
}

module.exports = RequestsController;
