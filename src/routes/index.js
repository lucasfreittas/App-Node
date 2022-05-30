const { Router } = require('express'); // Estamos requisitando o Router de dentro do express, mesma coisa feita dentro de todas as rotas 

const usersRouter = require('./users.routes'); // Estamos requisitando a página "users.routes" e jogando ela toda dentro dessa const chamada "usersRouter"
const notesRouter = require('./notes.routes');

const routes = Router(); // Estamos inicializando o Router do express (requisitado na linha 1) e colocando dentro de uma constante chamada routes que irá conter todas as rotas da nossa aplicação

routes.use("/users", usersRouter); // Ao passar a pasta routes "no server.js" e pessoa requisitar "/users" irá cair nessa linha e será mandado para a pagina "users.routes" que passamos para dentro dessa constante usersRouter na linha 3
notes.use("/notes", notesRouter);

module.exports = routes; // Estamos exportando todo o Router() para toda a aplicação