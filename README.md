# X-Project Backend

Este repositório contém o backend do projeto X-Project, desenvolvido com [Nest.js](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/), e autenticação com **JWT** (JSON Web Token).

## Visão Geral

O **X-Project** é um sistema de gerenciamento de arquivos, que permite aos usuários fazerem login, upload, download e gerenciarem seus documentos em nuvem. Este backend oferece endpoints para operações CRUD, autenticação segura e controle de acesso.

## Tecnologias Utilizadas

- **Nest.js**: Framework para construção de APIs escaláveis e robustas.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **dotenv**: Configuração de variáveis de ambiente.
- **JWT (JSON Web Token)**: Autenticação e gerenciamento de sessão do usuário.

## Estrutura de Pastas

```plaintext
x-project-backend/
├── src/
│   ├── modules/       # Módulos principais da aplicação
│   ├── controllers/   # Definições dos endpoints
│   ├── services/      # Lógica de negócios e interações com o DB
│   ├── config/        # Configurações (e.g., Firebase, dotenv)
│   ├── entities/      # Modelos de dados e entidades do banco de dados
│   └── ...
├── .env.example       # Exemplo de variáveis de ambiente
├── nest-cli.json      # Configuração do CLI do NestJS
├── package.json       # Dependências e scripts do projeto
└── README.md
```

## Endpoints

### **User**

- **POST /user/cadastrar** - Registro de novo usuário.
- **POST /user/login** - Login do usuário e retorno do token JWT.
- **GET /user/me** - Retorna o usuario (necessário enviar JWT como Bearer Token).
- **DELETE /user/logout** - Deleta o token do usuário tornando necessario o login novamente (necessário enviar JWT como Bearer Token).

- **Post /user/update-password** - Atualiza a senha do usuario (necessário enviar JWT como Bearer Token).


### **Token**

- **PUT /token/refresh** - atualiza o token do usuario.


### **Pérola**

- **GET /perolas/listar** - Retorna a lista de pérolas.


## Contribuições 

Se você quiser contribuir com o projeto, siga estas etapas:

	1.	Faça um fork do repositório.
	2.	Crie uma branch para sua feature (git checkout -b minha-feature).
	3.	Faça commit das suas alterações (git commit -m 'Adicionei uma nova feature').
	4.	Envie para o repositório original (git push origin minha-feature).
	5.	Abra uma Pull Request para revisão.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Consulte o arquivo LICENSE para obter mais informações.