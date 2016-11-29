<template>
  <div class="area-processo">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Área de Processo</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editAreaProcesso.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novoAreaProcesso.sigla">

                  <ul class="errors" v-show="!validarAreaProcesso.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novoAreaProcesso.nome">

                  <ul class="errors" v-show="!validarAreaProcesso.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novoAreaProcesso.descricao">

                  <ul class="errors" v-show="!validarAreaProcesso.descricao">
                    <li class="label label-danger">Descrição não pode ser vazio.</li>
                  </ul>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="modelo" class="control-label">Modelo</label>
                </div>
                <div class="col-sm-10">
                  <select class="form-control" name="modelo" id="modelo" v-model="novoAreaProcesso.modelo">
                    <option v-for="option in listModelos" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nivel_maturidade" class="control-label">Nível de Maturidade</label>
                </div>
                <div class="col-sm-10">
                  <select class="form-control" name="nivel_maturidade" id="nivel_maturidade" v-model="novoAreaProcesso.nivelMatu">
                    <option v-for="option in listNivelMat" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="categoria" class="control-label">Categoria</label>
                </div>
                <div class="col-sm-10">
                  <select class="form-control" name="categoria" id="categoria" v-model="novoAreaProcesso.categoria">
                    <option v-for="option in listCategorias" v-bind:value="option.value">
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
                <tr v-for="meta in areasProcessos">
                  <td scope="row">{{ meta.id }}</td>
                  <td scope="row">{{ meta.nome }}</td>
                  <td scope="row">{{ meta.sigla }}</td>
                  <td scope="row">{{ meta.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarAreaProcesso(meta)" href="#" title="Editar Área de Processo"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerAreaProcesso(meta)" href="#" title="Deletar Área de Processo"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Áreas de Processo',
        areasProcessos: [],
        listModelos: [],
        listCategorias: [],
        listNivelMat: [],
        novoAreaProcesso: {
          sigla: '',
          nome: '',
          descricao: '',
          nivelMatu: [],
          modelo: [],
          categoria: []
        },
        editAreaProcesso: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarMetasGenericas();
      this.loadAllModelos();
      this.loadAllCategorias();
      this.loadAllNiveisMatu();
    },
    computed: {
      validarAreaProcesso() {
        return {
          sigla: !!this.novoAreaProcesso.sigla.trim(),
          nome: !!this.novoAreaProcesso.nome.trim(),
          descricao: !!this.novoAreaProcesso.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovoAreaProcesso = this.validarAreaProcesso
        return Object.keys(validarNovoAreaProcesso).every(function (key) {
          return validarNovoAreaProcesso[key]
        })
      }
    },
    methods: {

      listarMetasGenericas() {
        this.$http.get('http://localhost:3000/areaprocesso').then((req) => {

          this.areasProcessos = req.data;
        });
      },

      loadAllModelos() {
        this.$http.get('http://localhost:3000/modelo').then((req) => {

          for (let i = 0; i < req.data.length; i++) {
            this.listModelos.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },
      loadAllCategorias() {
        this.$http.get('http://localhost:3000/categoria').then((req) => {

          for (let i = 0; i < req.data.length; i++) {
            this.listCategorias.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },
      loadAllNiveisMatu() {
        this.$http.get('http://localhost:3000/nivelmaturidade').then((req) => {

          for (let i = 0; i < req.data.length; i++) {
            this.listNivelMat.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      adicionar() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarAreaProcesso();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/areaprocesso');
            let data = {
              'sigla': this.novoAreaProcesso.sigla,
              'nome': this.novoAreaProcesso.nome,
              'descricao': this.novoAreaProcesso.descricao,
              'modelo': this.novoAreaProcesso.modelo,
              'nivelMatu': this.novoAreaProcesso.nivelMatu,
              'categoria': this.novoAreaProcesso.categoria,
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

      editarAreaProcesso(meta) {
        this.editando = true;

        this.novoAreaProcesso.sigla =  meta.sigla;
        this.novoAreaProcesso.nome = meta.nome;
        this.novoAreaProcesso.descricao = meta.descricao;
        this.novoAreaProcesso.modelo = meta.modelo;
        this.novoAreaProcesso.nivelMatu = meta.nivelMatu;
        this.novoAreaProcesso.categoria = meta.categoria;

        this.editAreaProcesso.id = meta.id;
      },

      cancelarEdicao() {
        this.editAreaProcesso.id = '';
        this.editando = false;

        limparFormulario()
      },

      atualizarAreaProcesso() {

        let _id = this.editAreaProcesso.id.trim();
        let data = {
          'sigla': this.novoAreaProcesso.sigla,
          'nome': this.novoAreaProcesso.nome,
          'descricao': this.novoAreaProcesso.descricao,
          'modelo': this.novoAreaProcesso.modelo,
          'nivelMatu': this.novoAreaProcesso.nivelMatu,
          'categoria': this.novoAreaProcesso.categoria,
        };

        console.log('/areaprocesso/'+_id, data);

        this.$http.put('http://localhost:3000/areaprocesso/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarMetasGenericas();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerAreaProcesso(meta) {

        let resource = this.$resource('http://localhost:3000/areaprocesso{/id}');
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
        this.novoAreaProcesso.sigla = '';
        this.novoAreaProcesso.nome = '';
        this.novoAreaProcesso.descricao = '';
        this.novoAreaProcesso.nivelMatu = [];
        this.novoAreaProcesso.modelo = [];
        this.novoAreaProcesso.categoria = [];
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
