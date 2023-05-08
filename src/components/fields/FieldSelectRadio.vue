<template>
  <v-radio-group
    v-model="field.value"
    dense
    column
    :prepend-icon="
      generateIcon(field.icon, 'mdi-checkbox-multiple-blank-circle-outline')
    "
    :rules="field.isRequired ? rules.selectBoolean : []"
    :class="[{ 'pt-0 mt-0': field.edit }, field.isRequired ? 'required' : '']"
    :label="field.label || 'Selecciona'"
  >
    <template v-if="!field.edit">
      <v-card
        v-for="(item, index) in field.items"
        :key="index"
        class="col-12 mt-4"
        outlined
      >
        <v-radio
          class="ml-2"
          :label="item.label ? item.label : 'opción'"
          :value="item.value"
        ></v-radio>
      </v-card>
    </template>
    <template v-else>
      <v-radio
        v-for="(item, index) in field.items"
        :key="index"
        :label="item.label ? item.label : 'opción'"
        :value="item.value"
      ></v-radio>
    </template>
  </v-radio-group>
</template>
<script>
import { rulesMixin } from '@/mixins/rulesMixin';
import { fieldsMixin } from '@/mixins/fieldsMixin';

export default {
  name: 'FieldSelectRadio',
  mixins: [rulesMixin, fieldsMixin],
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
