const sqliteConnection = require('../../sqlite') // Importando a conexão do SQLITE
const createUsers = require('./createUsers'); // Importando a const createUsers aqui de dentro do migrations mesmo


async function migrationsRun(){ // Função que cria o db automático
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun;