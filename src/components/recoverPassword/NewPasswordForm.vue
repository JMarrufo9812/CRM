<template>
  <div class="d-flex" style="height:100%">
    <div style="width: 60%;">
      <v-card
        outlined
        tile
        color="#EBEBEB"
        style="margin-right: 5rem; margin-left: 5rem"
      >
        <v-card-title class="title-reset-password pb-12">
          Introduce tu nueva contraseña
        </v-card-title>
        <v-card-text>
          <v-form ref="formPassword" v-model="isValidate">
            <v-text-field
              v-model="newPassword"
              class="mb-4 input-password"
              hint="Al menos 8 carácteres. Combina letras y números."
              :persistent-hint="false"
              hide-details="auto"
              validate-on-blur
              :error-messages="isSamePassword"
              :rules="rules.password"
              :type="isShowNewPassword ? 'text' : 'password'"
              :append-icon="isShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="isShowNewPassword = !isShowNewPassword"
              @keydown.backspace="cleanErrors"
              label="Nueva contraseña"
              solo
              flat
            ></v-text-field>
            <v-text-field
              v-model="confirmNewPassword"
              class="mb-4 input-password"
              hide-details="auto"
              :rules="rules.isRequired"
              :type="isShowNewPassword ? 'text' : 'password'"
              :append-icon="isShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="isShowNewPassword = !isShowNewPassword"
              :error="verificationPassword"
              :error-messages="
                verificationPassword ? 'Las contraseñas no coinciden' : ''
              "
              label="Confirma nueva contraseña"
              solo
              flat
            ></v-text-field>
          </v-form>
          <v-card outlined color="#C4C4C4" tile width="70%">
            <v-card-text style="color: #ffffff">
              Por tu seguridad la contraseña debe incluir:
            </v-card-text>
          </v-card>
          <div class="d-flex my-10">
            <div style="margin-right:8em">
              <div>
                <v-icon small class="mb-1 mr-2" color="#C4C4C4">
                  mdi-brightness-1
                </v-icon>
                Una mayùscula
              </div>
              <div>
                <v-icon small class="mb-1 mr-2" color="#C4C4C4">
                  mdi-brightness-1
                </v-icon>
                Una minùscula
              </div>
            </div>
            <div>
              <div>
                <v-icon small class="mb-1 mr-2" color="#C4C4C4">
                  mdi-brightness-1
                </v-icon>
                Un numero
              </div>
              <div>
                <v-icon small class="mb-1 mr-2" color="#C4C4C4">
                  mdi-brightness-1
                </v-icon>
                8 caracteres minimo
              </div>
            </div>
          </div>
          <v-btn
            :loading="isLoadingUpdatePassword"
            class="mb-4"
            color="secondary"
            @click="outData"
          >
            Guardar
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div class="d-flex align-end justify-end white" style="width: 40%;">
      <v-img
        src="../../assets/images/horse-2.svg"
        style="max-height:90%; max-width: 70%"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  mixins: [rulesMixin],
  props: {
    isSamePassword: {
      isRequired: false,
      type: String,
    },
    isLoadingUpdatePassword: {
      isRequired: false,
      type: Boolean,
    },
  },
  data() {
    return {
      newPassword: '',
      confirmNewPassword: '',
      isShowNewPassword: false,
      errorPassword: false,
      isValidate: false,
    };
  },
  computed: {
    // verifica el password
    verificationPassword() {
      return this.confirmNewPassword !== this.newPassword;
    },
  },
  methods: {
    outData() {
      this.$refs.formPassword.validate();
      if (this.isValidate) {
        this.$emit('outData', this.newPassword);
      }
    },
    reset() {
      this.newPassword = '';
      this.confirmNewPassword = '';
      this.$refs.formPassword.reset();
      this.$refs.formPassword.resetValidation();
    },
    cleanErrors() {
      this.$emit('cleanError');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{  .title-reset-password, .input-password  } from  ../../../../scss/components/new.password.form';
</style>
