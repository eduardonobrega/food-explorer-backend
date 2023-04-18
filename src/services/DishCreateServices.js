const AppError = require('../utils/AppError');
class DishCreateServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  }

  async execute({ name, category, price, description, ingredients }) {
    if (!name || !category) {
      throw new AppError('Tanto o nome quanto a categoria são obrigatórios');
    }

    ingredients = ingredients ?? [];

    const dish_id = await this.dishesRepository.createDish({
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

      await this.dishesRepository.createDishIngredients(ingredientsInsert);
    }
    return { dish_id };
  }
}

module.exports = DishCreateServices;
