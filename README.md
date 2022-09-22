# Projeto Repoprovas 

Para rodar, abra o terminal na pasta do projeto e execute npm run devStart


## Documentação da API

#### Cadastra usuário

```http
  POST /signup
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**.|
| `password`       | `string`|  **Obrigatório**. minimo 3 caracteres|
| `confirmPassword`       | `string`|  **Obrigatório**. minimo 3 caracteres|


#### login do usuário (retorna Token)

```http
  POST /signin
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**.|
| `password`       | `string`|  **Obrigatório**. minimo 3 caracteres|



#### Cria prova

```http
  POST /exam
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Bearer Token`      | `string` | **Obrigatório**. Token do usuario logado |
|`name `     |`string`| **Obrigatório**|
|`pdfUrl`|`URL`|**Obrigatório**|
|`categoryId`|`number`|**Obrigatório**`id da categoria`|
|`disciplineId`|`number`|**Obrigatório** `id da disciplina`|
|`instructureId`|`number`|**Obrigatório** `id do instrutor`|

#### Visualização de prova por disciplina

```http
  GET /exam/discipline
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token`      | `string` | **Obrigatório**. `Token do usuario logado` |

#### Visualização de prova por instrutor

```http
  GET /exam/instructure
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token`      | `string` | **Obrigatório**. `Token do usuario logado` |

