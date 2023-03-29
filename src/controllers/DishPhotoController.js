const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');

class DishPhotoController {
  async update(request, response) {
    const dish_id = request.params.id;
    const photoFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex('dishes').where({ id: dish_id }).first();

    if (!dish) {
      throw new AppError('Prato não encontrado', 404);
    }

    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    }

    const filename = await diskStorage.saveFile(photoFilename);

    dish.photo = filename;

    await knex('dishes').update(dish).where({ id: dish.id });

    return response.json(dish);
  }
}

module.exports = DishPhotoController;
