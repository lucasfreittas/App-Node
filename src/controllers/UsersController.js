const { hash, compare } = require('bcryptjs'); // Importando a função hash que criptografa as senhas de dentro do modulo bcryptjs

const AppError = require ('../utils/AppError'); // Estamos requisitando aquela classe "AppError" e colocando aqui dentro de uma constante do mesmo nome

const sqliteConnection = require('../database/sqlite') // Importar função que conecta com banco de dados

class UsersController { // Estamos criando uma classe que irá controlar toda a nossa aplicação - CREATE, READ, UPDATE, DELETE E PUT
    async create(request, response){ // Função de criar um novo usuário por exemplo
        const { name, email, password } = request.body; // Vamos retirar as informações que queremos 

       const database = await sqliteConnection(); // Conectar com o banco de dados
       const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]); // Checagem se usuario exsite

       if (checkUserExists){
           throw new AppError("Este e-mail já está em uso.")
       }

       const hashedPassword = await hash(password, 8); // executando a função "hash" e passando o nível de criptografia, jogando dentro dessa constante "hashed" e no lugar de exportar "passoword" exportamos a "hashed"

       await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', // Caso não exista estamos rodando a constante chamada "database" que está dentro da função "sqliteConnection"
       [name, email, hashedPassword]); // Estamos passando nosso nome, email e senha para as tres casas de "?" acima..ou seja lá para o banco de dados

       
        return response.status(201).json() // Caso tudo certinho, retornar esses dados em formato de json e falar que é status 201 que siguinfica "criado"
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        if(!user){
            throw new AppError ("Usuário não encontrado");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if( password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password){
            const checkOldPassowrd = await compare(old_password, user.password);

            if(!checkOldPassowrd){
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8);
        }



        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, id]
        );

        return response.status(200).json();

    }
}

module.exports = UsersController; // Exportando a função "UsersController" para toda a aplicação