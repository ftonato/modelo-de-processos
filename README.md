# modelo-de-processos

Acessso a API
=============

Padrão da API
--------------
`GET /<modelo>` Busca todas os objetos do modelo
```javascript
{ id: "chave", ... }
```

`GET /<modelo>/<chave>` Busca um objecto especifico do modelo
```javascript
{ ... }
```

`POST /<modelo>` Cria um objecto do modelo e retorna a chave criada
```javascript
// request
{ ... }
// response
"<chave>"
```

`PUT /<modelo>/<chave>` Atualiza um objecto do modelo
```javascript
// request
{ ... }
```

`DELETE /<modelo>/<chave>` Deleta um objecto do modelo

Modelos
------------
#### Categoria
```javascript
{
    nome: string
}
```
#### NivelCapacidade
```javascript
{
    nome: string,
    descricao: string,
    sigla: string
}
```
#### NivelMaturidade
```javascript
{
    nome: string,
    descricao: string,
    sigla: string
}
```
#### MetasGenericas
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    nivelCap: string // chave do modelo NivelCapacidade
}
```
#### ProdutoTrabalho
```javascript
{
    nome: string
    // vai ser implementado o upload de arquivos aqui
}
```
#### PraticaEspecifica
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    produtoTrab: [ // chaves do modelo ProdutoTrabalho
        string,
        string
    ]
}
```
#### Modelo
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    areaProc: [ // chaves do modelo AreaProcesso
        string,
        string
    ]
    metasGen: [ // chaves do modelo MetasGenericas
        string,
        string
    ]
}
```
#### MetaEspecifica
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    praticasEspec: [ // chaves do modelo PraticaEspecifica
        string,
        string
    ]
}
```
#### AreaProcesso
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    categoria: string,  // chave do modelo categoria
    nivelMatu: string,  // chave do modelo NivelMaturidade
    metasEspec: [       // chaves do modelo MetaEspecifica
        string,
        string
    ]
}
```