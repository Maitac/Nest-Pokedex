<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  # Ejecutar en Desarrollo
  1. Clonar el repositorio

  2. Ejecutar
  ```
  yarn install
  ```
  3. Tener Nest CLI instalado
  ```
  nom i -g @nestjs/cli
  ```

  4. Levantar la base de Datos
  ```
  docker-compose up -d
  ```

  5.Clonar el archivo __.env.template__

5. Recomntruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed

```

## Stack usado
*Mongo DB
*NEST
