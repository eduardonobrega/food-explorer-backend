exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();

    table.text('name').notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();

    table.integer('isAdmin').defaultTo(0);
  });

exports.down = (knex) => knex.schema.dropTable('users');
