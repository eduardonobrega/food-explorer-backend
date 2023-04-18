const AppError = require('../utils/AppError');

const DishesRepository = require('../repositories/DishesRepository');
const DishCreateServices = require('../services/DishCreateServices');
const DishUpdateServices = require('../services/DishUpdateServices');

class DishesController {
  async create(request, response) {
    let { name, category, price, description, ingredients } = request.body;

    const dishesRepository = new DishesRepository();
    const dishCreateServices = new DishCreateServices(dishesRepository);
    const { dish_id } = await dishCreateServices.execute({
      name,
      category,
      price,
      description,
      ingredients,
    });
    return response.status(201).json({ id: dish_id });
  }

  async update(request, response) {
    let { name, category, price, description, ingredients } = request.body;
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    const dishUpdateServices = new DishUpdateServices(dishesRepository);
    await dishUpdateServices.execute({
      id,
      name,
      category,
      price,
      description,
      ingredients,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dishesRepository = new DishesRepository();

    const dish = await dishesRepository.findById(id);

    if (!dish) {
      throw new AppError('Prato não encontrado');
    }

    const dishIngredients = await dishesRepository.getDishIngredients(id);

    return response.json({ ...dish, ingredients: dishIngredients });
  }

  async index(request, response) {
    const { search } = request.query;

    const dishesRepository = new DishesRepository();
    const dishes = await dishesRepository.findDishByNameOrIngredients(search);

    return response.json(dishes);
  }

  async delete(request, response) {
    const { id } = request.params;

    const dishesRepository = new DishesRepository();
    await dishesRepository.removeDish(id);

    return response.json();
  }
}

module.exports = DishesController;
