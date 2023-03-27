const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
const knex = require('../database/knex');
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError('Informe todos os campos');
    }

    const emailInUse = await knex('users').where({ email }).first();

    if (emailInUse) {
      throw new AppError('Este e-mail já está sendo usado');
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({ name, email, password: hashedPassword });

    return response.status(201).json();
  }
}

module.exports = UsersController;
