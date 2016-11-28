Acessso a API
=============

Padrão da API
--------------
`GET /<modelo>` Busca todas os objetos do modelo
```javascript
{
  id: "chave",
  ...
  }
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
    nivelCap: string, // chave da NivelCapacidade
    modelo:string // chave do modelo
}
```
#### ProdutoTrabalho
```javascript
{
    nome: string
}
```
#### PraticaEspecifica
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    metasEspec: string // chave da MetaEspecifica
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
    sigla: string
}
```
#### MetaEspecifica
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    areaProc: string // chave da AreaProcesso
}
```
#### AreaProcesso
```javascript
{
    nome: string,
    descricao: string,
    sigla: string,
    categoria: string,  // chave da categoria
    nivelMatu: string,  // chave da NivelMaturidade
    modelo: string      // chave do modelo
}
```

Upload e Download de templates
------------
### Upload XHR
```javascript
var data = new FormData();
data.append("template", "");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "/produtoTrabalho/<chave>/template");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "148a3cac-8afb-4a26-b0dd-bced0c12a33a");

xhr.send(data);
```
### Upload jQuery
```javascript
var form = new FormData();
form.append("template", "");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/produtoTrabalho/<chave>/template",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "ffdca3b0-5133-dd34-3831-f8068b69ba6b"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

### Download
`GET /produtoTrabalho/<chave>/template`
