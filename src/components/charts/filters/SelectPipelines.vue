<template>
  <v-select
    v-model="pipelineSelected"
    :items="pipelines"
    item-value="id"
    item-text="name"
    label="Embudos"
    outlined
    multiple
    dense
    hide-details="auto"
    return-object
    @change="updateSelect"
  >
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="pipelines.length > 0 ? 'primary' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Todos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';

export default {
  name: 'SelectPipelines',
  props: {
    all: {
      type: Boolean,
      default: false,
    },
    defaultSelect: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pipelineSelected: '',
      pipelines: [],
    };
  },
  created() {
    this.pipelineSelected = this.noReactive(this.defaultSelect);
    this.updateSelect();
  },
  watch: {
    defaultSelect(newValue, beforeValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(beforeValue)) {
        this.pipelineSelected = this.noReactive(this.defaultSelect);
        this.updateSelect();
      }
    },
    pipelines: {
      handler(list) {
        if (list.length) {
          if (this.all) {
            this.pipelineSelected = list;
          } else if (this.defaulSelect && this.defaulSelect.length) {
            this.pipelineSelected = this.defaultSelect;
          }
          this.updateSelect();
        }
      },
    },
  },

  computed: {
    allPipelines() {
      return this.pipelineSelected.length === this.pipelines.length;
    },
    somePipelines() {
      return this.pipelineSelected.length > 0 && !this.pipelines;
    },
    icon() {
      if (this.allPipelines) return 'mdi-close-box';
      if (this.somePipelines) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },
  methods: {
    updateSelect() {
      this.$emit('change', this.pipelineSelected);
    },
    toggle() {
      this.$nextTick(() => {
        if (this.allPipelines) {
          this.pipelineSelected = [];
        } else {
          this.pipelineSelected = this.pipelines.slice();
        }
        this.updateSelect();
      });
    },
  },
  apollo: {
    pipelines: {
      query: GET_PIPELINES,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style></style>
