const express = require('express');

const app = express();
const PORT = 3333;
app.use(express.json())

app.post('/users', (request, response) => {

    const { name, email, password } = request.body;
    response.json({ name, email, password})
})

app.listen(PORT, () => {console.log(`Express is runing on PORT ${PORT}`)});