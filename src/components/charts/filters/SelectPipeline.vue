<template>
  <v-select
    v-model="pipelineSelected"
    :items="pipelines"
    item-value="id"
    item-text="name"
    label="Embudo"
    outlined
    dense
    hide-details="auto"
    return-object
    @change="updateSelect"
    :loading="$apollo.queries.pipelines.loading"
  ></v-select>
</template>

<script>
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';

export default {
  name: 'SelectPipeline',
  props: {
    defaultSelect: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      pipelineSelected: '',
      pipelines: [],
    };
  },
  watch: {
    defaultSelect: {
      handler(pipeline) {
        this.pipelineSelected = pipeline;
        this.updateSelect();
      },
      immediate: true,
    },
    pipelines: {
      handler() {
        if (this.defaultSelect.id) {
          this.pipelineSelected = this.defaultSelect;
          this.updateSelect();
        }
      },
      immediate: true,
    },
  },
  methods: {
    updateSelect() {
      this.$emit('change', this.pipelineSelected);
    },
  },
  apollo: {
    pipelines: {
      query: GET_PIPELINES,
    },
  },
};
</script>

<style></style>
