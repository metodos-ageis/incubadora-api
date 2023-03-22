## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API util information

````bash
# create new module
nest g module {module}

# create migration
npx prisma migrate dev

# run migration
npx prisma db push

# run seed
npm run seed

# check api
http://localhost:3000/auth

# check db
npx prisma studio
http://localhost:5555


```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
````

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

------

## API da Incubadora

Segue abaixo descrições das funções e módulos do sistema disponibilizados pela API.

## Rotas

O link padrão é `localhost:3000/`. Variações para as rotas específicas seguem de acordo com a tabela abaixo.

| Rota | Descrição |
|---|---|
| `/company` | Grupos, Organizações e Empresas registrados no sistema. |
| `/user` | Usuários utilizando o sistema. |
| `/auth` | Utilizado para a autenticação no sistema. Em construção. |

## Métodos

| Método | Descrição |
|---|---|
| `Get` | Retorna informação de um ou múltiplos elementos registrados na API. |
| `Post` | Cria um novo registro. |
| `Put` | Altera ou Atualiza dados de um registro já existente. |
| `Delete` | Remove um registro da API. |

## Parâmetros

Estes são os parâmetros utilizados pela API para manuseio dos dados.

- Company

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | string | Código identificador da companhia no sistema. |
| `title` | string | |
| `description` | string | |
| `sector` | string | |
| `goal` | string | Resumo do objetivo do projeto. |
| `cnpj` | number | Cadastro Nacional da Pessoa Jurídica. |
| `project_time` | number | |
| `challenges` | string | |
| `team_size` | number | Número de integrantes na equipe do projeto. |
| `project_started` | string | |
| `website` | string | Página da web referente ao projeto. |
| `ip` | boolean | |
| `resources` | string | |
| `resources_needed` | string | |
| `mvp` | boolean | Informa se trata de um MVP ou um produto robusto. |
| `incoming_model` | string | |
| `created_at?` | Date | |
| `updated_at?` | Date | |
| `deleted_at?` | Date | |

- User

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | string | Código identificador do usuário no sistema. |
| `email` | string | Endereço de e-mail do usuário cadastrado no sistema. |
| `role` | string | Cargo do usuário. |
| `name` | string | Nome do usuário referente ao id. |
| `cpf_cnpj` | string | CPF ou CNPJ vinculado ao usuário. |
| `phone` | string | Número de telefone para contato. |
| `is_active` | boolean | |

## Ações

| Registro | Método | Nome | Descrição |
|---|---|---||---|
| company | Get | getCompany | Busca dados de uma empresa. |
| company | Post | createCompany | Registra uma nova empresa na API. |
| company | Put | updateCompany | Atualiza dados de uma empresa já registrada. |
| company | Delete | deleteCompany | Remove uma empresa já registrada do sistema. |
| user | Get | getUser | Busca dados de um usuário. |
| user | Post | createUser | Registra um novo usuário na API. |
| user | Put | updateUser | Atualiza dados de um usuário já registrado. |
| user | Delete | deleteUser | Remove um usuário já registrado do sistema. |
