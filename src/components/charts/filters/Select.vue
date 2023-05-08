<template>
  <v-select
    dense
    outlined
    :label="name"
    :items="list"
    item-value="id"
    item-text="text"
    hide-details="auto"
    v-model="itemSelected"
    @change="updateSelect"
  ></v-select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    defaultSelect: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemSelected: '',
    };
  },
  created() {
    this.itemSelected = this.defaultSelect || this.list[0].id;
    this.updateSelect();
  },
  watch: {
    list: {
      handler(newList) {
        if (newList.length) this.itemSelected = this.list[0].id;
      },
      immediate: true,
    },
    defaultSelect: {
      handler() {
        this.itemSelected = this.defaultSelect;
        this.updateSelect();
      },
      immediate: true,
    },
  },
  methods: {
    updateSelect() {
      return this.$emit('change', this.itemSelected);
    },
  },
};
</script>

<style lang="scss" scoped></style>
