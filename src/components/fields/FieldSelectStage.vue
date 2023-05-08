<template>
  <v-select
    v-model="field.value"
    :items="stages"
    label="Select"
    item-text="name"
    item-value="id"
    dense
    outlined
  >
    <template v-slot:item="data">
      <template>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-select>
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
  data() {
    return {
      stageSelected: {},
      stages: [],
    };
  },
  watch: {
    resetValues(value) {
      if (!value) this.resetValues();
    },
    pipelines(value) {
      const list = [];
      value.forEach((pipeline) => {
        list.push(
          ...[{ header: pipeline.name }, ...pipeline.stages, { divider: true }],
        );
      });
      this.stages = list;
    },
  },
  computed: {
    menuProps() {
      return this.stageSelected ? { value: false } : {};
    },
  },
  methods: {
    updateValue(stage) {
      this.field.value = stage.id;
      this.stageSelected = stage;
      // console.log(this.stageName);
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
