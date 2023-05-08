<template>
  <v-dialog v-model="isOpen" scrollable max-width="430px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Subir archivos
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <v-form ref="form" v-model="valid">
          <v-file-input
            v-model="files"
            multiple
            label="Seleccionar archivos"
            outlined
            counter
            show-size
            dense
            full-width
            truncate-length="30"
            chips
            :rules="rules"
            accept="image/*, .pdf"
          ></v-file-input>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="saveFiles">
          Agregar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EmailEditorAttach',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
    },
  },
  data() {
    return {
      valid: true,
      files: [],
      rules: [
        (value) =>
          !value ||
          value.reduce((size, file) => size + file.size, 0) < 25000000 ||
          'El total de archivos es mayor a los 25 MB permitidos.',
      ],
    };
  },
  watch: {
    reset(value) {
      if (!value) {
        this.files = [];
      }
    },
  },
  methods: {
    close() {
      this.$emit('close');
      this.$refs.form.reset();
    },
    saveFiles() {
      this.$refs.form.validate();
      if (this.valid) {
        const { files } = this;
        this.$emit('saveFiles', files);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
