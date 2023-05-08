<template>
  <component
    @outData="updateUser"
    :info="error"
    :isUpdate="isUpdateData"
    :userEnterprise="userEnterprise"
    :is="dynamicComponent"
  ></component>
</template>

<script>
import {
  CONFIRM_USER,
  UPDATE_NEW_USER,
} from '@/graphql/mutations/authMutations';

export default {
  name: 'confirm',
  // componenetes que se switchearan en la vista
  components: {
    CompleteSignUpForm: () =>
      import('@/components/confirmUser/CompleteSignUpForm.vue'),
    WelcomeEnterprise: () =>
      import('@/components/confirmUser/WelcomeEnterprise.vue'),
    BaseError: () => import('@/components/ui/BaseError.vue'),
    BaseLoading: () => import('@/components/ui/BaseLoading.vue'),
  },
  data() {
    return {
      isUpdateData: false,
      // informacion del error que se mostrara
      error: {
        icon: '',
        tittle: '',
        message: '',
      },
      // guarda el comonenete que se mostrara
      type: '',
      // guarda el objeto que responde el servidor
      userEnterprise: {},
    };
  },
  computed: {
    // determina el componenete que se mostrara
    dynamicComponent() {
      switch (this.type) {
        // vista nuevo usuario
        case 'isNewUser':
          return 'CompleteSignUpForm';
        // vista usuario ya registrado
        case 'isOldUser':
          return 'WelcomeEnterprise';
        // vista otro error
        case 'isError':
          return 'BaseError';
        // vista de cargando
        default:
          return 'BaseLoading';
      }
    },
  },
  beforeMount() {
    // mutacion que se envia al server al entrar a link de invitacion
    this.$apollo
      .mutate({
        mutation: CONFIRM_USER,
        variables: {
          input: {
            token: this.$route.query.id,
          },
        },
        update: (store, { data: { confirmUser } }) => {
          // valida si el usuario es nuevo o ya esta registrado
          this.type = confirmUser.user.name ? 'isOldUser' : 'isNewUser';
          console.log(this.type);
          this.userEnterprise = confirmUser;
        },
      })
      .catch(({ graphQLErrors }) => {
        const isComming = graphQLErrors[0]?.statusCode === 401;
        this.type = 'isError';
        this.error = {
          icon: 'mdi-shield-alert-outline',
          tittle: isComming
            ? '¡Lo sentimos, el link ha expirado!'
            : '¡Lo sentimos, ha ocurrido un error de servidor!',
          message: isComming
            ? 'Pídele al administrador de la empresa que reenvíe la invitación a tu correo'
            : 'Contacte con soporte',
        };
      });
  },
  methods: {
    // actualiza el usuario nuevo
    updateUser({ password, name, lastName, phones }) {
      const input = {
        userEnterpriseId: this.userEnterprise.id,
        password,
        name,
        lastName,
      };
      if (phones.length > 0 && phones[0].number.length === 10) {
        input.phones = phones;
      }

      this.$apollo
        .mutate({
          mutation: UPDATE_NEW_USER,
          variables: {
            input,
          },
          update: () => {
            // monta mensaje de bienvenida
            this.type = 'isOldUser';
            this.isUpdateData = true;
          },
        })
        .catch(() => {
          this.error = {
            icon: 'mdi-shield-alert-outline',
            tittle: '¡Lo sentimos, ha ocurrido un error en el registro!',
            message: 'Contacte con soporte',
          };
          // monta vista de error
          this.type = 'isError';
        });
    },
  },
};
</script>
