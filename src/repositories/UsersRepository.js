const knex = require('../database/knex');

class UsersRepository {
  async create({ name, email, password, isAdmin }) {
    await knex('users').insert({
      name,
      email,
      password,
      isAdmin: isAdmin ? 1 : 0,
    });
  }

  async findByEmail(email) {
    const user = await knex('users').where({ email }).first();

    return user;
  }
}

module.exports = UsersRepository;
