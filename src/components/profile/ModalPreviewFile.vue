<template>
  <v-dialog v-model="modalHandler.isOpen" max-width="50%" persistent>
    <div class="d-flex flex-column pa-4">
      <div class="d-flex justify-end">
        <v-btn icon @click="close">
          <v-icon large color="white">mdi-close-circle</v-icon>
        </v-btn>
      </div>
      <div class="d-flex justify-center pb-6">
        <v-img
          :src="modalHandler.file.url ? modalHandler.file.url.link : ''"
          alt=""
        />
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalPreviewFile',
  props: {
    modalHandler: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('close', { isOpen: false, file: '' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
