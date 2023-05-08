<template>
  <component
    @outData="updatePassword"
    @cleanError="cleanError"
    :isLoadingUpdatePassword="isLoadingUpdatePassword"
    :info="error"
    :isSamePassword="isSamePassword"
    :is="dynamicComponent"
  ></component>
</template>

<script>
import {
  CONFIRM_RECOVER_PASSWORD,
  SET_NEW_PASSWORD,
} from '@/graphql/mutations/passwordMutations';

export default {
  name: 'ResetPassword',
  components: {
    SucessSetPassword: () =>
      import('@/components/recoverPassword/SucessSetPassword.vue'),
    BaseError: () => import('@/components/ui/BaseError.vue'),
    BaseLoading: () => import('@/components/ui/BaseLoading.vue'),
    NewPasswordForm: () =>
      import('@/components/recoverPassword/NewPasswordForm.vue'),
  },
  data() {
    return {
      isUpdatePassword: false,
      isLoadingUpdatePassword: false,
      isSamePassword: '',
      // informacion del error que se mostrara
      error: {
        icon: '',
        tittle: '',
        message: '',
      },
      // guarda el comonenete que se mostrara
      type: '',
      // guarda el objeto que responde el servidor
      userId: '',
    };
  },
  beforeMount() {
    if (this.$route.query.id) {
      this.$apollo
        .mutate({
          mutation: CONFIRM_RECOVER_PASSWORD,
          variables: {
            input: {
              token: this.$route.query.id,
            },
          },
          update: (store, { data: { confirmRecoverPasswordUser } }) => {
            this.userId = confirmRecoverPasswordUser.id;
            this.type = 'isValidToken';
          },
        })
        .catch(({ graphQLErrors }) => {
          this.type = 'isError';
          const status = graphQLErrors[0]?.statusCode;
          this.errorHandler(status);
        });
    } else {
      this.type = 'isError';
      this.errorHandler();
    }
  },
  computed: {
    dynamicComponent() {
      switch (this.type) {
        // vista nuevo usuario
        case 'isValidToken':
          return 'NewPasswordForm';
        case 'isError':
          return 'BaseError';
        case 'isUpdatePassword':
          return 'SucessSetPassword';
        // vista de cargando
        default:
          return 'BaseLoading';
      }
    },
  },
  methods: {
    updatePassword(newPassword) {
      this.isLoadingUpdatePassword = true;
      this.$apollo
        .mutate({
          mutation: SET_NEW_PASSWORD,
          variables: {
            input: {
              id: this.userId,
              password: newPassword,
            },
          },
        })
        .then(
          ({
            data: {
              setNewPasswordUser: { status, message },
            },
          }) => {
            if (status === 200 && !message.success)
              this.isSamePassword =
                'La contraseña no puede ser igual a la anterior';
            if (status === 200 && message.success)
              this.type = 'isUpdatePassword';
            else this.errorHandler(status);
            this.isLoadingUpdatePassword = false;
          },
        )
        .catch(({ graphQLErrors }) => {
          const [{ statusCode }] = graphQLErrors;
          this.errorHandler(statusCode);
          this.isLoadingUpdatePassword = false;
        });
    },
    errorHandler(type) {
      switch (type) {
        case 400:
          this.error = {
            icon: 'mdi-shield-alert-outline',
            tittle: '¡Lo sentimos, el enlace ha expirado!',
            message: 'Reenvia el correo para poder cambiar tu contraseña',
          };
          break;
        case 401:
          this.error = {
            icon: 'mdi-shield-alert-outline',
            tittle: '¡Lo sentimos, el enlace ha expirado!',
            message: 'Reenvia el correo para poder cambiar tu contraseña',
          };
          break;
        case 404:
          this.error = {
            icon: 'mdi-shield-alert-outline',
            tittle: 'El usuario no existe',
            message:
              'Es posible que el usuario que estar tratando de actualizar ya no se encuentre activo',
          };
          break;
        case 500:
          this.error = {
            icon: 'mdi-shield-alert-outline',
            tittle: 'La contraseña no se ha podido actualizar',
            message:
              'Ha ocurrido un error de servidor intente de nuevo mas tarde o contacte a soporte',
          };
          break;
        default:
          this.error = {
            icon: 'mdi-shield-alert-outline',
            tittle: '¡Lo sentimos, ha ocurrido un error desconocido!',
            message: 'Contacte con soporte',
          };
          break;
      }
    },
    cleanError() {
      this.isSamePassword = '';
    },
  },
};
</script>
