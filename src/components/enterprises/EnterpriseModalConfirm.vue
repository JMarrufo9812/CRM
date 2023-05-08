<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card width="500">
      <div class="d-flex justify-center pt-6">
        <v-icon x-large color="warning">
          mdi-alert
        </v-icon>
      </div>
      <v-card-title class="pt-1 pb-0 d-flex justify-center">
        <span class="title-modal">
          Atención
        </span>
      </v-card-title>
      <v-card-text align="center" class="pt-0">
        <v-icon class="white--text mr-1">mdi-alert</v-icon>
        <p class="text-center mb-0">
          Se perderán los datos del registro.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn tile outlined text @click="close">
          No, regresar al registro
        </v-btn>
        <v-spacer />
        <v-btn color="error" @click="confirm">
          Sí, cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EnterpriseModalConfirm',
  props: {
    dialog: {
      type: Boolean,
    },
  },
  methods: {
    close() {
      this.$emit('update:dialog', false);
    },
    confirm() {
      this.$emit('update:dialog', false);
      this.$emit('confirm', true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
