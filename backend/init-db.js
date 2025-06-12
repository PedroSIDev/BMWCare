const bcrypt = require('bcryptjs');
// Importa a conexão direta do nosso novo arquivo de configuração
const { db, initializeDatabase } = require('./src/infrastructure/database/sqlite-database');

function main() {
    try {
        // 1. Garante que as tabelas existam
        initializeDatabase();
        
        // 2. Prepara o comando de inserção de usuário
        const insertUserStmt = db.prepare(
            "INSERT INTO users (name, email, password, role) VALUES (@name, @email, @password, @role)"
        );

        // 3. Define os dados dos usuários
        const usersToInsert = [
            {
                name: 'Admin User',
                email: 'admin@bmw.com',
                password: bcrypt.hashSync('admin123', 10), // Usando hashSync para simplicidade no script
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
        
        // 4. Insere cada usuário dentro de uma transação
        const insertMany = db.transaction((users) => {
            for (const user of users) {
                try {
                    insertUserStmt.run(user);
                    console.log(`- Usuário '${user.name}' criado.`);
                } catch (error) {
                    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                        console.log(`- Usuário com email '${user.email}' já existe. Ignorando.`);
                    } else {
                        throw error; // Lança outros erros
                    }
                }
            }
        });
        
        insertMany(usersToInsert);

        console.log('\nScript de inicialização finalizado com sucesso!');

    } catch (error) {
        console.error('\nFalha ao executar o script de inicialização:', error.message);
    } finally {
        // 5. Fecha a conexão com o banco
        if (db) {
            db.close();
            console.log('Conexão com o banco de dados fechada.');
        }
    }
}

main();