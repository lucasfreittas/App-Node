const sqlite3 = require('sqlite3'); // Requisitando o motor do SQLITE e jogando dentro dessa const
const sqlite = require('sqlite'); // Requisitando o próprio sqlite e jogando dentro dessa const
const path = require('path'); // Requisitando esse path que resolve bugs para rodar em todos os sistemas operacionais

async function sqliteConnection(){ // função asincrona que conecta ou cria nosso banco de dados
    const database = await sqlite.open({ // Estamos colocando toda essa conexão dentro da constante database
        filename: path.resolve(__dirname, "..", "database.db"), // Código da conexao com o path resolve descrito na linha 3
        driver: sqlite3.Database // Atribuindo o motor para nosso database
    });

    return database; // retornando a constante com toda a conexão/criação do database
}

module.exports = sqliteConnection; // exportando a função que cria/conecta o database para toda a aplicação