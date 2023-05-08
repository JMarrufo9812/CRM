<template>
  <v-row>
    <!-- <v-col v-if="field.value.length === 0" cols="12">
      <v-btn @click="addPhone" x-small>Agregar nuevo</v-btn>
    </v-col> -->
    <v-col cols="12" v-for="(phone, index) in field.value" :key="index">
      <v-text-field
        v-model="phone.number"
        :rules="rules.phoneNumber"
        outlined
        type="tel"
        hide-details="auto"
        dense
        v-mask="'##########'"
      >
        <template slot="append-outer" v-if="index === 0">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                color="success"
                @click="addPhone"
                :disabled="field.value.length > 2"
              >
                mdi-phone-plus
              </v-icon>
            </template>
            <span>Agregar otro teléfono</span>
          </v-tooltip>
        </template>
        <template slot="append-outer" v-else>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                color="primary"
                @click="deletePhone(index)"
              >
                mdi-minus-circle
              </v-icon>
            </template>
            <span>Quitar teléfono</span>
          </v-tooltip>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldPhonesEdit',
  mixins: [rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
      default: () => {
        return [{ value: '' }];
      },
    },
  },
  mounted() {
    if (this.field.value.length === 0) this.addPhone();
  },
  methods: {
    // Add phones
    addPhone() {
      if (this.field.value.length < 3) {
        this.field.value.push({ number: '' });
      }
    },
    // Delete phones by index
    deletePhone(id) {
      this.field.value.splice(id, 1);
    },
  },
};
</script>
