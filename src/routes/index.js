const { Router } = require('express');

const usersRouter = require('./users.routes');
const dishesRouter = require('./dishes.routes');

const router = Router();
router.use('/users', usersRouter);
router.use('/dishes', dishesRouter);

router.get('/', (request, response) =>
  response.send(`<h1>Welcome API FoodExplorer</h1>`)
);

module.exports = router;
