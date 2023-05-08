<template>
  <v-form ref="formBilling" v-model="isValidate">
    <v-card>
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="12">
            <h2 class="text-center">Datos de facturación</h2>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
            <h3>Contacto de facturación</h3>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Nombre completo"
              outlined
              v-model="customer.name"
              :rules="rules.text"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Nombre de la empresa"
              outlined
              v-model="customer.address.line1"
              :rules="rules.general"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Correo electrónico"
              outlined
              v-model="customer.email"
              type="email"
              :rules="rules.email"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Teléfono"
              type="tel"
              outlined
              v-model.number="customer.phone"
              :rules="rules.phoneNumber"
              v-mask="'##########'"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="justify-center">
          <v-col cols="12">
            <h3>Dirección de facturación</h3>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              :items="this.listCountries"
              :filter="customFilterCountry"
              item-text="country"
              item-value="abbreviation"
              v-model="customer.address.country"
              label="País"
              outlined
              :rules="rules.select"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Calle y número"
              outlined
              v-model="customer.address.line2"
              :rules="rules.address"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Ciudad"
              outlined
              v-model="customer.address.city"
              :rules="rules.text"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Estado"
              outlined
              v-model="customer.address.state"
              :rules="rules.text"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Código postal"
              outlined
              v-model="customer.address.postal_code"
              :rules="
                customer.address.country === 'MX'
                  ? rules.codePostalMX
                  : rules.codePostal
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="justify-center">
          <v-col cols="12">
            <h3>Método de pago</h3>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Nombre completo del titular"
              outlined
              v-model="card.fullname"
              :rules="rules.text"
              counter="50"
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <CreditCard
              ref="elementsRef"
              :pk="publishableKey"
              locale="es"
              @token="tokenCreated"
              @loading="loading = $event"
            ></CreditCard>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center pb-5">
        <v-btn large color="success" @click="submit">
          Revisar compra
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { CREATE_CUSTOMER } from '@/graphql/mutations/customersMutations';
// Components
import { countries } from '@/components/billing/countries';
import CreditCard from '@/components/billing/CreditCard.vue';
// Mixins
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'BillingDetails',
  mixins: [rulesMixin],
  components: {
    CreditCard,
  },
  data: () => ({
    listCountries: [],
    loading: false,
    // Validation form
    isValidate: true,
    // API PUBLIC KEY
    publishableKey: process.env.VUE_APP_PUBLISHABLE_KEY,
    // Customer data
    customer: {
      name: '',
      email: '',
      phone: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
      },
      tokenCard: '',
    },
    card: {
      fullname: '',
    },
  }),
  mounted() {
    // Assign countries to use
    this.listCountries = countries;
  },
  methods: {
    // Search country select
    customFilterCountry({ country, abbreviation }, queryText) {
      return (
        country.toLowerCase().indexOf(queryText.toLowerCase()) > -1 ||
        abbreviation.toLowerCase().indexOf(queryText.toLowerCase()) > -1
      );
    },
    // Validations
    submit() {
      this.$refs.formBilling.validate();
      if (this.isValidate) {
        this.$refs.elementsRef.submit();
      }
    },
    // Create token and send data
    tokenCreated(token) {
      this.customer.tokenCard = token.id;
      this.createCustomer();
      this.$emit('nextStep', this.customer);
    },
    createCustomer() {
      this.$apollo
        .mutate({
          // Query
          mutation: CREATE_CUSTOMER,
          // Parameters
          variables: {
            customerInput: {
              name: this.customer.name,
              email: this.customer.email,
              phone: this.customer.phone,
              tokenCard: this.customer.tokenCard,
              address: {
                line1: this.customer.address.line1,
                line2: this.customer.address.line2,
                city: this.customer.address.city,
                country: this.customer.address.country,
                postal_code: this.customer.address.postal_code,
              },
            },
          },
        })
        .then(() => {
          // Result
          // console.log(data);
        })
        .catch(() => {
          // Error
          // console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.StripeElement[data-v-02a0436f] {
  border-color: black;
}
</style>
