const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class Dishes {
  async create(request, response) {
    let { name, category, price, description, ingredients } = request.body;

    if (!name || !category) {
      throw new AppError('Tanto o nome quanto a categoria são obrigatórios');
    }

    ingredients = ingredients ?? [];

    const [dish_id] = await knex('dishes').insert({
      name,
      category,
      price,
      description,
    });
    
    if (ingredients.length > 0) {
      const ingredientsInsert = ingredients.map((ingredient) => ({
        name: ingredient.trim(),
        dish_id,
      }));

      await knex('ingredients').insert(ingredientsInsert);
    }

    return response.status(201).json();
  }
}

module.exports = Dishes;
