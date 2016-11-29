<template>
  <div class="meta-especifica">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Meta Específica</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editMetaEspecifica.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novaMetaEspecifica.sigla">

                  <ul class="errors" v-show="!validarMetaEspecifica.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novaMetaEspecifica.nome">

                  <ul class="errors" v-show="!validarMetaEspecifica.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novaMetaEspecifica.descricao">

                  <ul class="errors" v-show="!validarMetaEspecifica.descricao">
                    <li class="label label-danger">Descrição não pode ser vazio.</li>
                  </ul>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="area_processo" class="control-label">Área de Processo</label>
                </div>
                <div class="col-sm-10">
                  <select class="form-control" name="area_processo" id="area_processo" v-model="novaMetaEspecifica.areaProc">
                    <option v-for="option in listaAreasProcesso" v-bind:value="option.value">
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
                <tr v-for="meta in metasEspecificas">
                  <td scope="row">{{ meta.id }}</td>
                  <td scope="row">{{ meta.nome }}</td>
                  <td scope="row">{{ meta.sigla }}</td>
                  <td scope="row">{{ meta.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarMetaEspecifica(meta)" href="#" title="Editar Meta Específicas"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerMetaEspecifica(meta)" href="#" title="Deletar Meta Específicas"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Metas Específicas',
        metasEspecificas: [],
        listaAreasProcesso: [],
        novaMetaEspecifica: {
          sigla: '',
          nome: '',
          descricao: '',
          areaProc: []
        },
        editMetaEspecifica: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarMetasEspecificas();
      this.listarAreasProcesso();
    },
    computed: {
      validarMetaEspecifica() {
        return {
          sigla: !!this.novaMetaEspecifica.sigla.trim(),
          nome: !!this.novaMetaEspecifica.nome.trim(),
          descricao: !!this.novaMetaEspecifica.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovaMetaEspecifica = this.validarMetaEspecifica
        return Object.keys(validarNovaMetaEspecifica).every(function (key) {
          return validarNovaMetaEspecifica[key]
        })
      }
    },
    methods: {

      listarMetasEspecificas() {
        this.$http.get('http://localhost:3000/metaespecifica').then((req) => {

          this.metasEspecificas = req.data;
        });
      },

      listarAreasProcesso() {
        this.$http.get('http://localhost:3000/areaprocesso').then((req) => {

          for (let i = 0; i < req.data.length; i++) {
            this.listaAreasProcesso.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      adicionar() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarMetaEspecifica();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/metaespecifica');
            let data = {
              'sigla': this.novaMetaEspecifica.sigla,
              'nome': this.novaMetaEspecifica.nome,
              'descricao': this.novaMetaEspecifica.descricao,
              'areaProc': this.novaMetaEspecifica.areaProc,
            };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              this.listarMetasEspecificas();

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

      editarMetaEspecifica(meta) {
        let _id = meta.id;
        let _sigla = meta.sigla;
        let _nome = meta.nome;
        let _descricao = meta.descricao;
        let _areaProc = meta.areaProc;

        this.editando = true;

        this.novaMetaEspecifica.sigla = _sigla;
        this.novaMetaEspecifica.nome = _nome;
        this.novaMetaEspecifica.descricao = _descricao;
        this.novaMetaEspecifica.areaProc = _areaProc;

        this.editMetaEspecifica.id = _id;

      },

      cancelarEdicao() {
        this.novaMetaEspecifica.sigla = '';
        this.novaMetaEspecifica.nome = '';
        this.novaMetaEspecifica.descricao = '';
        this.editMetaEspecifica.id = '';
        this.editMetaEspecifica.areaProc = '';

        this.editando = false;
      },

      atualizarMetaEspecifica() {

        let _id = this.editMetaEspecifica.id.trim();
        let data = {
          'sigla': this.novaMetaEspecifica.sigla,
          'nome': this.novaMetaEspecifica.nome,
          'descricao': this.novaMetaEspecifica.descricao,
          'areaProc': this.novaMetaEspecifica.areaProc,
        };

        console.log('/metaespecifica/'+_id, data);

        this.$http.put('http://localhost:3000/metaespecifica/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarMetasEspecificas();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerMetaEspecifica(meta) {

        let resource = this.$resource('http://localhost:3000/metaespecifica{/id}');
        let _id = meta.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          this.listarMetasEspecificas();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novaMetaEspecifica.sigla = '';
        this.novaMetaEspecifica.nome = '';
        this.novaMetaEspecifica.descricao = '';
        this.novaMetaEspecifica.areaProc = '';
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
