const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'BMW Care API',
        version: '3.2.0',
        description: `
            API para o sistema de gerenciamento de manutenções BMW Care.

            ### Credenciais para Teste

            Login Administrador:
            * Email: \`admin@bmw.com\`
            * Senha: \`admin123\`

            Login Usuario Comum:
            * Email: \`user@bmw.com\`
            * Senha: \`user123\`
            `,
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3001}` }],
    tags: [
        { name: 'Auth', description: 'Autenticação' },
        { name: 'Users', description: 'Gerenciamento de Usuários' },
        { name: 'Vehicles', description: 'Gerenciamento de Veículos' },
        { name: 'Maintenances', description: 'Gerenciamento de Manutenções' }
    ],
    paths: {
        '/api/login': {
            post: {
                tags: ['Auth'],
                summary: 'Autentica um usuário e retorna um token',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginCredentials' } } }
                },
                responses: {
                    '200': {
                        description: 'Login bem-sucedido.',
                        content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' }, token: { type: 'string' } } } } }
                    },
                    '401': { description: 'Credenciais inválidas' }
                }
            }
        },
        '/api/users': {
            get: {
                tags: ['Users'],
                summary: 'Lista todos os usuários (Admin)',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'OK',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } }
                    }
                }
            },
            post: {
                tags: ['Users'],
                summary: 'Cria um novo usuário (Admin)',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { properties: { name: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' } } } } }
                },
                responses: { '201': { description: 'Criado' } }
            }
        },
        '/api/users/{id}': {
            put: {
                tags: ['Users'],
                summary: 'Atualiza um usuário (Admin)',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    content: { 'application/json': { schema: { properties: { name: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' } } } } }
                },
                responses: { '200': { description: 'OK' } }
            },
            delete: {
                tags: ['Users'],
                summary: 'Deleta um usuário (Admin)',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                responses: { '200': { description: 'OK' } }
            }
        },
        '/api/vehicles': {
            get: {
                tags: ['Vehicles'],
                summary: 'Lista veículos do usuário (ou todos para admin)',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'OK',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Vehicle' } } } }
                    }
                }
            },
            post: {
                tags: ['Vehicles'],
                summary: 'Adiciona um novo veículo',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { properties: { model: { type: 'string' }, year: { type: 'integer' }, plate: { type: 'string' }, ownerId: { type: 'integer' } } } } }
                },
                responses: { '201': { description: 'Criado' } }
            }
        },
        '/api/vehicles/{id}': {
            get: {
                tags: ['Vehicles'],
                summary: 'Obtém detalhes de um veículo',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                responses: { '200': { description: 'OK' } }
            },
            put: {
                tags: ['Vehicles'],
                summary: 'Atualiza um veículo',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    content: { 'application/json': { schema: { properties: { model: { type: 'string' }, year: { type: 'integer' }, plate: { type: 'string' } } } } }
                },
                responses: { '200': { description: 'OK' } }
            },
            delete: {
                tags: ['Vehicles'],
                summary: 'Deleta um veículo',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                responses: { '200': { description: 'OK' } }
            }
        },
        '/api/maintenances': {
            get: {
                tags: ['Maintenances'],
                summary: 'Lista todas as manutenções (Admin)',
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'OK',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Maintenance' } } } }
                    }
                }
            }
        },
        '/api/vehicles/{vehicleId}/maintenances': {
            post: {
                tags: ['Maintenances'],
                summary: 'Adiciona uma manutenção a um veículo',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'vehicleId', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { properties: { description: { type: 'string' }, date: { type: 'string', format: 'date' }, cost: { type: 'number' } } } } }
                },
                responses: { '201': { description: 'Criado' } }
            },
            get: {
                tags: ['Maintenances'],
                summary: 'Lista manutenções de um veículo específico',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'vehicleId', required: true, schema: { type: 'integer' } }],
                responses: {
                    '200': {
                        description: 'OK',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Maintenance' } } } }
                    }
                }
            }
        },
        '/api/maintenances/{id}': {
            put: {
                tags: ['Maintenances'],
                summary: 'Atualiza uma manutenção',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                requestBody: {
                    content: { 'application/json': { schema: { properties: { description: { type: 'string' }, date: { type: 'string', format: 'date' }, cost: { type: 'number' } } } } }
                },
                responses: { '200': { description: 'OK' } }
            },
            delete: {
                tags: ['Maintenances'],
                summary: 'Deleta uma manutenção',
                security: [{ bearerAuth: [] }],
                parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
                responses: { '200': { description: 'OK' } }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        },
        schemas: {
            User: {
                type: 'object',
                properties: { id: { type: 'integer' }, name: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['admin', 'user'] } }
            },
            Vehicle: {
                type: 'object',
                properties: { id: { type: 'integer' }, model: { type: 'string' }, year: { type: 'integer' }, plate: { type: 'string' }, ownerId: { type: 'integer' } }
            },
            Maintenance: {
                type: 'object',
                properties: { id: { type: 'integer' }, description: { type: 'string' }, date: { type: 'string', format: 'date' }, cost: { type: 'number', format: 'float' }, vehicleId: { type: 'integer' } }
            },
            LoginCredentials: {
                type: 'object',
                properties: { email: { type: 'string', format: 'email' }, password: { type: 'string', format: 'password' } }
            }
        }
    }
};

module.exports = swaggerSpec;