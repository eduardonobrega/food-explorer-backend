const { Router } = require('express');

const usersRouter = require('./users.routes');
const dishesRouter = require('./dishes.routes');
const favoritesRouter = require('./favorites.routes');
const requestsRouter = require('./requests.routes');
const purchasesRouter = require('./purchases.routes');
const sessionsRouter = require('./sessions.routes');

const router = Router();
router.use('/users', usersRouter);
router.use('/dishes', dishesRouter);
router.use('/favorites', favoritesRouter);
router.use('/requests', requestsRouter);
router.use('/purchases', purchasesRouter);
router.use('/sessions', sessionsRouter);

router.get('/', (request, response) =>
  response.send(`<h1>Welcome API FoodExplorer</h1>`)
);

module.exports = router;
