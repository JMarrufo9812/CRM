<template>
  <v-menu offset-y ransition="scale-transition" max-height="40%">
    <template v-slot:activator="{ on }">
      <v-btn outlined class="mr-2" v-on="on">
        <slot name="text-button"></slot>
        <v-icon class="ml-6">mdi-filter-variant</v-icon>
      </v-btn>
    </template>
    <v-list class="py-0" dense>
      <v-list-item
        v-show="!filter.list"
        v-for="(filter, index) in filters"
        :key="index"
        class="filter-item px-4 my-1"
      >
        <v-list-item-content @click="actions('SELECT', filter)">
          <v-list-item-title class="filter-title">
            <v-icon small class="mr-2">mdi-filter-variant</v-icon>
            {{ filter.name }}
            <v-icon v-if="!filter.isVisible" x-small>
              mdi-lock-outline
            </v-icon>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="filter-action ma-1">
          <v-btn class="check-icon" v-if="filter.isSelected" icon small>
            <v-icon small>
              mdi-check-bold
            </v-icon>
          </v-btn>
          <v-btn @click="actions('EDIT', filter)" small icon>
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="actions('CREATE')">
        <v-icon color="secondary" class="mr-6">mdi-plus</v-icon>
        <v-list-item-content>
          <v-list-item-title>
            Agregar filtro
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    filters: {
      required: true,
      type: [Array, Object],
      default: () => [],
    },
  },
  methods: {
    actions(action, data) {
      this.$emit('action', action, data);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '{ .filter-item .filter-title } from ../../../../scss/components/menu.filters';
</style>
