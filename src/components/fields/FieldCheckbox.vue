<template>
  <div>
    <span>
      <v-icon class="mr-1">mdi-checkbox-multiple-marked-outline</v-icon>
      {{ field.label ? field.label : 'Título de opciones' }}
      <b v-show="field.isRequired" class="red--text">
        *
      </b>
    </span>
    <v-card
      v-for="(item, index) in field.items"
      :key="index"
      class="col-12 mt-2"
      outlined
    >
      <v-checkbox
        v-model="field.value"
        class="pa-0 ma-0"
        hide-details="auto"
        multiple
        :label="item.label ? item.label : 'opcion'"
        :value="item.value"
        :rules="field.isRequired ? rules.select : []"
      ></v-checkbox>
    </v-card>
  </div>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldCheckbox',
  mixins: [rulesMixin],
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
    resetValues() {
      delete this.field.value;
    },
  },
};
</script>
