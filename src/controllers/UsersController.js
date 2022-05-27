const AppError = require ('../utils/AppError'); // Estamos requisitando aquela classe "AppError" e colocando aqui dentro de uma constante do mesmo nome

const sqliteConnection = require('../database/sqlite') // Importar função que conecta com banco de dados

class UsersController { // Estamos criando uma classe que irá controlar toda a nossa aplicação - CREATE, READ, UPDATE, DELETE E PUT
    async create(request, response){ // Função de criar um novo usuário por exemplo
        const { name, email, password } = request.body; // Vamos retirar as informações que queremos 

       const database = await sqliteConnection(); // Conectar com o banco de dados
       const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]); // Checagem se usuario exsite

       if (checkUserExists){
           throw new AppError("Este e-mail já está em uso.")
       }

       await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', // Caso não exista estamos rodando a constante chamada "database" que está dentro da função "sqliteConnection"
       [name, email, password]); // Estamos passando nosso nome, email e senha para as tres casas de "?" acima..ou seja lá para o banco de dados

       
        return response.status(201).json() // Caso tudo certinho, retornar esses dados em formato de json e falar que é status 201 que siguinfica "criado"
    }
}

module.exports = UsersController; // Exportando a função "UsersController" para toda a aplicação