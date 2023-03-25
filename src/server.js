const express = require('express');

const app = express();

app.get('/', (request, response) => response.send(`<h1>Welcome API FoodExplorer</h1>`))

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
