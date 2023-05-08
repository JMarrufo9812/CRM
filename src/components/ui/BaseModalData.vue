<template>
  <v-dialog v-model="dialog" width="500" @click:outside="close">
    <v-card>
      <slot></slot>
      <v-card-actions class="justify-center">
        <v-btn color="primary" text @click="close">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseModalData',
  props: {
    dialog: {
      type: Boolean,
    },
  },
  methods: {
    close() {
      this.$emit('close', false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
