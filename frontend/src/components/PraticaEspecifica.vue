<template>
  <div class="praticas-especifica">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Práticas Específicas</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editPraticaEspecifica.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novaPraticaEspecifica.sigla">

                  <ul class="errors" v-show="!validarPraticaEspecifica.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novaPraticaEspecifica.nome">

                  <ul class="errors" v-show="!validarPraticaEspecifica.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novaPraticaEspecifica.descricao">

                  <ul class="errors" v-show="!validarPraticaEspecifica.descricao">
                    <li class="label label-danger">Descrição não pode ser vazio.</li>
                  </ul>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-2">
                  <label for="metas_especificas" class="control-label">Metas Específica</label>
                </div>
                <div class="col-sm-10">

                  <select class="form-control" name="metas_especificas" id="metas_especificas" v-model="novaPraticaEspecifica.metasEspec">
                    <option v-for="option in listaMetasEspeficica" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>

                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-2">
                  <label for="produtos_trabalho" class="control-label">Produtos Trabalho</label>
                </div>
                <div class="col-sm-10">

                  <select class="form-control" name="produtos_trabalho" id="produtos_trabalho" v-model="novaPraticaEspecifica.produtosTrab" multiple>
                    <option v-for="option in listaProdutosTrabalho" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>

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
                  <th>Sigla</th>
                  <th>Descrição</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pratica in praticasEspecificas">
                  <td scope="row">{{ pratica.id }}</td>
                  <td scope="row">{{ pratica.nome }}</td>
                  <td scope="row">{{ pratica.sigla }}</td>
                  <td scope="row">{{ pratica.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarPraticaEspecifica(pratica)" href="#" title="Editar Pratica Específica"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerPraticaEspecifica(pratica)" href="#" title="Deletar Pratica Específica"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Práticas Específicas',
        praticasEspecificas: [],
        listaMetasEspeficica: [],
        listaProdutosTrabalho: [],
        novaPraticaEspecifica: {
          sigla: '',
          nome: '',
          descricao: '',
          metasEspec: '',
          produtosTrab: [],
        },
        editPraticaEspecifica: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarPraticasEspecificas();
      this.listarMetasEspecificas();
      this.listarProdutosTrabalho();
    },
    computed: {
      validarPraticaEspecifica() {
        return {
          sigla: !!this.novaPraticaEspecifica.sigla.trim(),
          nome: !!this.novaPraticaEspecifica.nome.trim(),
          descricao: !!this.novaPraticaEspecifica.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovaPraticaEspecifica = this.validarPraticaEspecifica
        return Object.keys(validarNovaPraticaEspecifica).every(function (key) {
          return validarNovaPraticaEspecifica[key]
        })
      }
    },
    methods: {

      listarPraticasEspecificas() {
        this.$http.get('http://localhost:3000/praticaespecifica').then((req) => {

          // adiciona os itens das praticas especificas p/ a lista de praticas especificas
          this.praticasEspecificas = req.data;
        });

      },

      listarMetasEspecificas() {
        this.$http.get('http://localhost:3000/metaespecifica').then((req) => {

          // adiciona os itens das metas especificas p/ a lista de metas especificas
          for (let i = 0; i < req.data.length; i++) {
            this.listaMetasEspeficica.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      listarProdutosTrabalho() {
        this.$http.get('http://localhost:3000/produtotrabalho').then((req) => {

          // adiciona os itens dos produtos de trabalhos p/ a lista de produtos de trabalho
          for (let i = 0; i < req.data.length; i++) {
            this.listaProdutosTrabalho.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      adicionar() {

        // Está editando?
        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarPraticaEspecifica();

          } else {
            console.log('inválido');
          }

        } else { // Está inserindo

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/praticaespecifica');
            let data = {
              'sigla': this.novaPraticaEspecifica.sigla,
              'nome': this.novaPraticaEspecifica.nome,
              'descricao': this.novaPraticaEspecifica.descricao,
              'metasEspec': this.novaPraticaEspecifica.metasEspec,
              'produtosTrab': this.novaPraticaEspecifica.produtosTrab,
            };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              // chama o método para atualizar a lista de praticas especificas
              this.listarPraticasEspecificas();

              // limpa o formulário
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

      editarPraticaEspecifica(pratica) {
        let _id = pratica.id;
        let _sigla = pratica.sigla;
        let _nome = pratica.nome;
        let _descricao = pratica.descricao;
        let _metasEspec = pratica.metasEspec;

        let _produtosTrab = pratica.produtoTrab;

        for(let val in _produtosTrab) {
          this.novaPraticaEspecifica.produtosTrab.push(val);
        }

        this.editando = true;

        this.novaPraticaEspecifica.sigla = _sigla;
        this.novaPraticaEspecifica.nome = _nome;
        this.novaPraticaEspecifica.descricao = _descricao;
        this.novaPraticaEspecifica.metasEspec = pratica.metasEspec;

        this.editPraticaEspecifica.id = _id;

      },

      cancelarEdicao() {
        this.novaPraticaEspecifica.sigla = '';
        this.novaPraticaEspecifica.nome = '';
        this.novaPraticaEspecifica.descricao = '';
        this.novaPraticaEspecifica.metasEspec = '';
        this.novaPraticaEspecifica.produtosTrab = [];
        this.editPraticaEspecifica.id = '';

        this.editando = false;
      },

      atualizarPraticaEspecifica() {

        let _id = this.editPraticaEspecifica.id.trim();
        let data = {
          'sigla': this.novaPraticaEspecifica.sigla,
          'nome': this.novaPraticaEspecifica.nome,
          'descricao': this.novaPraticaEspecifica.descricao,
          'metasEspec': this.novaPraticaEspecifica.metasEspec,
          'produtosTrab': this.novaPraticaEspecifica.produtosTrab,
        };

        console.log('/praticaespecifica/'+_id, data);

        this.$http.put('http://localhost:3000/praticaespecifica/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            // chama o método para atualizar a lista de praticas especificas
            this.listarPraticasEspecificas();

            // limpa o formulário
            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerPraticaEspecifica(pratica) {

        let resource = this.$resource('http://localhost:3000/praticaespecifica{/id}');
        let _id = pratica.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          // chama o método para atualizar a lista de praticas especificas
          this.listarPraticasEspecificas();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novaPraticaEspecifica.sigla = '';
        this.novaPraticaEspecifica.nome = '';
        this.novaPraticaEspecifica.descricao = '';
        this.novaPraticaEspecifica.metasEspec = '';
        this.novaPraticaEspecifica.produtosTrab = [];
      }
    }
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
