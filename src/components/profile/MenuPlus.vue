<template>
  <v-menu
    v-model="fab"
    offset-y
    nudge-bottom="10"
    transition="scroll-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mt-2 mr-4"
        color="secondary"
        fab
        absolute
        small
        right
        v-bind="attrs"
        v-on="on"
        :disabled="disabled"
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <slot></slot>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuPlus',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fab: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
