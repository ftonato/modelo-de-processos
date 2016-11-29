<template>
  <div class="produto-trabalho">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Produto de Trabalho</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionarProdutoTrabalho">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editProdutoTrabalho.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novoProdutoTrabalho.nome">

                  <ul class="errors" v-show="!validarProdutoTrabalho.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-8 col-sm-4 text-right">
                  <button v-show="editando" v-on:click.prevent="cancelarEdicao()" type="button" class="btn btn-default">Cancelar</button>
                  <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="produto in produtosTrabalho">
                  <td scope="row">{{ produto.id }}</td>
                  <td scope="row">{{ produto.nome }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarProdutoTrabalho(produto)" href="#" title="Editar Produto de Trabalho"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerProdutoTrabalho(produto)" href="#" title="Deletar Produto de Trabalho"><i class="fa fa-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'Lista de Produtos de Trabalhos',
        produtosTrabalho: [],
        novoProdutoTrabalho: {
          nome: '',
        },
        editProdutoTrabalho: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarProdutosTrabalho();
    },
    computed: {
      validarProdutoTrabalho() {
        return {
          nome: !!this.novoProdutoTrabalho.nome.trim(),
        }
      },
      validarFormulario() {
        let validarnovoProdutoTrabalho = this.validarProdutoTrabalho
        return Object.keys(validarnovoProdutoTrabalho).every(function (key) {
          return validarnovoProdutoTrabalho[key]
        })
      }
    },
    methods: {

      listarProdutosTrabalho() {
        this.$http.get('http://localhost:3000/produtotrabalho').then((req) => {

          this.produtosTrabalho = req.data;
        });

      },

      adicionarProdutoTrabalho() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarProdutoTrabalho();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/produtotrabalho');
            let data = { 'nome': this.novoProdutoTrabalho.nome };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              this.listarProdutosTrabalho();

              this.limparFormulario();

            }, (response) => {
              // error callback
              console.log('error: ',response);
            });

          } else {
            console.log('inválido');
          }
        }

      },

      editarProdutoTrabalho(produto) {
        let _id = produto.id;
        let _nome = produto.nome;

        this.editando = true;

        this.novoProdutoTrabalho.nome = _nome;
        this.editProdutoTrabalho.id = _id;

      },

      cancelarEdicao() {
        this.novoProdutoTrabalho.nome = '';
        this.editProdutoTrabalho.id = '';

        this.editando = false;
      },

      atualizarProdutoTrabalho() {

        let data = { 'nome': this.novoProdutoTrabalho.nome };
        let _id = this.editProdutoTrabalho.id.trim();

        console.log('/produtotrabalho/'+_id, data);

        this.$http.put('http://localhost:3000/produtotrabalho/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarProdutosTrabalho();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerProdutoTrabalho(produto) {

        let resource = this.$resource('http://localhost:3000/produtotrabalho{/id}');
        let _id = produto.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          this.listarProdutosTrabalho();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novoProdutoTrabalho.nome = '';
      }
    },

  }
</script>
<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }
  .errors {
    margin-top: 10px;
  }
  .edit {
    margin-bottom: 10px;
  }
  .input-fail {
    padding: 1px;
    border: none;
    background-color: transparent;
  }
</style>
