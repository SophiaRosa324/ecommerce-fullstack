# 🛒 E-commerce Full Stack

## 📖 Sobre o Projeto

Este projeto consiste em uma aplicação completa de comércio eletrônico desenvolvida utilizando a arquitetura Full Stack. A plataforma permite que usuários realizem cadastro, autenticação, visualização de produtos, gerenciamento de carrinho de compras e realização de pedidos.

Além das funcionalidades voltadas para os clientes, o sistema também possui recursos administrativos para gerenciamento de produtos, usuários e pedidos.

O objetivo do projeto é demonstrar a integração entre Frontend, Backend e Banco de Dados, aplicando conceitos modernos de desenvolvimento web.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* React.js
* React Router DOM
* Redux
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* JWT (JSON Web Token)
* BCryptJS

### Banco de Dados

* MongoDB
* Mongoose


## 📂 Estrutura do Projeto

```bash
ecommerce-fullstack/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── uploads/
├── package.json
└── README.md
```


## ⚙️ Funcionalidades

### Usuário

* Cadastro de conta
* Login e autenticação
* Visualização de produtos
* Pesquisa de produtos
* Adição de itens ao carrinho
* Finalização de compras
* Histórico de pedidos
* Atualização de perfil

### Administrador

* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Visualização de usuários
* Gerenciamento de pedidos


## 🔐 Autenticação

O sistema utiliza autenticação baseada em JSON Web Token (JWT).

Após o login, um token é gerado e enviado ao cliente, permitindo acesso seguro às rotas protegidas da aplicação.

As senhas dos usuários são armazenadas de forma criptografada utilizando BCrypt.


## 💾 Banco de Dados

O MongoDB é utilizado para armazenar:

* Usuários
* Produtos
* Pedidos
* Informações de pagamento

A modelagem é realizada através do Mongoose.

---

## 📥 Instalação

### Pré-requisitos

* Node.js
* MongoDB
* Git

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/ecommerce-fullstack.git
```

```bash
cd ecommerce-fullstack
```

### Instalar Dependências

Backend:

```bash
npm install
```

Frontend:

```bash
cd frontend
npm install
```


## ▶️ Executando o Projeto

### Backend

```bash
npm run server
```

ou

```bash
npm start
```

### Frontend

```bash
cd frontend
npm start
```

A aplicação estará disponível em:

```bash
http://localhost:3000
```


## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=sua_string_de_conexao

JWT_SECRET=sua_chave_secreta
```


## 📊 Arquitetura

A aplicação segue a arquitetura Cliente-Servidor.

```text
Usuário
   │
   ▼
Frontend (React)
   │
   ▼
API REST (Express)
   │
   ▼
MongoDB
```

---


## 👨‍💻 Autores
* Beatriz de Andrade Leite 
* Edgar Guimarães de Carvalho 
* Matheus Machado Sprengel 
* Sophia Rosa da Silva Machado 
* Théo Vinícius Garcia Tonche

Projeto desenvolvido para fins acadêmicos e aprendizado de desenvolvimento Full Stack utilizando React, Node.js, Express e MongoDB.
