exports.up = (knex) =>
  knex.schema.createTable('purchases', (table) => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();

    table.text('status').defaultTo('pending');
    table.text('details').notNullable();

    table.text('updatedAt').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('purchases');
