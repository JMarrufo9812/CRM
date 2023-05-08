<template>
  <v-dialog v-model="modalHandler.isOpen" persistent max-width="500" scrollable>
    <v-card>
      <v-card-title class="primary d-flex justify-space-between py-6">
        <span class="white--text ml-2">
          Agregar Rol
        </span>
        <div>
          <v-icon @click="close" class="white--text">
            mdi-close
          </v-icon>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRole" v-model="isValidate">
          <v-text-field
            v-model="newRole.name"
            :rules="rules.general"
            class="mt-6"
            label="Nombre de rol"
            counter
            maxlength="25"
            outlined
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn class="mr-8" large tile outlined color="primary" @click="close">
          cancelar
        </v-btn>
        <v-btn
          large
          tile
          normal
          color="secondary"
          @click="outData"
          :loading="modalHandler.isLoading"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'ModalRol',
  mixins: [rulesMixin],
  props: {
    // manejador de modal
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
  },
  data() {
    return {
      // errores dentro del modal
      isError: {
        show: false,
        error: '',
      },
      // validacion del formulario
      isValidate: true,
      // objeto de rol
      newRole: {
        id: '',
        name: '',
      },
    };
  },
  computed: {
    isResponsive() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  watch: {
    // resetea los valores al cerrar el modal
    modalHandler() {
      if (!this.modalHandler.isOpen) {
        this.resetValues();
      }
    },
  },
  methods: {
    // emite los valores
    outData() {
      this.$refs.formRole.validate();
      if (this.isValidate) {
        this.$emit('newRole', this.newRole);
      }
    },
    // cierra el modal
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
    // resetea valores y validaciones
    resetValues() {
      this.isError = {
        show: false,
        error: '',
      };
      this.$refs.formRole.reset();
      this.$refs.formRole.resetValidation();
      this.newRole = {
        id: '',
        name: '',
      };
    },
  },
};
</script>
