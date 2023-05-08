<template>
  <v-dialog
    v-model="isOpen"
    transition="dialog-bottom-transition"
    scrollable
    persistent
    class="modal"
  >
    <v-card class="modal__container">
      <v-card-title class="modal__title">
        <v-toolbar class="modal__header" flat>
          <v-toolbar-title class="text-uppercase">
            <h1 class="modal__title">Mi dashboard</h1>
            <h2 class="modal__subtitle">
              <span class="mr-1">
                {{ title }}
              </span>
              {{ titleRegular }}
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="close">
            <v-icon color="secondary">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-container class="pt-5">
          <div class="d-flex justify-end mb-5">
            <slot name="filters"></slot>
          </div>
          <slot name="chart"></slot>
          <v-divider class="mb-5"></v-divider>
          <slot name="table"></slot>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseModalChart',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Sin título',
    },
    titleRegular: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal__container {
  background-color: #ebebeb;
}

.modal__title {
  background-color: #ffffff;
}

.modal__title {
  font-size: 18px;
  font-weight: normal;
}
.modal__subtitle {
  font-size: 18px;
}
</style>
