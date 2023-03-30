const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs');
const knex = require('../database/knex');
class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    if (!name || !email || !password) {
      throw new AppError('Informe todos os campos');
    }

    if (password.length < 6) {
      throw new AppError('Senha deve conter no mínimo 6 dÍgitos');
    }

    const emailInUse = await knex('users').where({ email }).first();

    if (emailInUse) {
      throw new AppError('Este e-mail já está sendo usado');
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin ? 1 : 0,
    });

    return response.status(201).json();
  }
}

module.exports = UsersController;
