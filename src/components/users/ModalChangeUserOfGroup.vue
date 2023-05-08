<template>
  <v-dialog
    v-model="modalHandler.isOpen"
    persistent
    max-width="480px"
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between primary white--text ">
        <span>
          selecciona el grupo al que deseas mover
        </span>
        <v-icon @click="close" color="white">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text class="pt-10">
        <v-select
          v-model="groupSelected"
          outlined
          label="Nuevo grupo"
          :items="groupsToSelect"
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
            :disabled="!groupSelected"
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
    // manejador de modal
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false, info: {} };
      },
    },
    // grupo a editar cuando se esta en ese modo
    groups: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      groupsToSelect: [],
      groupSelected: '',
      userUpdated: {},
    };
  },
  watch: {
    modalHandler({ isOpen, info }) {
      if (isOpen) {
        this.userUpdated = info;
        if (Object.keys(info).length !== 0)
          this.groupsToSelect = this.groups.filter(
            (groupdb) => info.group.id !== groupdb.id,
          );
      } else this.resetValues();
    },
  },
  methods: {
    outData() {
      const userToUpdate = {
        id: this.userUpdated.id,
        group: {
          id: this.groupSelected,
        },
        role: {
          id: '',
        },
      };
      this.$emit('outData', userToUpdate);
    },
    // cierra el modal
    close() {
      this.$emit('close', { isOpen: false, isLoading: false, info: {} });
    },
    resetValues() {
      this.groupsToSelect = [];
      this.groupSelected = '';
      this.userUpdated = {};
    },
  },
};
</script>
