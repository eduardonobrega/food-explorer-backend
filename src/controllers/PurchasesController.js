const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class PurchasesController {
  async create(request, response) {
    const { user_id } = request.body;

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
      (acc, item) => acc + `${item.quantity}x ${item.name}, `,
      ''
    );

    await knex('purchases').insert({ user_id, details: details.slice(0, -2) });
    await knex('requests').where({ user_id }).delete();

    return response.json();
  }
  async update(request, response) {}
}

module.exports = PurchasesController;
