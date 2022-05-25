const express = require('express');

const app = express();
const PORT = 3333;

app.post('/users', (request, response) => {

    response.send(`Você chamou o POST`)
})

app.listen(PORT, () => {console.log(`Express is runing on PORT ${PORT}`)});