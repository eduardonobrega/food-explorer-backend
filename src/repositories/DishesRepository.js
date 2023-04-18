const knex = require('../database/knex');

class DishesRepository {
  async createDish({ name, category, price, description }) {
    const [id] = await knex('dishes').insert({
      name,
      category,
      price,
      description,
    });

    return id;
  }

  async removeDish(id) {
    await knex('dishes').delete().where({ id });
  }

  async updateDish(dish) {
    const updated_at = knex.fn.now();

    await knex('dishes')
      .update({ ...dish, updated_at })
      .where({ id: dish.id });
  }

  async findById(id) {
    return await knex('dishes').where({ id }).first();
  }

  async findDishByNameOrIngredients(search) {
    return await knex
      .select('d.*')
      .from('dishes as d')
      .join('ingredients as i', 'd.id', 'i.dish_id')
      .whereLike('d.name', `%${search}%`)
      .orWhereLike('i.name', `%${search}%`)
      .groupBy('d.id');
  }

  async createDishIngredients(ingredients) {
    await knex('ingredients').insert(ingredients);
  }

  async getDishIngredients(dish_id) {
    return await knex('ingredients').where({ dish_id }).orderBy('name');
  }

  async removeDishIngredients({ dish_id, remove }) {
    await knex('ingredients')
      .delete()
      .where({ dish_id })
      .whereIn('name', remove);
  }

  async removeAllDishIngredients(dish_id) {
    await knex('ingredients').delete().where({ dish_id });
  }
}

module.exports = DishesRepository;
