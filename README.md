<div align='center'>
    <h1>RentalX</h1>
    <p>RentalX é uma API responsável pela gerenciamento de alugueis de carros. Esse projeto foi construido durante o Bootcamp Ignite da Rocketseat.</p>
</div>

# Descrição

RentalX é uma API que foi construida durante o Bootcamp _Ignite_ da Rocketseat com o objetivo de introduzir os principais conceitos de desenvolvimento de código e as tecnologias mais utilizadas no mercado atualmente no que se diz respeito do desenvolvimento backend com NodeJS.

A ideia é desenvolver uma aplicação que permita o gerenciamento de alugueis de carros, permitindo aos usuários à cadastrar veiculos novos no sistema, informações sobre clientes, permitir o aluguel do carros, receber o carro devolvido, dentro outros.

O desenvolvimento da aplicação se sustenta com base nos princípios da arquitetura limpa e do SOLID. Isso foi algo bastante abordados duantes às aulas é possivel ver sua presença na construção de casos de uso, entidades, e a aplicação do padrão de repositório.

# Tecnologias

 - NodeJS
 - Typescript
 - Express
 - ts-node-dev
 - yarn
 - TypeORM
 - Docker
 - eslint
 - prettier

# Rodando Código

Atualmente, o projeto está rodando no docker e não possui ainda associação com banco de dados. Portanto, após clonar esse repositório, deve-se criar o container usando o docker-compose antes de rodar a aplicação.

```bash
# Clonar o repositório
$ git clone https://github.com/hereisjohnny2/rentalx.git

# Criar a imagem
$ docker build -t rentalx

# Rodar aplicação em modo de desenvolvimento
$ docker-compose up
```

# Rotas


## `GET /categories`

Retorna todas as categorias armazenadas no banco de dados se um usuário válido e com  atribuições de administrador está fazendo a solicitação.

## `POST /categories`

Cria uma nova categoria, recebendo o `name` e a `description` dela no corpo da requisição, desde que não seja um `name` já existente. O formato da requisição fica da seguinte forma.

```json
{
    "name": "Nome da Categoria",
    "description": "Descrição da Categoria"
}
```

## `POST /categories/import`

Cria novas categorias com base em um aquivo _.csv_, com os atributos de `name` e `description`. O caminho do arquivo é passado no corpo da requisição e a as categorias são criadas desde que não seja um `name` já existente.
## `GET /specification`

Retorna todas as especificações armazenadas no banco de dados se um usuário válido e com  atribuições de administrador está fazendo a solicitação.

## `POST /specification`

Cria uma nova especificação, recebendo o `name` e a `description` dela no corpo da requisição, desde que não seja um `name` já existente. O formato da requisição fica da seguinte forma.

```json
{
    "name": "Nome da Especificação",
    "description": "Descrição da Especificação"
}
```
