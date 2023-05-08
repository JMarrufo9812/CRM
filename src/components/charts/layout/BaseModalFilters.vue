<template>
  <v-dialog v-model="isOpen" scrollable max-width="430px" persistent>
    <template #activator="{ on }">
      <v-btn :icon="isIcon" color="primary" @click="openModalFilter" v-on="on">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="primary white--text break-word">
        <v-row no-gutters>
          <v-col cols="10">Filtros</v-col>
          <v-col cols="2" class="text-right">
            <v-btn icon color="white" @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save">
          Aplicar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';

export default {
  name: 'BaseModalFilters',
  mixins: [modalMethodsMixin, modalApolloMixin],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalId: 'modalFiltersChart',
      modal: {},
    };
  },
  methods: {
    openModalFilter() {
      this.$emit('statusModal', true);
    },
    save() {
      this.$emit('save');
    },
    close() {
      this.$emit('statusModal', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.break-word {
  word-break: break-word;
}
</style>
