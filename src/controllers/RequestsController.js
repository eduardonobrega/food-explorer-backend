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

    let id;  
    if (existingRequest) {
      const updatedRequest = { ...existingRequest, quantity };
     await knex('requests').update(updatedRequest).where({ user_id, dish_id });
     id = existingRequest.id
    } else {
      const idArr = await knex('requests').insert({ user_id, dish_id, quantity });
      id = idArr[0]
    }
    const newRequest = {id, dish_id, user_id,quantity, dish_name: dish.name, price: dish.price, subTotal: dish.price * quantity, photo: dish.photo }

    return response.status(201).json(newRequest);
  }

  async index(request, response) {
    const user_id = request.user.id;

    const userRequests = await knex('requests')
      .select([
        'requests.id',
        'requests.quantity',
        'dishes.id as dish_id',
        'dishes.name as dish_name',
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

  async delete(request, response) {
    const { id } = request.params;

    await knex('requests').where({ id }).delete();

    return response.json();
  }
}

module.exports = RequestsController;
