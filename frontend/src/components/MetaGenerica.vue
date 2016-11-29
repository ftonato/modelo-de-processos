<template>
  <div class="meta-generica">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Meta Genérica</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editMetaGenerica.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novoMetaGenerica.sigla">

                  <ul class="errors" v-show="!validarMetaGenerica.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novoMetaGenerica.nome">

                  <ul class="errors" v-show="!validarMetaGenerica.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novoMetaGenerica.descricao">

                  <ul class="errors" v-show="!validarMetaGenerica.descricao">
                    <li class="label label-danger">Descrição não pode ser vazio.</li>
                  </ul>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="modelo" class="control-label">Modelo</label>
                </div>
                <div class="col-sm-10">
                  <select class="form-control" name="modelo" id="modelo" v-model="novoMetaGenerica.modelo">
                    <option v-for="option in listModelos" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nivel_capacidade" class="control-label">Nível de Capacidade</label>
                </div>
                <div class="col-sm-10">
                  <select class="form-control" name="nivel_capacidade" id="nivel_capacidade" v-model="novoMetaGenerica.nivelCap">
                    <option v-for="option in listniveisCap" v-bind:value="option.value">
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
                <tr v-for="meta in metasGenericas">
                  <td scope="row">{{ meta.id }}</td>
                  <td scope="row">{{ meta.nome }}</td>
                  <td scope="row">{{ meta.sigla }}</td>
                  <td scope="row">{{ meta.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarMetaGenerica(meta)" href="#" title="Editar Meta Genérica"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerMetaGenerica(meta)" href="#" title="Deletar Meta Genérica"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Metas Genéricas',
        metasGenericas: [],
        listniveisCap: [],
        listModelos: [],
        novoMetaGenerica: {
          sigla: '',
          nome: '',
          descricao: '',
          modelo: [],
          nivelCap: []
        },
        editMetaGenerica: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarMetasGenericas();
      this.loadAllNiveisCap();
      this.loadAllModelos();
    },
    computed: {
      validarMetaGenerica() {
        return {
          sigla: !!this.novoMetaGenerica.sigla.trim(),
          nome: !!this.novoMetaGenerica.nome.trim(),
          descricao: !!this.novoMetaGenerica.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovoMetaGenerica = this.validarMetaGenerica
        return Object.keys(validarNovoMetaGenerica).every(function (key) {
          return validarNovoMetaGenerica[key]
        })
      }
    },
    methods: {

      listarMetasGenericas() {
        this.$http.get('http://localhost:3000/metasgenericas').then((req) => {

          this.metasGenericas = req.data;
        });
      },
      loadAllModelos() {
        this.$http.get('http://localhost:3000/modelo').then((req) => {

          for (let i = 0; i < req.data.length; i++) {
            this.listModelos.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },
      loadAllNiveisCap() {
        this.$http.get('http://localhost:3000/nivelcapacidade').then((req) => {

          for (let i = 0; i < req.data.length; i++) {
            this.listniveisCap.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      adicionar() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarMetaGenerica();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/metasgenericas');
            let data = {
              'sigla': this.novoMetaGenerica.sigla,
              'nome': this.novoMetaGenerica.nome,
              'descricao': this.novoMetaGenerica.descricao,
              'modelo': this.novoMetaGenerica.modelo,
              'nivelCap': this.novoMetaGenerica.nivelCap,
            };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              this.listarMetasGenericas();

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

      editarMetaGenerica(meta) {
        this.editando = true;

        this.novoMetaGenerica.sigla = meta.sigla;
        this.novoMetaGenerica.nome = meta.nome;
        this.novoMetaGenerica.descricao = meta.descricao;
        this.novoMetaGenerica.modelo = meta.modelo;
        this.novoMetaGenerica.nivelCap = meta.nivelCap;

        this.editMetaGenerica.id = meta.id;

      },

      cancelarEdicao() {
        this.novoMetaGenerica.sigla = '';
        this.novoMetaGenerica.nome = '';
        this.novoMetaGenerica.descricao = '';
        this.editMetaGenerica.id = '';
        this.editMetaGenerica.modelo = [];
        this.editMetaGenerica.nivelCap = [];

        this.editando = false;
      },

      atualizarMetaGenerica() {

        let _id = this.editMetaGenerica.id.trim();
        let data = {
          'sigla': this.novoMetaGenerica.sigla,
          'nome': this.novoMetaGenerica.nome,
          'descricao': this.novoMetaGenerica.descricao,
          'modelo': this.novoMetaGenerica.modelo,
          'nivelCap': this.novoMetaGenerica.nivelCap,
        };

        console.log('/metasgenericas/'+_id, data);

        this.$http.put('http://localhost:3000/metasgenericas/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarMetasGenericas();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerMetaGenerica(meta) {

        let resource = this.$resource('http://localhost:3000/metasgenericas{/id}');
        let _id = meta.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          this.listarMetasGenericas();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novoMetaGenerica.sigla = '';
        this.novoMetaGenerica.nome = '';
        this.novoMetaGenerica.descricao = '';
        this.novoMetaGenerica.modelo = [];
        this.novoMetaGenerica.nivelCap = [];
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
