const AppError = require ('../utils/AppError'); // Estamos requisitando aquela classe "AppError" e colocando aqui dentro de uma constante do mesmo nome

class UsersController { // Estamos criando uma classe que irá controlar toda a nossa aplicação - CREATE, READ, UPDATE, DELETE E PUT
    create(request, response){ // Função de criar um novo usuário por exemplo
        const { name, email, password } = request.body; // Vamos retirar as informações que queremos 

        if(!name){ // Caso a pessoa não passe o nome por exemplo, disparar o "AppError" que etá na pasta Utils, atribuído aqui na linha 1
            throw new AppError("Nome é obrigatório");
        }

        response.status(201).json({ name, email, password}) // Caso tudo certinho, retornar esses dados em formato de json e falar que é status 201 que siguinfica "criado"
    }
}

module.exports = UsersController; // Exportando a função "UsersController" para toda a aplicação