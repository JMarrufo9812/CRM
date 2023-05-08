<template>
  <v-dialog
    v-model="modalHandler.isOpen"
    persistent
    max-width="450px"
    scrollable
  >
    <v-card>
      <v-card-title class="primary d-flex justify-space-between py-6">
        <span class="white--text ml-2">
          {{
            modalHandler.isEdit
              ? `Agregar usuarios a ${group.name}`
              : 'Agregar Grupo'
          }}
        </span>
        <div>
          <v-icon @click="close" class="white--text">
            mdi-close
          </v-icon>
        </div>
      </v-card-title>

      <v-card-text class="pt-10">
        <v-form ref="formGroup" v-model="isValidate">
          <v-text-field
            v-model="newGroup.name"
            :rules="rules.general"
            label="Nombre"
            class="mx-6"
            counter
            maxlength="25"
            outlined
            required
          ></v-text-field>
          <v-alert
            dense
            outlined
            type="error"
            v-model="isError.show"
            dismissible
          >
            {{ isError.error }}
          </v-alert>
          <p class="ml-6 black--text">
            selecciona los permisos del nuevo grupo:
          </p>
          <ListGroupPermissions
            :permissions="
              permissions.length > 0 ? permissions : this.newGroup.permissionsu
            "
            :isModal="true"
            @emitPermissions="permissionsSelected"
          />
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
  name: 'ModalGroup',
  mixins: [rulesMixin],
  components: {
    ListGroupPermissions: () =>
      import('@/components/users/ListGroupPermissions.vue'),
  },
  props: {
    // manejador de modal
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
    // permisos para seleccionar
    permissions: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    // grupo a editar cuando se esta en ese modo
    group: {
      required: false,
      type: Object,
      default: () => {
        return {};
      },
    },
    loadingPermissions: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      // validacion de formulario
      isValidate: true,
      // manejador de error dentro del modal
      isError: {
        show: false,
        error: '',
      },
      // objeto a enviar
      newGroup: {
        name: '',
        permissions: [],
      },
    };
  },
  watch: {
    permissions(value) {
      if (value) {
        this.newGroup.permissions = JSON.parse(JSON.stringify(value));
      }
    },
    // manejador de modal
    modalHandler({ isOpen }) {
      if (!isOpen) {
        // resete valores cuando se cierra el modal
        this.resetValues();
      }
    },
  },
  methods: {
    // rebibe los permisos seleccionados
    permissionsSelected(type, data) {
      // el tipe no tiene utilidad aqui solo pasamos los permisos
      this.newGroup.permissions = data;
    },
    // emite los datos
    outData() {
      // modo editar
      // modo crear
      // le damos formato a los permisos que se enviaran
      this.newGroup.permissions = this.newGroup.permissions.map(
        ({ name, methods }) => {
          return { name, methods };
        },
      );
      this.$refs.formGroup.validate();
      // validacion de permisos
      if (this.newGroup.permissions.length === 0) {
        // manejador de error
        this.isError = {
          show: true,
          error: 'Selecciona mínimo un permiso',
        };
      } else if (this.isValidate) {
        this.$emit('newGroup', this.newGroup);
      }
    },
    // cierra el modal
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
    // reseteamos valores y validaciones
    resetValues() {
      this.$refs.formGroup.resetValidation();
      this.isError = {
        show: false,
        error: '',
      };
      this.newGroup = {
        name: '',
        permissions: [],
      };
    },
  },
};
</script>
