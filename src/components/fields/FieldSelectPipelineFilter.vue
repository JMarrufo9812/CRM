<template>
  <v-select
    v-model="field.value"
    :items="pipelines"
    item-text="name"
    item-value="id"
    dense
    outlined
    hide-details="auto"
    :class="[field.isRequired ? 'required' : '']"
    :label="field.label || 'Embudos'"
  ></v-select>
</template>

<script>
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';

export default {
  name: 'FieldSelectStage',
  props: {
    field: {
      type: Object,
      required: true,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    resetValues(value) {
      if (!value) this.resetValues();
    },
  },
  methods: {
    updateValue(stage) {
      this.field.value = stage.id;
      this.stageName = stage.name;
    },
    resetValues() {
      delete this.field.value;
    },
  },
  apollo: {
    pipelines: {
      query: GET_PIPELINES,
    },
  },
};
</script>
