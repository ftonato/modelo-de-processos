<template>
  <div class="modelos">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Modelo</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionar">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="sigla" class="control-label">Sigla</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editModelo.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="sigla" placeholder="Sigla" v-model="novoModelo.sigla">

                  <ul class="errors" v-show="!validarModelo.sigla">
                    <li class="label label-danger">Sigla não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novoModelo.nome">

                  <ul class="errors" v-show="!validarModelo.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="descricao" class="control-label">Descrição</label>
                </div>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="descricao" placeholder="Descrição" v-model="novoModelo.descricao">

                  <ul class="errors" v-show="!validarModelo.descricao">
                    <li class="label label-danger">Descrição não pode ser vazio.</li>
                  </ul>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-2">
                  <label for="metas_genericas" class="control-label">Metas Genericas</label>
                </div>
                <div class="col-sm-10">

                  <select class="form-control" name="metas_genericas" id="metas_genericas" v-model="novoModelo.metasGen" multiple>
                    <option v-for="option in listaMetasGen" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>

                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-2">
                  <label for="area_processo" class="control-label">Area Processo</label>
                </div>
                <div class="col-sm-10">

                  <select class="form-control" name="area_processo" id="area_processo" v-model="novoModelo.areaProcesso" multiple>
                    <option v-for="option in listaAreaProcesso" v-bind:value="option.value">
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
                <tr v-for="modelo in modelos">
                  <td scope="row">{{ modelo.id }}</td>
                  <td scope="row">{{ modelo.nome }}</td>
                  <td scope="row">{{ modelo.sigla }}</td>
                  <td scope="row">{{ modelo.descricao }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarModelo(modelo)" href="#" title="Editar Modelo"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerModelo(modelo)" href="#" title="Deletar Modelo"><i class="fa fa-trash"></i></a>
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
        name: 'Lista de Modelos',
        modelos: [],
        listaMetasGen: [],
        listaAreaProcesso: [],
        novoModelo: {
          sigla: '',
          nome: '',
          descricao: '',
          metasGen: [],
          areaProcesso: [],
        },
        editModelo: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarModelos();
      this.listarMetasGenericas();
      this.listarAreaProcesso();
    },
    computed: {
      validarModelo() {
        return {
          sigla: !!this.novoModelo.sigla.trim(),
          nome: !!this.novoModelo.nome.trim(),
          descricao: !!this.novoModelo.descricao.trim(),
        }
      },
      validarFormulario() {
        let validarNovoModelo = this.validarModelo
        return Object.keys(validarNovoModelo).every(function (key) {
          return validarNovoModelo[key]
        })
      }
    },
    methods: {

      listarModelos() {
        this.$http.get('http://localhost:3000/modelo').then((req) => {

          // adiciona os itens dos modelos p/ a lista de modelos
          this.modelos = req.data;
        });

      },

      listarMetasGenericas() {
        this.$http.get('http://localhost:3000/metasgenericas').then((req) => {

          // adiciona os itens das metas genericas p/ a lista de metas genericas
          for (let i = 0; i < req.data.length; i++) {
            this.listaMetasGen.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      listarAreaProcesso() {
        this.$http.get('http://localhost:3000/areaprocesso').then((req) => {

          // adiciona os itens das metas genericas p/ a lista de metas genericas
          for (let i = 0; i < req.data.length; i++) {
            this.listaAreaProcesso.push({ text: req.data[i].nome , 'value': req.data[i].id });
          }
        });
      },

      adicionar() {

        // Está editando?
        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarModelo();

          } else {
            console.log('inválido');
          }

        } else { // Está inserindo

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/modelo');
            let data = {
              'sigla': this.novoModelo.sigla,
              'nome': this.novoModelo.nome,
              'descricao': this.novoModelo.descricao,
              'metasGen': this.novoModelo.metasGen,
              'areaProc': this.novoModelo.areaProcesso,
            };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              // chama o método para atualizar a lista de modelos
              this.listarModelos();

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

      editarModelo(modelo) {
        let _id = modelo.id;
        let _sigla = modelo.sigla;
        let _nome = modelo.nome;
        let _descricao = modelo.descricao;

        let _metasGen = modelo.metasGen;
        //let listaMetasGenericas = [];

        for(let val in _metasGen) {
          //listaMetasGenericas.push(val);
          this.novoModelo.metasGen.push(val);
        }

        let _areaProc = modelo.areaProc;
        //let listaAreasProcessos = [];

        for(let val in _areaProc) {
          //listaAreasProcessos.push(val);
          this.novoModelo.areaProcesso.push(val);
        }

        this.editando = true;

        this.novoModelo.sigla = _sigla;
        this.novoModelo.nome = _nome;
        this.novoModelo.descricao = _descricao;

        //this.novoModelo.metasGen = _metasGen;
        //this.novoModelo.areaProcesso = _areaProc;

        this.editModelo.id = _id;

      },

      cancelarEdicao() {
        this.novoModelo.sigla = '';
        this.novoModelo.nome = '';
        this.novoModelo.descricao = '';
        this.novoModelo.metasGen = [];
        this.novoModelo.areaProcesso = [];
        this.editModelo.id = '';

        this.editando = false;
      },

      atualizarModelo() {

        let _id = this.editModelo.id.trim();
        let data = {
          'sigla': this.novoModelo.sigla,
          'nome': this.novoModelo.nome,
          'descricao': this.novoModelo.descricao,
          'metasGen': this.novoModelo.metasGen,
          'areaProc': this.novoModelo.areaProcesso,
        };

        console.log('/modelo/'+_id, data);

        this.$http.put('http://localhost:3000/modelo/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            // chama o método para atualizar a lista de modelos
            this.listarModelos();

            // limpa o formulário
            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerModelo(modelo) {

        let resource = this.$resource('http://localhost:3000/modelo{/id}');
        let _id = modelo.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          // chama o método para atualizar a lista de modelos
          this.listarModelos();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novoModelo.sigla = '';
        this.novoModelo.nome = '';
        this.novoModelo.descricao = '';
        this.novoModelo.metasGen = [];
        this.novoModelo.areaProcesso = [];
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
