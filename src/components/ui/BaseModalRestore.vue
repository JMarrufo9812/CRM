<template>
  <v-dialog persistent v-model="modalHandler.isOpen" max-width="500">
    <v-card width="500">
      <div class="d-flex justify-center pt-6">
        <v-icon x-large color="success">
          mdi-restore
        </v-icon>
      </div>
      <v-card-title class="pt-1 justify-center">
        <span class="title-delete">
          {{
            modalHandler.message
              ? modalHandler.message.title
                ? modalHandler.message.title
                : '¿Seguro que deseas restaurar?'
              : '¿Seguro que deseas restaurar?'
          }}
        </span>
      </v-card-title>
      <v-card-text align="center" class="pb-2">
        <span class="item-delete">
          "{{
            modalHandler.message
              ? modalHandler.message.nameItem
              : 'Los elementos seleccionados'
          }}"
        </span>
        <span>
          {{
            modalHandler.message
              ? modalHandler.message.text
              : 'seran restaurados'
          }}
        </span>
      </v-card-text>
      <v-card-actions class="justify-center pb-8">
        <v-btn large tile class="mr-4" color="primary" outlined @click="cancel">
          Cancelar
        </v-btn>
        <v-btn
          large
          color="secondary"
          :loading="modalHandler.isLoading"
          tile
          @click="confirm"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseModalDelete',
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return {
          isOpen: false,
          isLoading: false,
          message: {
            title: '¿Seguro que deseas restaurar?',
            nameItem: 'Los elementos seleccionados',
            text: 'seran restaurar',
          },
          infoRestore: {},
        };
      },
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm', {
        isOpen: true,
        isLoading: true,
        message: this.modalHandler.message,
        infoRestore: this.modalHandler.infoRestore,
      });
    },
    cancel() {
      this.$emit('cancel', {
        isOpen: false,
        isLoading: false,
        message: this.modalHandler.message,
        infoRestore: this.modalHandler.infoRestore,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-delete .item-delete} from ../../../../scss/components/base.modal.scss';
</style>
