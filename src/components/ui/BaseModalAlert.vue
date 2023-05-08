<template>
  <v-dialog v-model="modalHandler.isOpen" persistent width="500">
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
        <p class="mb-0 title-modal">
          {{ modalHandler.message.title }}
        </p>
        <span style="color: #9D9D9E">
          {{ modalHandler.message.text }}
        </span>
      </v-card-text>
      <v-card-actions class="justify-center pb-8">
        <v-btn
          v-if="cancel"
          large
          class="mr-4"
          outlined
          color="primary"
          @click="close"
        >
          Cancelar
        </v-btn>
        <v-btn
          :loading="this.modalHandler.isLoading"
          large
          tile
          color="secondary"
          @click="confirm"
        >
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EnterpriseModalConfirm',
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return {
          isOpen: false,
          isLoading: false,
          message: {
            title: '',
            text: '',
          },
          info: {},
        };
      },
    },
    cancel: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.$emit('close', {
        isOpen: false,
        isLoading: false,
        message: { title: '', text: '' },
        info: {},
      });
    },
    confirm() {
      // los estados de abierto y cargando se manejan afuera para evitar bugs
      this.$emit('confirm', {
        message: this.modalHandler.message,
        info: this.modalHandler.info ? this.modalHandler.info : {},
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
