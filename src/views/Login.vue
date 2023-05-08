<template>
  <div style="height: 100%;">
    <div class="d-flex justify-center align-center" style="height: 90%;">
      <v-card outlined tile width="460" height="530">
        <v-alert
          v-show="showAlert"
          :value="!!showAlert"
          type="success"
          transition="scale-transition"
          text
          dense
          outlined
        >
          Tu cuenta ha sido creada exitósamente.
        </v-alert>
        <v-card-title class="font-weight-bold justify-center pt-12">
          <p>
            Ingresar
          </p>
        </v-card-title>
        <v-card-subtitle
          v-show="isError"
          class="red--text font-weight-black mt-2 pb-0 text-center"
        >
          <v-icon class="red--text pb-2">mdi-account-alert-outline</v-icon>
          Usuario o contraseña incorrecta
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-col cols="12" align="center">
              <v-text-field
                v-model="user.email"
                id="email"
                class="input-width-70"
                hide-details="auto"
                label="Correo"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" align="center">
              <v-text-field
                v-model="user.password"
                id="password"
                :type="isShowPassword ? 'text' : 'password'"
                :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="isShowPassword = !isShowPassword"
                outlined
                class="input-width-70"
                label="Contraseña"
                required
                @keydown.enter="loginAction"
              ></v-text-field>
            </v-col>
            <v-col cols="12" align="center" clas="pt-0">
              <v-btn
                :loading="isLoading"
                large
                @click="loginAction"
                color="secondary"
                dark
                tile
              >
                Entrar
              </v-btn>
            </v-col>
          </v-form>
        </v-card-text>
        <p class="text-center">
          ¿No tienes una cuenta?
          <v-btn class="button" text color="secondary" @click="openModalSignUp">
            Regístrate
          </v-btn>
        </p>
        <p class="text-center">
          <a
            class="secondary--text"
            @click="$router.push('/login/forgot-password')"
          >
            Olvidé mi contraseña
          </a>
        </p>
      </v-card>
    </div>
    <div class="d-flex justify-start align-end" style=" height: 10%;">
      <v-img
        src="../assets/images/horse.svg"
        max-height="150"
        max-width="150"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { loginMixin } from '@/mixins/loginMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { modalMethodsMixin } from '@/mixins/modalsMixin';

export default {
  mixins: [loginMixin, modalsAlertsMixin, modalMethodsMixin],
  data() {
    return {
      isError: false,
      isShowPassword: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    showAlert() {
      return this?.$route?.query?.signup;
    },
  },
  watch: {
    showAlert: {
      handler(isShow) {
        if (isShow) {
          setTimeout(() => {
            this.$router.push({ name: 'login' });
          }, 5000);
        }
      },
      immediate: true,
    },
  },
  methods: {
    openModalSignUp() {
      this.changeModal({
        id: 'signUp',
        status: true,
      });
    },
    loginAction() {
      this.login(this.user.email, this.user.password);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .input-width-70 } from ../../../scss/components/input';
</style>
