require('express-async-errors'); // Requisição após instalar o express-async-errors para o NODE tratar os erros mais fácilmente
const database = require('./database/sqlite'); // Requisição do "index.js" que está dentro da pasta "sqlite"
const AppError = require('./utils/AppError'); // Requisição para IMPORTAR a função "AppError" de dentro da pasta "utils"
const express = require('express'); // Requisição para IMPORTAR a biblioteca Express para dentro do meu projeto 

const routes = require('./routes'); // Requisição para IMPORTAR o "index.js" da pasta "routes". Ao importar somente o caminho da pasta, automaticamente ele já importa o arquivo index.js da pasta

const app = express(); // Estou atribuindo uma constante chamada "app" e inicializando o "express()" através dela (lembrar que requisitei o express e coloquei em uma const do mesmo nome na linha 4)
app.use(express.json()) // Estou USANDO o app (que por sua vez está usando o express) e falando pra ele que tudo que vou tratar agora tem um padrão .json()


app.use(routes); // Ao usar a minha aplicação estou passando que ele deve procurar as rotas na constante "routes" (Atribuída na linha 6) que por sua vez leva ao "index.js" da pasta routes. Resumindo, é para passar as rotas para o usuário ao inicializar pra decidir o que vai fazer

database(); // Iniciando banco de dados

app.use((error, request, response, next) => { // Ao usar a aplicação e resultar em um erro, queremos rodar essa função
    if(error instanceof AppError){ // Essa função está comparando se o erro que está acontecendo, é igual o do tipo (instanceof) da função "AppError" lá dentro da pasta Utils
        return response.status(error.statusCode).json({  // Caso sim, retornar uma resposta 
            status: 'error',
            message: error.message
        });
    }

    console.error(error); // Caso não seja do mesmo tipo (instanceof) do erro do "AppError" Mostrar o erro no console

    return response.status(500).json({  // E responderum erro de status 500 (erro do servidor) em formato de json passando essas msgs
        status: "error",
        message: "Internar server error"
    })
});

const PORT = 3333; // Colocando o número que vamos usar de porta dentro deu uma constante chamada PORT
app.listen(PORT, () => {console.log(`Express is runing on PORT ${PORT}`)}); // Ao iniciar esssa porta, passar essa mensagem no console.




//Instalações feitas por essa API: express, nodemon, sqlite3, express-async-errors