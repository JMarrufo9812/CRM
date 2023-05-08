<template>
  <v-dialog v-model="dialog" scrollable max-width="430px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Sincronización de calendario
        <v-spacer />
        <v-btn icon color="white" @click="close" class="mr-1">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-5">
        <span class="font-weight-bold pb-2">
          Para finalizar elije un calendario:
        </span>
        <v-select
          dense
          v-model="selectedCalendar"
          :items="listCalendar"
          item-text="summary"
          item-value="id"
          label="Selecciona un calendario"
          outlined
          hide-details="auto"
        ></v-select>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          @click="save"
          :loading="loading"
          :disabled="selectedCalendar === ''"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalSelectCalendar',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    listCalendar: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedCalendar: '',
    };
  },
  methods: {
    close() {
      this.$emit('update:dialog', false);
    },
    save() {
      this.$emit('saveCalendar', this.selectedCalendar);
    },
  },
};
</script>

<style lang="scss" scoped></style>
