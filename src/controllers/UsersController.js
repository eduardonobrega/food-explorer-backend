const UsersRepository = require('../repositories/UsersRepository');
const UserCreateServices = require('../services/UserCreateServices');
class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const usersRepository = new UsersRepository();
    const userCreateServices = new UserCreateServices(usersRepository);
    
    await userCreateServices.execute({ name, email, password, isAdmin });

    return response.status(201).json();
  }
}

module.exports = UsersController;
