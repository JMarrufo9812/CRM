<template>
  <div>
    <v-card class="mb-6" tile outlined width="35em" height="25em">
      <div class="d-flex justify-space-between align-center primary py-4 px-8">
        <span class="white--text title-eneterprise-settings">
          Mis cuentas
        </span>
        <v-btn
          small
          color="secondary"
          dark
          fab
          depressed
          @click="isOpenModal = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div class="header-enterprises py-4 pl-8">
        Nombre de la empresa
      </div>
      <div class="d-flex justify-center" v-if="isLoadingChangeAccount">
        <v-progress-circular
          :size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <v-alert v-if="error" type="error">
        Ha ocurrido un error interno
      </v-alert>
      <v-card
        v-if="!error && !isLoadingChangeAccount"
        flat
        class="scroll"
        height="70%"
      >
        <v-card
          v-for="enterprise in userCurrent.enterprises"
          :key="enterprise.id"
          flat
          height="6em"
          class="d-flex justify-space-between enterprise-box align-center pl-8"
          :class="{
            'enterprise-selected': enterprise.id === userCurrent.enterprise.id,
          }"
          @click="goEnterprise(enterprise)"
        >
          <span class="enterprise-name">
            {{ enterprise.name }}
          </span>
          <div>
            <v-chip
              v-if="
                enterprise.userEnterpriseId === userCurrent.defaultEnterprise
              "
              class="ma-2"
              color="green"
              small
              text-color="white"
            >
              Principal
            </v-chip>
            <v-chip
              v-if="enterprise.isActive === 'PENDING'"
              class="ma-2"
              color="warning"
              small
              text-color="white"
            >
              Invitación pendiente
            </v-chip>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="
                    enterprise.isActive !== 'PENDING' &&
                      enterprise.userEnterpriseId ===
                        userCurrent.defaultEnterprise
                  "
                  class="mr-4"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  dense
                  v-if="
                    enterprise.userEnterpriseId !==
                      userCurrent.defaultEnterprise &&
                      enterprise.isActive !== 'PENDING'
                  "
                  @click="
                    changeDefaultEnterprise(
                      enterprise.id,
                      enterprise.userEnterpriseId,
                    )
                  "
                >
                  <v-list-item-title>
                    Marcar como principal
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="enterprise.isActive === 'PENDING'"
                  @click="confirmEnterprise(enterprise)"
                  dense
                >
                  <v-list-item-title>
                    Aceptar invitacion
                  </v-list-item-title>
                </v-list-item>
                <!-- <v-list-item dense disabled>
                  <v-list-item-title>
                    Eliminar empresa
                    <b>
                      (proximamente)
                    </b>
                  </v-list-item-title>
                </v-list-item> -->
              </v-list>
            </v-menu>
          </div>
        </v-card>
      </v-card>
    </v-card>
    <v-card
      tile
      class="d-flex justify-center align-center"
      outlined
      height="4em"
      width="35em"
    >
      <p class="ma-0 text-note-enterprise">
        <span class="secondary--text">
          Nota:
        </span>
        <span>
          La cuenta
        </span>
        <b class="secondary--text">principal</b>
        es la que se abre cuando inicias sesión.
      </p>
    </v-card>
    <EnterpriseModal :isOpenModal.sync="isOpenModal"></EnterpriseModal>
    <BaseModalAlert
      :modalHandler="modalAlert"
      :cancel="false"
      @confirm="modalHandlerAlert"
    ></BaseModalAlert>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </div>
