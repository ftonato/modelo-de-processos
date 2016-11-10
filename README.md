# modelo-de-processos

Acessso a API
=============

Categorias
------------
`GET /categoria` Busca todas as categorias
```javascript
// JSON recebido
{"chave":{"nome":"string"}}
```

`GET /categoria/<chave>` Busca uma categoria especifica
```javascript
// JSON recebido
{"nome":"string"}
```

`POST /categoria` Cria categoria e retorna a chave criada
```javascript
// JSON enviado
{"nome":"string"}
```

`PUT /categoria/<chave>` Atualiza uma categoria
```javascript
// JSON enviado
{"nome":"string"}
```

`DELETE /categoria/<chave>` Exclui uma categoria especifica 