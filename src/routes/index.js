const { Router } = require('express');

const usersRouter = require('./users.routes');

const router = Router();
router.use('/users', usersRouter);
router.get('/', (request, response) =>
  response.send(`<h1>Welcome API FoodExplorer</h1>`)
);

module.exports = router;
