<template>
  <v-dialog
    v-model="modalHandler.isOpen"
    persistent
    max-width="480px"
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between primary white--text">
        <span>
          Selecciona el rol al que deseas mover
        </span>
        <v-icon @click="close" color="white">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text class="pt-10">
        <v-select
          v-model="roleSelected"
          outlined
          label="Nuevo rol"
          :items="rolesToSelect"
          :item-text="({ name }) => name"
          :item-value="({ id }) => id"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-col align="end">
          <v-btn
            class="mr-8"
            large
            tile
            outlined
            color="primary"
            @click="close"
          >
            cancelar
          </v-btn>
          <v-btn
            large
            tile
            normal
            color="secondary"
            @click="outData"
            :disabled="!roleSelected"
            :loading="modalHandler.isLoading"
          >
            Guardar
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modalHandler: {
      isRequired: true,
    },
    roles: {
      isRequired: true,
    },
  },
  data() {
    return {
      roleSelected: '',
      rolesToSelect: [],
      userUpdated: {},
    };
  },
  watch: {
    modalHandler({ isOpen, info }) {
      if (isOpen) {
        this.userUpdated = info;
        if (Object.keys(info).length !== 0)
          this.rolesToSelect = this.roles.filter(
            (role) => info.role.id !== role.id,
          );
      } else this.resetValues();
    },
  },
  methods: {
    outData() {
      const userToUpdate = {
        id: this.userUpdated.id,
        group: {
          id: '',
        },
        role: {
          id: this.roleSelected,
        },
      };
      this.$emit('outData', userToUpdate);
    },
    // cierra el modal
    close() {
      this.$emit('close', { isOpen: false, isLoading: false, info: {} });
    },
    resetValues() {
      this.rolesToSelect = [];
      this.roleSelected = '';
      this.userUpdated = {};
    },
  },
};
</script>
