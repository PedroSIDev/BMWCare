const bcrypt = require('bcryptjs');
const { db, initializeDatabase } = require('./src/infrastructure/database/sqlite-database');

//Script com HARDCODE para apresentação do projeto!!!

function main() {
    try {
        initializeDatabase();
        
        const insertUserStmt = db.prepare(
            "INSERT INTO users (name, email, password, role) VALUES (@name, @email, @password, @role)"
        );

        const usersToInsert = [
            {
                name: 'Admin User',
                email: 'admin@bmw.com',
                password: bcrypt.hashSync('admin123', 10),
                role: 'admin'
            },
            {
                name: 'Common User',
                email: 'user@bmw.com',
                password: bcrypt.hashSync('user123', 10),
                role: 'user'
            }
        ];

        console.log('Inserindo usuários iniciais...');
        
        const insertMany = db.transaction((users) => {
            for (const user of users) {
                try {
                    insertUserStmt.run(user);
                    console.log(`- Usuário '${user.name}' criado.`);
                } catch (error) {
                    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                        console.log(`- Usuário com email '${user.email}' já existe. Ignorando.`);
                    } else {
                        throw error;
                    }
                }
            }
        });
        
        insertMany(usersToInsert);

        console.log('\nScript de inicialização finalizado com sucesso!');

    } catch (error) {
        console.error('\nFalha ao executar o script de inicialização:', error.message);
    } finally {
        if (db) {
            db.close();
            console.log('Conexão com o banco de dados fechada.');
        }
    }
}

main();