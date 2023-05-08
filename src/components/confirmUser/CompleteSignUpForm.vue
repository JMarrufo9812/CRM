<template>
  <v-row justify="center" no-gutters class="px-12">
    <v-col cols="12" class="py-12" align="center">
      <p class="text-center text-h4">
        ¡Bienvenido a {{ userEnterprise.enterprise.name }}!
      </p>
      <p class="text-center">
        Antes de formar parte del equipo necesitamos unos datos para continuar
      </p>
    </v-col>
    <v-card outlined width="480">
      <v-card-title class="primary white--text">
        Completa tu registro
      </v-card-title>
      <v-card-text class="mt-10">
        <v-form ref="formUser" v-model="isValidate">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="user.name"
                :rules="[...rules.general, ...rules.text]"
                outlined
                label="Nombre(s)"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="user.lastName"
                :rules="[...rules.general, ...rules.text]"
                outlined
                label="Apellido(s)"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.password"
                outlined
                :rules="[...rules.password, ...rules.isRequired]"
                :type="isShowPassword ? 'text' : 'password'"
                :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="isShowPassword = !isShowPassword"
                label="Contraseña"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                :error="verificationPassword"
                :error-messages="
                  verificationPassword ? 'Las contraseñas no coinciden' : ''
                "
                :rules="[...rules.password, ...rules.isRequired]"
                :type="isShowConfirmPassword ? 'text' : 'password'"
                :append-icon="isShowConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="isShowConfirmPassword = !isShowConfirmPassword"
                outlined
                label="Confirmar contraseña"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-for="(phone, index) in user.phones" :key="`${index}-phone`">
            <v-col cols="12" md="8">
              <v-text-field
                :rules="rules.phoneNumber"
                v-model="phone.number"
                type="tel"
                counter="10"
                maxlength="10"
                outlined
                required
                :label="
                  user.phones.length > 1 ? `Teléfono ${index + 1}` : 'Teléfono'
                "
                v-mask="'##########'"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col class="ml-2 ml-md-0 mt-md-2" cols="12" md="4" align="center">
              <v-btn
                @click="addNewPhoneUser"
                outlined
                tile
                v-if="index === 0"
                :disabled="user.phones.length >= 3"
              >
                <v-icon class="mr-2">mdi-phone-plus-outline</v-icon>
              </v-btn>
              <v-btn
                v-else
                @click="deletePhoneUser(index)"
                outlined
                tile
                color="error"
              >
                <v-icon class="mr-2">mdi-phone-minus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-col align="end">
          <v-btn
            :loading="loading"
            @click="outData"
            x-large
            tile
            normal
            color="secondary"
          >
            <v-icon class="mr-2">mdi-account-arrow-right-outline</v-icon>
            Iniciar
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'CompleteSignUpForm',
  mixins: [rulesMixin],
  props: {
    isUpdate: {
      required: true,
      type: Boolean,
    },
    userEnterprise: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      // valida el formulario
      isValidate: true,
      // cambia el estado de cargando del boton
      loading: false,
      // activa el ver contraseña
      isShowPassword: false,
      isShowConfirmPassword: false,
      // guarda una copia del password
      confirmPassword: '',
      // objeto que se enviara
      user: {
        password: '',
        name: '',
        lastName: '',
        phones: [{ number: '' }],
      },
    };
  },
  watch: {
    isUpdatePassword(value) {
      if (value) this.reset();
    },
  },
  computed: {
    // verifica el password
    verificationPassword() {
      return this.confirmPassword !== this.user.password;
    },
  },
  methods: {
    addNewPhoneUser() {
      if (this.user.phones.length >= 3) return;
      this.user.phones.push({ number: '' });
    },
    deletePhoneUser(index) {
      this.user.phones.splice(index, 1);
    },
    // emite el user al componenete padre
    outData() {
      this.$refs.formUser.validate();
      if (this.isValidate) {
        this.loading = true;
        const register = JSON.parse(JSON.stringify(this.user));
        this.$emit('outData', register);
      }
    },
    // resetea valores y validaciones
    reset() {
      this.user = {
        password: '',
        name: '',
        lastName: '',
        phones: [],
      };
      this.$refs.formUser.reset();
      this.$refs.formUser.resetValidation();
    },
  },
};
</script>