</template>
<script>
// Components
import EnterpriseModal from '@/components/enterprises/EnterpriseModal.vue';
// Querys
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { TOKEN } from '@/constants/settings';
// Mixins
import {
  LOGIN_CHANGE_USER_ENTERPRISE,
  CONFIRM_ENTERPRISE,
} from '@/graphql/mutations/authMutations';
import { UPDATE_ENTERPRISE_DEFAULT } from '@/graphql/mutations/enterprisesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'Enterprises',
  components: {
    EnterpriseModal,
  },
  mixins: [modalsAlertsMixin],
  data() {
    return {
      isLoadingDefault: false,
      isLoadingChangeAccount: false,
      userCurrent: {},
      // Modal
      isOpenModal: false,
      // Error if Querys is wrong or exists error in the server
      error: false,
      headers: [
        {
          text: 'Nombre de la empresa',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: '',
          align: 'end',
          sortable: false,
          value: 'action',
        },
      ],
      footerProps: {
        itemsPerPageOptions: [5, 10, 25, { text: 'Todos', value: -1 }],
        itemsPerPageText: 'Filas por página',
      },
    };
  },
  methods: {
    confirmEnterprise({ id }) {
      this.isLoadingChangeAccount = true;
      this.$apollo
        .mutate({
          mutation: CONFIRM_ENTERPRISE,
          variables: {
            enterpriseId: id,
          },
        })
        .then(({ data: { confirmEnterprise } }) => {
          this.userCurrent.enterprises = this.userCurrent.enterprises.map(
            (enterprise) => {
              if (enterprise.id === confirmEnterprise) {
                // eslint-disable-next-line
                enterprise.isActive = 'ACTIVE';
              }
              return enterprise;
            },
          );
          this.$apollo.queries.userCurrent.refetch();
          this.isLoadingChangeAccount = false;
        })
        .catch(() => {
          this.isLoadingChangeAccount = false;
          const error =
            'No se ha podido aceptar la  invitación  intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    rowClass() {
      const rowClass = 'rowItem';
      return rowClass;
    },
    changeDefaultEnterprise(id, userEnterpriseId) {
      this.isLoadingDefault = true;
      this.$apollo
        .mutate({
          mutation: UPDATE_ENTERPRISE_DEFAULT,
          variables: {
            enterpriseId: id,
          },
          update: (store, { data: { updateEnterpriseDefault } }) => {
            if (updateEnterpriseDefault) {
              // Get data with ID user current
              const data = store.readQuery({
                query: GET_USER_LOGGED,
              });
              // Push result
              data.userCurrent.defaultEnterprise = userEnterpriseId;
              // Write in Store the result data
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(() => {
          this.isLoadingDefault = false;
        })
        .catch(() => {
          this.isLoadingDefault = false;
        });
    },
    goEnterprise({ id, isActive }) {
      if (isActive !== 'PENDING') {
        if (id !== this.userCurrent.enterprise.id) {
          this.isLoadingChangeAccount = true;
          this.$apollo
            .mutate({
              mutation: LOGIN_CHANGE_USER_ENTERPRISE,
              variables: {
                id,
              },
            })
            .then(
              async ({
                data: {
                  loginChangeUserEnterprise: {
                    token,
                    userEnterprise: {
                      role: { type },
                    },
                  },
                },
              }) => {
                localStorage.setItem(TOKEN, token);
                const reset = await this.$apollo.provider.defaultClient.resetStore();

                if (reset) {
                  if (type === 'ADMIN')
                    return this.$router.push({ name: 'dashboards' }, () => {
                      this.isLoadingChangeAccount = false;
                    });
                  return this.$router.push('/', () => {
                    this.isLoadingChangeAccount = false;
                  });
                }
                this.isLoadingChangeAccount = false;
                return null;
              },
            )
            .catch(({ graphQLErrors }) => {
              graphQLErrors.forEach((error) => {
                if (error.statusCode === 401) {
                  console.log('No autorizado - Cerrar sesión');
                }
              });
              this.isError = true;
              this.isLoadingChangeAccount = false;
            });
        }
      } else {
        this.modalHandlerAlert({
          isOpen: true,
          isLoading: false,
          message: {
            title: 'Acepta la invitación para ir a la empresa',
            text:
              'Es necesario que aceptes la invitación para que puedas acceder a la empresa hazlo desde este apartado o entrando a tu correo y aceptando la invitación',
          },
          info: {},
        });
      }
    },
  },
  apollo: {
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .header-enterprises, .title-eneterprise-settings, .enterprise-box, .enterprise-name, .enterprise-selected, .text-note-enterprise} from ../../../../scss/components/enterprises';

.scroll {
  overflow-y: scroll;
}
</style>
