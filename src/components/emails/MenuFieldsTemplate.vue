<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="80"
    offset-x
  >
    <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
      <v-tooltip top>
        <template v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }">
          <v-btn
            text
            icon
            v-bind="{ ...attrsMenu, ...attrsTooltip }"
            v-on="{ ...onMenu, ...onTooltip }"
          >
            <v-icon>mdi-text-box-plus-outline</v-icon>
          </v-btn>
        </template>
        <span>Añadir campos</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab class="primary--text">
          <v-icon>mdi-account-outline</v-icon>
        </v-tab>
        <v-tab class="primary--text">
          <v-icon>mdi-office-building</v-icon>
        </v-tab>
        <v-tab class="primary--text">
          <v-icon>mdi-currency-usd</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
        style="max-height: 300px"
        class="overflow-y-auto"
      >
        <v-tab-item :value="0">
          <v-list-item
            v-for="field in fieldsContact"
            :key="field.id"
            dense
            @click="sendField(field)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ field.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-tab-item>
        <v-tab-item :value="1">
          <v-list-item
            v-for="field in fieldsCompany"
            :key="field.id"
            dense
            @click="sendField(field)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ field.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-tab-item>
        <v-tab-item :value="2">
          <v-list-item
            v-for="field in fieldsDeal"
            :key="field.id"
            dense
            @click="sendField(field)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ field.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-menu>
</template>

<script>
import { GET_FORM_EMAIL } from '@/graphql/querys/formsQuery';

export default {
  name: 'MenuFieldsTemplate',
  data() {
    return {
      tab: 0,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      formContactExtend: [
        {
          id: 'firstName',
          label: 'Nombre',
        },
        {
          id: 'lastName',
          label: 'Apellido',
        },
      ],
      form: {
        formContact: {
          defaultForm: {
            inputs: [],
          },
          customForm: {
            inputs: [],
          },
        },
        formCompany: {
          defaultForm: {
            inputs: [],
          },
          customForm: {
            inputs: [],
          },
        },
        formDeal: {
          defaultForm: {
            inputs: [],
          },
          customForm: {
            inputs: [],
          },
        },
      },
    };
  },
  computed: {
    fieldsContact() {
      const inputs = [
        ...this.formContactExtend,
        ...this.form.formContact.defaultForm.inputs,
        ...(this.form.formContact.customForm.inputs
          ? this.form.formContact.customForm.inputs
          : []),
      ];
      return this.getInputs(inputs, 'contact');
    },
    fieldsCompany() {
      const inputs = [
        ...this.form.formCompany.defaultForm.inputs,
        ...(this.form.formCompany.customForm.inputs
          ? this.form.formCompany.customForm.inputs
          : []),
      ];
      const filterInputs = inputs.filter((input) => {
        return input.keyInput !== 'contacts';
      });
      return this.getInputs(filterInputs, 'company');
    },
    fieldsDeal() {
      const inputs = [
        ...this.form.formDeal.defaultForm.inputs,
        ...(this.form.formDeal.customForm.inputs
          ? this.form.formDeal.customForm.inputs
          : []),
      ];
      return this.getInputs(inputs, 'deal');
    },
  },
  methods: {
    sendField(field) {
      this.$emit('sendField', field);
    },
    getInputs(inputs, type) {
      return inputs.map(({ id, label, keyInput }) => {
        if (keyInput === 'name' && type === 'contact') {
          return {
            id,
            label: 'Nombre completo',
            keyInput: keyInput || id,
            type,
          };
        }
        return { id, label, keyInput: keyInput || id, type };
      });
    },
  },
  apollo: {
    form: {
      query: GET_FORM_EMAIL,
      update(data) {
        return {
          formContact: data.formContact,
          formCompany: data.formCompany,
          formDeal: data.formDeal,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
