<template>
  <v-dialog width="500" hide-overlay v-model="modalHandler.isOpen" persistent>
    <v-card>
      <v-alert class="mb-0" outlined type="error">
        <div class="justify-center">
          <div>
            <strong>
              {{ modalHandler.error }}
            </strong>
          </div>
          <div class="d-flex justify-end pt-4">
            <v-btn class="white--text" color="secondary" @click="close">
              Aceptar
            </v-btn>
          </div>
        </div>
      </v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseModalError',
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, error: '' };
      },
    },
  },
  methods: {
    close() {
      this.$emit('close', { isOpen: false, error: '' });
    },
  },
};
</script>
