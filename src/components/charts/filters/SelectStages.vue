<template>
  <v-select
    v-model="stagesSelected"
    :items="listStages"
    item-value="id"
    item-text="name"
    label="Elige las etapas"
    outlined
    multiple
    hide-details="auto"
    return-object
    small-chips
    @change="updateSelect"
    :loading="isLoading"
  >
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="listStages.length > 0 ? 'primary' : ''">
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
import { GET_PIPELINE } from '@/graphql/querys/pipelinesQuery';

export default {
  name: 'SelectStages',
  props: {
    all: {
      type: Boolean,
      default: false,
    },
    pipelineSelected: {
      type: String,
      default: '',
    },
    defaultSelect: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      pipeline: {},
      stagesSelected: [],
    };
  },
  // created() {
  //   this.stagesSelected = this.noReactive(this.defaultSelect);
  //   this.updateSelect();
  // },
  watch: {
    // defaultSelect(newValue, beforeValue) {
    //   if (JSON.stringify(newValue) !== JSON.stringify(beforeValue)) {
    //     this.stagesSelected = this.noReactive(this.defaultSelect);
    //     this.updateSelect();
    //   }
    // },
    listStages: {
      handler(list) {
        if (list.length) {
          if (this.all) {
            this.stagesSelected = list;
          } else if (this.defaulSelect && this.defaulSelect.length) {
            this.stagesSelected = this.defaultSelect;
          }
          this.updateSelect();
        }
      },
    },
  },
  computed: {
    listStages() {
      if (this.pipeline.stages) {
        return this.pipeline.stages.map(({ id, name }) => {
          return {
            id,
            name,
          };
        });
      }
      return [];
    },
    allStages() {
      return this.stagesSelected.length === this.listStages.length;
    },
    someStages() {
      return this.stagesSelected.length > 0 && !this.listStages;
    },
    icon() {
      if (this.allStages) return 'mdi-close-box';
      if (this.someStages) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },
  methods: {
    updateSelect() {
      this.$emit('change', this.stagesSelected);
    },
    toggle() {
      this.$nextTick(() => {
        if (this.allStages) {
          this.stagesSelected = [];
        } else {
          this.stagesSelected = this.listStages.slice();
        }
        this.updateSelect();
      });
    },
  },
  apollo: {
    pipeline: {
      query: GET_PIPELINE,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          pipelineId: this.pipelineSelected,
        };
      },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
      skip() {
        return this.pipelineSelected === '';
      },
    },
  },
};
</script>

<style></style>
