class AppError{ // Iniciamos uma classe para tratamento de erros do CLIENTE
    message; // Estamos atribuindo uma variavel chamada "message" para o escopo global dessa classe
    statusCode; // Estamos atribuindo uma variavel chamada "statusCode" para o escopo global dessa classe

    constructor(message, statusCode = 400){ // Nossa função pede que seja passada um valor para "message" e para "statusCode" atribuídos acima, caso o statusCode não seja passado, assumimos como valor o erro 400 "erro do cliente"
        this.message = message; // A mensagem passada para cá é o que vai entrar na variável message
        this.statusCode = statusCode; // O statusCode passado para cá é o que vai passar para a variável statusCode / Caso passe nada, assumir 400
    }
}

module.exports = AppError; // Exportando essa classe "AppError" para toda a aplicação