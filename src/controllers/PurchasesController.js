const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class PurchasesController {
  async create(request, response) {
    const user_id = request.user.id;

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

    const details = requestsWithSubTotal.reduce(
      (acc, item) => acc + `${item.quantity} x ${item.name}, `,
      ''
    );

    await knex('purchases').insert({ user_id, details: details.slice(0, -2) });
    await knex('requests').where({ user_id }).delete();

    return response.status(201).json();
  }
  async update(request, response) {
    const { status } = request.body;
    const { id } = request.params;

    const updated_at = knex.fn.now();

    await knex('purchases').update({ status, updated_at }).where({ id });

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const user = await knex('users').where({ id: user_id }).first();
    const isAdmin = user.isAdmin === 1;

    let purchases;

    if (isAdmin) {
      purchases = await knex('purchases');
    } else {
      purchases = await knex('purchases').where({ user_id });
    }

    return response.json(purchases);
  }
}

module.exports = PurchasesController;
