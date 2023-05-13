<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


backend peopleface

antes de correr el proyecto usar npm install, posterios a esto correr el proyecto con npm run start:dev
el backend de people face permite realizar un login, register, mostrar todos los usuarios registrados,
 crear publicaciones,subir texto he imagenes, añadir amigos, ver perfil con todas tus publicaciones y 
 foto de perfil, cambiar el rol de tu perfil ya sea admin o user,chat con otros amigos comentar publicaciones 

 en el app.module encontraras la conexion a la base de datos, en un principio queria implementar postgressql, 
 posterior a ello implemente mejor mysql usando la plataforma online de always data, esto les dara mayor facilidad 
 a la hora de probar mi proyecto, decidi usar sql ya que la capacidad de esta aplicacion con todas sus funcionalidades 
 generaria una base de datos bastante robusta, las credenciales y servidor estan listas para ser usadas

a continucacion ejemplos de como se realiza la autenticacion jwt
# Enviar al feed
 [POST] http://localhost:3000/api/feed 

{
  "body": "this is a body"
}
# Mostrar el feed
$ [GET] http://localhost:3000/api/feed 

# Actualizar feed id
$ [PUT] http://localhost:3000/api/3

{
  "body": "this is a body"
}
# eliminar feed id
$ [Delete] http://localhost:3000/api/3


[POST] http://localhost:3000/api/auth/register
{
	
	"firstName":"veeraa1270@gmail.com",
	"lastName":"jdvg12700",
	"email":"veeraa12700@gmail.com",
	"password":"jdvg12700"
}



[POST] http://localhost:3000/api/auth/login
{
	"email":"veeraa12700@gmail.com",
	"password":"jdvg12700"
}


cada carpeta ,feed ,core ,comment ,chat ,auth contiene sus respectivos 
,controllers ,services ,models y decoradores con sus demas componenetes
