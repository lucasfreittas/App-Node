const express = require('express');

const app = express();
const PORT = 3333;

app.get('/message/:id/:name', (request, response) => {

    const { id, user} = request.params;

    response.send(`Usuário: ${id} e ID: ${user}`);
});

app.get('/users', (request, response) => {
    const {page, limit} = request.query;
    response.send(`Página: ${page}, Limite: ${limit}`)
})

app.listen(PORT, () => {console.log(`Express is runing on PORT ${PORT}`)});