<template>
  <div class="nivel-maturidade">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Nível de Maturidade</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editNivelMaturidade.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novoNivelMaturidade.sigla">

                  <ul class="errors" v-show="!validarNivelMaturidade.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novoNivelMaturidade.nome">

                  <ul class="errors" v-show="!validarNivelMaturidade.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novoNivelMaturidade.descricao">

                  <ul class="errors" v-show="!validarNivelMaturidade.descricao">
                    <li class="label label-danger">Descrição não pode ser vazio.</li>
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
                  <th>Sigla</th>
                  <th>Descrição</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="nivel in niveisMaturidade">
                  <td scope="row">{{ nivel.id }}</td>
                  <td scope="row">{{ nivel.nome }}</td>
                  <td scope="row">{{ nivel.sigla }}</td>
                  <td scope="row">{{ nivel.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarNivelMaturidade(nivel)" href="#" title="Editar Nível de Maturidade"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerNivelMaturidade(nivel)" href="#" title="Deletar Nível de Maturidade"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Níveis de Maturidade',
        niveisMaturidade: [],
        novoNivelMaturidade: {
          sigla: '',
          nome: '',
          descricao: ''
        },
        editNivelMaturidade: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarNiveisMaturidade();
    },
    computed: {
      validarNivelMaturidade() {
        return {
          sigla: !!this.novoNivelMaturidade.sigla.trim(),
          nome: !!this.novoNivelMaturidade.nome.trim(),
          descricao: !!this.novoNivelMaturidade.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovoNivelMaturidade = this.validarNivelMaturidade
        return Object.keys(validarNovoNivelMaturidade).every(function (key) {
          return validarNovoNivelMaturidade[key]
        })
      }
    },
    methods: {

      listarNiveisMaturidade() {
        this.$http.get('http://localhost:3000/nivelmaturidade').then((req) => {

          this.niveisMaturidade = req.data;
        });

      },

      adicionar() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarNivelMaturidade();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/nivelmaturidade');
            let data = {
              'sigla': this.novoNivelMaturidade.sigla,
              'nome': this.novoNivelMaturidade.nome,
              'descricao': this.novoNivelMaturidade.descricao,
            };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              this.listarNiveisMaturidade();

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

      editarNivelMaturidade(nivel) {
        let _id = nivel.id;
        let _sigla = nivel.sigla;
        let _nome = nivel.nome;
        let _descricao = nivel.descricao;

        this.editando = true;

        this.novoNivelMaturidade.sigla = _sigla;
        this.novoNivelMaturidade.nome = _nome;
        this.novoNivelMaturidade.descricao = _descricao;

        this.editNivelMaturidade.id = _id;

      },

      cancelarEdicao() {
        this.novoNivelMaturidade.sigla = '';
        this.novoNivelMaturidade.nome = '';
        this.novoNivelMaturidade.descricao = '';
        this.editNivelMaturidade.id = '';

        this.editando = false;
      },

      atualizarNivelMaturidade() {

        let _id = this.editNivelMaturidade.id.trim();
        let data = {
          'sigla': this.novoNivelMaturidade.sigla,
          'nome': this.novoNivelMaturidade.nome,
          'descricao': this.novoNivelMaturidade.descricao,
        };

        console.log('/nivelmaturidade/'+_id, data);

        this.$http.put('http://localhost:3000/nivelmaturidade/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarNiveisMaturidade();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerNivelMaturidade(nivel) {

        let resource = this.$resource('http://localhost:3000/nivelmaturidade{/id}');
        let _id = nivel.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          this.listarNiveisMaturidade();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novoNivelMaturidade.sigla = '';
        this.novoNivelMaturidade.nome = '';
        this.novoNivelMaturidade.descricao = '';
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
