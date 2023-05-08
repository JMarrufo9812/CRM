<template>
  <v-tooltip top color="primary" v-if="formatItems.length">
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        v-if="isOpenChip"
        class="ma-2"
        close
        color="red"
        text-color="white"
        v-bind="attrs"
        v-on="on"
        small
        @click:close="close"
      >
        {{ formatItems[0] || '' }}
      </v-chip>
    </template>
    <span>{{ formatItems[1] || '' }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'GlobalFilterChip',
  props: {
    formatItems: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isOpenChip: true,
    };
  },
  methods: {
    close() {
      this.isOpenChip = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped></style>
