<template>
  <div class="nivel-capacidade">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Nível de Capacidade</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editNivelCapacidade.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novoNivelCapacidade.sigla">

                  <ul class="errors" v-show="!validarNivelCapacidade.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novoNivelCapacidade.nome">

                  <ul class="errors" v-show="!validarNivelCapacidade.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novoNivelCapacidade.descricao">

                  <ul class="errors" v-show="!validarNivelCapacidade.descricao">
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
                <tr v-for="nivel in niveisCapacidade">
                  <td scope="row">{{ nivel.id }}</td>
                  <td scope="row">{{ nivel.nome }}</td>
                  <td scope="row">{{ nivel.sigla }}</td>
                  <td scope="row">{{ nivel.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarNivelCapacidade(nivel)" href="#" title="Editar Nível de Capacidade"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerNivelCapacidade(nivel)" href="#" title="Deletar Nível de Capacidade"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Níveis de Capacidade',
        niveisCapacidade: [],
        novoNivelCapacidade: {
          sigla: '',
          nome: '',
          descricao: ''
        },
        editNivelCapacidade: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarNiveisCapacidade();
    },
    computed: {
      validarNivelCapacidade() {
        return {
          sigla: !!this.novoNivelCapacidade.sigla.trim(),
          nome: !!this.novoNivelCapacidade.nome.trim(),
          descricao: !!this.novoNivelCapacidade.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovoNivelCapacidade = this.validarNivelCapacidade
        return Object.keys(validarNovoNivelCapacidade).every(function (key) {
          return validarNovoNivelCapacidade[key]
        })
      }
    },
    methods: {

      listarNiveisCapacidade() {
        this.$http.get('http://localhost:3000/nivelcapacidade').then((req) => {

          this.niveisCapacidade = req.data;
        });

      },

      adicionar() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarNivelCapacidade();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/nivelcapacidade');
            let data = {
              'sigla': this.novoNivelCapacidade.sigla,
              'nome': this.novoNivelCapacidade.nome,
              'descricao': this.novoNivelCapacidade.descricao,
            };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              this.listarNiveisCapacidade();

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

      editarNivelCapacidade(nivel) {
        let _id = nivel.id;
        let _sigla = nivel.sigla;
        let _nome = nivel.nome;
        let _descricao = nivel.descricao;

        this.editando = true;

        this.novoNivelCapacidade.sigla = _sigla;
        this.novoNivelCapacidade.nome = _nome;
        this.novoNivelCapacidade.descricao = _descricao;

        this.editNivelCapacidade.id = _id;

      },

      cancelarEdicao() {
        this.novoNivelCapacidade.sigla = '';
        this.novoNivelCapacidade.nome = '';
        this.novoNivelCapacidade.descricao = '';
        this.editNivelCapacidade.id = '';

        this.editando = false;
      },

      atualizarNivelCapacidade() {

        let _id = this.editNivelCapacidade.id.trim();
        let data = {
          'sigla': this.novoNivelCapacidade.sigla,
          'nome': this.novoNivelCapacidade.nome,
          'descricao': this.novoNivelCapacidade.descricao,
        };

        console.log('/nivelcapacidade/'+_id, data);

        this.$http.put('http://localhost:3000/nivelcapacidade/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarNiveisCapacidade();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerNivelCapacidade(nivel) {

        let resource = this.$resource('http://localhost:3000/nivelcapacidade{/id}');
        let _id = nivel.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          this.listarNiveisCapacidade();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novoNivelCapacidade.sigla = '';
        this.novoNivelCapacidade.nome = '';
        this.novoNivelCapacidade.descricao = '';
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
