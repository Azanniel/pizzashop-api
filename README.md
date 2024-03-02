# Pizza Shop - API

Uma API para um painel de gerenciamento de pedidos estilo IFood onde o administrador do restaurante pode controlar seus pedidos e acompanhar sua progressão.

## 🔧 Executando o projeto

Esse projeto foi criado utilizando `bun init` em bun v1.0.25. [Bun](https://bun.sh) é um JavaScript runtime all-in-one focado em velocidade e performance.

```bash
# Instale as dependências
bun install

# Execute o projeto
bun run dev
```

## 📃 Anotações

Algumas anotações feitas durante o estudo e que podem ajudar no entendimento do projeto e na jornada.

### Sobre a tecnologia

Utilizaremos o Bun como tecnologia no back-end, que é uma alternativa ao Node e ao Deno. O Bun é construído em cima do motor do Safari, o JSCore, e possui melhor performance e menos configurações necessárias. Além disso, o código escrito com o Bun é compatível com as APIs do Node. O projeto e as rotas HTTP serão criadas utilizando o framework ElysiaJS.

### Drizzle ORM

O [Drizzle](https://orm.drizzle.team/) é agnóstico de runtime, o que significa que pode ser executado em qualquer ambiente que execute JavaScript. Ele não cria uma ponte entre a aplicação e o banco de dados, o que pode ser vantajoso em casos de uso mais complexos. O Drizzle segue uma API mais próxima de um Query Builder, permitindo que escrevamos queries de forma semelhante ao SQL.

### Estratégia de autenticação

Em vez de usar a autenticação convencional por e-mail e senha, é implementado uma estratégia chamada "password-less". Essa estratégia permite que os usuários façam login sem a necessidade de uma senha. Utiliza-se a estratégia do "Magic Link", onde o usuário insere seu e-mail e recebe um link de autenticação por e-mail. Ao clicar no link, o usuário é redirecionado para a aplicação já autenticado. Essa abordagem é mais segura, pois não precisa-se armazenar senhas sensíveis no banco de dados. 
