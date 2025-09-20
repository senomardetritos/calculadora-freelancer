# Projeto Next.js com MongoDB

Este é um projeto inicial desenvolvido com [Next.js](https://nextjs.org) criado utilizando o comando [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configuração do Banco de Dados

O projeto utiliza MongoDB como banco de dados, executado em uma instância Docker para facilitar o desenvolvimento e garantir a consistência do ambiente.

Altere os seguintes arquivos com seus dados de login no banco de dados:

- docker-compose.yaml
- src/lib/mongodb.ts

Rode o comando: 

```bash
docker compose up -d
```
