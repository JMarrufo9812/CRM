<template>
  <v-dialog v-model="modal.status" scrollable max-width="430px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        {{ config.title }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <div class="text-center">
          <v-icon size="50" color="white" class="icon">
            mdi-trash-can-outline
          </v-icon>
          <h3 class="subtitle">{{ config.subtitle }}</h3>
          <h3 class="description mb-0 font-weight-bold">"{{ item.name }}"</h3>
          <p class="description">
            {{ config.description }}
          </p>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="remove" :loading="isLoading">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';

export default {
  name: 'BaseModalDeleteItem',
  mixins: [modalMethodsMixin, modalApolloMixin],
  props: {
    isLoading: {
      type: Boolean,
      default: false,
      required: true,
    },
    config: {
      type: Object,
      default: () => {
        return {
          title: '',
          subtitle: '',
          description: '',
        };
      },
      required: true,
    },
    item: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      modalId: 'deleteTemplateEmail',
      modal: {},
    };
  },
  methods: {
    close() {
      this.changeModal({ id: 'deleteTemplateEmail', status: false });
    },
    remove() {
      this.$emit('remove', this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .icon  .subtitle} from ../../../../scss/components/base.modal.delete.item';
</style>
