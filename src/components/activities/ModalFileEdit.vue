<template>
  <v-dialog
    v-model="modalHandler.isOpen"
    width="500"
    @click:outside="close"
    scrollable
  >
    <v-card>
      <v-card-title class="primary white--text py-2">
        Añadir descripción del archivo
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>{{ getIcon(file.format) }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ file.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ file.createdAt }} {{ file.size }} - {{ file.author }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-textarea
          v-model="description"
          class="mt-3"
          outlined
          dense
          label="Descripción"
          rows="3"
          counter="140"
          maxlength="140"
          hide-details="auto"
          :value="`${file.description}`"
        ></v-textarea>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn class="mr-3" color="error" @click="close">Cancelar</v-btn>
        <v-btn
          :loading="modalHandler.isLoading"
          color="success"
          @click="outData"
          :disabled="file.description === description"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalFileEdit',
  props: {
    modalHandler: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      file: {},
      description: '',
    };
  },
  watch: {
    modalHandler({ isOpen, info }) {
      if (isOpen) {
        this.file = info.item;
        this.description = info.item.description;
      }
    },
  },
  methods: {
    // Save
    outData() {
      this.modalHandler.info.item.description = this.description;
      this.$emit('outData', {
        isOpen: true,
        isLoading: true,
        info: this.modalHandler.info,
      });
    },
    // Close modal with sync
    close() {
      this.$emit('close', { isOpen: false, isLoading: false, info: {} });
    },
    // Icon to show the file right
    getIcon(format) {
      switch (format) {
        case 'PDF':
          return 'mdi-file-pdf';
        case 'PNG':
        case 'JPG':
          return 'mdi-file-image';
        default:
          return 'mdi-file';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
