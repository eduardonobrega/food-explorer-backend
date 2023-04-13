<h1 align="center">Backend FoodExplorer</h1>

<p >
API Rest completa utilizando Node.js e Expresss, de um menu digital para um restaurante fictício, conhecido como FoodExplorer. A API permite o usuário admim criar/editar/apagar pratos do menu, fazer upload de imagens e visualizar e atualizar os status dos pedidos para manter o cliente atualizado. Usuário comum pode visualizar o menu ou um prato especifico, colocar quantos pratos quiser no carrinho e escolher a quantidade, finalizar um pedido informando o método de pagamento e pode criar uma lista de pratos favoritos.
</p> 

<p align="center">
  <a href="#estrutura-do-banco-de-dados">Banco de dados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#foi-utilizado">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/eduardonobrega/food-explorer-frontend">Front-end</a>&nbsp;&nbsp;&nbsp;
</p>

## Estrutura do banco de dados:

![Screenshot_3](https://user-images.githubusercontent.com/87456011/231765135-ea6c6ac0-a52e-4b8b-aa6f-1f60dda84e79.png)

## Como rodar

```
npm i
```

```
npm run migrate
```

```
npm run dev
```

```bash
# Admin login
$ email: eduardo@email.com
$ password: 123456
```

## Endpoints

### Users

`POST`: 
```bash 
/users/
```
para criar um usurário administrador, basta fazer uma requisição em /users/, informando o nome, email, senha e isAdmin = 1; (int). 

### Authenticate (login)

`POST`: 
```bash 
/sessions/
```

### Favorites (pratos favoritos do usuário)

`POST`: 
```bash 
/favorites/
```

`GET`: 
```bash 
/favorites/
```

`DELETE`: 
```bash 
/favorites/:id
```

### Dishes

`POST`: 
```bash 
/dishes/
```

`PUT`: 
```bash 
/dishes/:id
```

`DELETE`: 
```bash 
/dishes/:id
```

`GET`: 
```bash 
/dishes/
```

`GET`: 
```bash 
/dishes/:id
```

`PATCH`: 
```bash 
/dishes/photo/:id
```

### Requests (produtos adicionados no carrinho)

`POST`: 
```bash 
/requests/
```

`GET`: 
```bash 
/requests/
```

`DELETE`: 
```bash 
/requests/:id
```

### Purchases (compras finalizadas)

`POST`: 
```bash 
/purchases/
```

`GET`: 
```bash 
/purchases/
```

`PATCH`: 
```bash 
/purchases/:id
```


## Foi utilizado:
- Node.js
- Express
- SQLite
- Knex.js
- Autenticação;
- JWT;
- Middlewares;
- Upload de imagens;
- API Restful;
- Cors;
- PM2;
- Deploy e utilização do render;
- Variáveis de ambiente;
- Testes automatizados;
- Jest;

---
## 🎨 Veja o [Fron-end](https://github.com/eduardonobrega/food-explorer-frontend) 
---



## Autor

[@eduardonobrega](https://www.linkedin.com/in/eduardo-nunes-nobrega/)
