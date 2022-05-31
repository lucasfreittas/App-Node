const { Router } = require('express'); // Estamos requisitando essa função Router de dentro do express, que é uma função que já vem junto com a biblioteca


const TagsController = require('../controllers/TagsController'); // Estamos requisitando a função "UsersController" de dentro da pasta "controllers" e atribuíndo a uma const do mesmo nome

const tagsRoutes = Router(); // Estamos inicializando o Router extraído na linha 1 e inicializando ele, passando ele para uma constante chamada "usersRoutes"



function myMiddleware(request, response, next){ // Fizemos uma função de Middleware (policialzinho que verifica o que tá pegando) 
    console.log("Você passou pelo Middleware!") // Aqui poderiamos passar algum IF por exemplo, para verificar se a pessoa pode ou não passar para a proxima etapa

    next(); // Passamos a próxima etapa, que é onde originalmente a pessoa queria ir 
}






const tagsController = new TagsController(); // Estamos inicializando a nossa classe "UsersController()" que foi requisitada na linha 4 e passando para uma constante do mesmo nome

tagsRoutes.get('/:user_id', tagsController.index );


module.exports = tagsRoutes; // Estamos exportando todo o Router pelo "usersRoutes"