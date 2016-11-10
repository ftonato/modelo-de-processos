# modelo-de-processos

Acessso a API
=============

Categorias
------------
`GET /categoria` Busca todas as categorias
```javascript
{"chave":{"nome":"string"}}
```

`GET /categoria/<chave>` Busca uma categoria especifica
```javascript
{"nome":"string"}
```

`POST /categoria` Cria categoria e retorna a chave criada
```javascript
{"nome":"string"}
```

`PUT /categoria/<chave>` Atualiza uma categoria
```javascript
{"nome":"string"}
```

`DELETE /categoria/<chave>` Exclui uma categoria especifica 