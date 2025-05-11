<template>
  <q-page class="q-pa-md">
    <q-table :rows="cursos" :columns="columns" flat bordered dense :rows-per-page-options="[0]" title="Cursos" :filter="filter">
      <template v-slot:top-right>
        <q-btn label="Nuevo" icon="add_circle_outline" color="primary" @click="nuevoCurso" :loading="loading" no-caps />
        <q-input v-model="filter" label="Buscar" dense outlined class="q-ml-sm">
          <template v-slot:append><q-icon name="search" /></template>
        </q-input>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn size="sm" flat icon="edit" color="primary" @click="editarCurso(props.row)" />
          <q-btn size="sm" flat icon="delete" color="negative" @click="eliminarCurso(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ curso.id ? 'Editar' : 'Nuevo' }} Curso</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="guardarCurso">
            <q-input v-model="curso.nombre" label="Nombre" dense outlined class="q-mb-sm" :rules="[v => !!v || 'Requerido']" />
            <q-input v-model="curso.descripcion" label="Descripción" dense outlined type="textarea" />
            <div class="text-right">
              <q-btn flat label="Cancelar" color="negative" v-close-popup />
              <q-btn label="Guardar" type="submit" color="primary" class="q-ml-sm" :loading="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'CursosPage',
  data() {
    return {
      cursos: [],
      curso: {},
      dialog: false,
      loading: false,
      filter: '',
      columns: [
        { name: 'actions', label: 'Acciones', align: 'center' },
        { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
        { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'left' },
      ]
    };
  },
  mounted() {
    this.obtenerCursos();
  },
  methods: {
    obtenerCursos() {
      this.loading = true;
      this.$axios.get('cursos').then(res => {
        this.cursos = res.data;
      }).catch(err => {
        this.$alert.error(err.response?.data?.message || 'Error al obtener cursos');
      }).finally(() => {
        this.loading = false;
      });
    },
    nuevoCurso() {
      this.curso = {};
      this.dialog = true;
    },
    editarCurso(curso) {
      this.curso = { ...curso };
      this.dialog = true;
    },
    guardarCurso() {
      this.loading = true;
      const req = this.curso.id
        ? this.$axios.put(`cursos/${this.curso.id}`, this.curso)
        : this.$axios.post('cursos', this.curso);
      req.then(() => {
        this.$alert.success('Curso guardado');
        this.dialog = false;
        this.obtenerCursos();
      }).catch(err => {
        this.$alert.error(err.response?.data?.message || 'Error al guardar');
      }).finally(() => {
        this.loading = false;
      });
    },
    eliminarCurso(id) {
      this.$alert.dialog('¿Desea eliminar este curso?').onOk(() => {
        this.loading = true;
        this.$axios.delete(`cursos/${id}`).then(() => {
          this.$alert.success('Curso eliminado');
          this.obtenerCursos();
        }).catch(err => {
          this.$alert.error(err.response?.data?.message || 'Error al eliminar');
        }).finally(() => {
          this.loading = false;
        });
      });
    }
  }
};
</script>
