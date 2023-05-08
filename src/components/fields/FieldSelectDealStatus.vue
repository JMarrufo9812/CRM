<template>
  <!-- este componente es especialmente dirigido a la creacion de los fitltros -->
  <v-select
    v-model="field.value"
    :prepend-icon="field.icon"
    :items="items"
    item-text="text"
    item-value="value"
    :rules="field.select ? rules.select : []"
    outlined
    :dense="field.edit ? field.edit : inputProps ? inputProps.isDense : false"
    hide-details="auto"
    :class="[
      inputProps ? inputProps.class : '',
      field.isRequired ? 'required' : '',
    ]"
    :label="field.label || 'Seleccionar'"
  ></v-select>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldSelectDealStatus',
  mixins: [rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    inputProps: {
      type: Object,
      required: false,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        { text: 'Abierto', value: 'OPEN' },
        { text: 'Ganado', value: 'WON' },
        { text: 'Perdido', value: 'LOST' },
        { text: 'Eliminado', value: 'DELETED' },
      ],
    };
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
