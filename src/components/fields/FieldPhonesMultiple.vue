<template>
  <v-row>
    <v-col cols="10" class="py-0 mb-0">
      <v-text-field
        v-model="phone.number"
        class="mb-8"
        :rules="
          field.isRequired
            ? [...rules.isRequired, ...rules.phoneNumber]
            : rules.phoneNumber
        "
        type="tel"
        v-for="(phone, index) in phones"
        :key="index"
        prepend-icon="mdi-phone"
        :label="
          phones.length > 1 ? `${field.label} ${index + 1}` : `${field.label}`
        "
        @change="updateValue"
        outlined
        v-mask="'##########'"
        hide-details="auto"
      ></v-text-field>
    </v-col>
    <v-col cols="2" class="pa-0">
      <v-btn
        small
        :disabled="phones.length >= 3"
        tile
        @click="addPhone"
        outlined
        class="mt-3 mb-3"
      >
        <v-icon>
          mdi-phone-plus-outline
        </v-icon>
      </v-btn>
      <v-btn
        small
        v-show="index >= 1"
        v-for="(phone, index) in phones"
        :key="index"
        @click="deletePhone(index)"
        class="mt-12 mb-2"
        outlined
        tile
      >
        <v-icon>mdi-phone-minus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldPhonesMultiple',
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
    resetHandler() {
      if (!this.resetHandler) this.resetValues();
    },
  },
  data() {
    return {
      phones: [
        {
          number: null,
        },
      ],
    };
  },
  methods: {
    addPhone() {
      if (this.phones.length <= 2)
        this.phones.push({
          number: null,
        });
    },
    updateValue() {
      // elimina los campos de telefono que vengan vacios
      const cleanPhonesEmpty = this.phones.filter(({ number }) => number);
      // actualiza el valor del input
      this.field.value = cleanPhonesEmpty;
    },
    deletePhone(index) {
      this.phones.splice(index, 1);
      if (this.field.value) this.field.value.splice(index, 1);
    },
    resetValues() {
      delete this.field.value;
      this.phones = [
        {
          number: null,
        },
      ];
    },
  },
};
</script>
