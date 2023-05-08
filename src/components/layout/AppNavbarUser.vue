<template>
  <div>
    <v-app-bar app color="primary" flat class="px-6">
      <div class="d-flex">
        <v-toolbar-title @click="pushHome" class="select-class">
          <v-img
            src="../../assets/images/CERVUS-LOGO.png"
            max-height="50"
            max-width="90"
            contain
            class="mr-12"
          ></v-img>
        </v-toolbar-title>

        <template v-for="item in menu">
          <v-btn
            link
            plain
            :key="item.text"
            :to="item.href"
            class="mr-2"
            color="white"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </v-btn>
        </template>
      </div>
      <v-spacer></v-spacer>
      <div>
        <!-- menu de notificaciones -->
        <v-menu
          :close-on-content-click="true"
          min-width="500"
          :max-width="500"
          offset-y
          left
          nudge-left="10"
          @input="resetNotifications"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" v-bind="attrs" v-on="on">
              <v-badge
                :content="notifications.totalUnread"
                :value="notifications.totalUnread"
                color="green"
                overlap
              >
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <MenuNotifications
            :notifications="notifications"
            @updateNotifications="updateNotifications"
            @goToSection="goToSection"
          >
            <template v-slot:moreButton>
              <div v-if="moreNotifications" class="d-flex">
                <v-btn
                  @click.stop="showMoreNotifications"
                  :loading="isLoadingMoreNotifications"
                  small
                  text
                  block
                >
                  Ver mas
                </v-btn>
              </div>
            </template>
          </MenuNotifications>
        </v-menu>
        <!-- menu de perfil -->
        <v-menu
          left
          bottom
          min-width="240"
          offset-y
          nudge-bottom="10"
          transition="slide-y-transition"
          tile
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar color="secondary" v-bind="attrs" v-on="on" :size="40">
              <v-img
                v-if="userCurrent.profileUrl !== null && !errorImage"
                :src="userCurrent.profileUrl"
                @error="catchErrorImage"
              />
              <span v-else class="white--text">{{ nameAccount || '' }}</span>
            </v-avatar>
          </template>
          <v-card>
            <div class="d-flex justify-center pt-4 pb-2">
              <v-avatar color="secondary" :size="36">
                <img
                  v-if="userCurrent.profileUrl !== null && !errorImage"
                  :src="userCurrent.profileUrl"
                  @error="catchErrorImage"
                />
                <span v-else class="white--text">{{ nameAccount || '' }}</span>
              </v-avatar>
            </div>
            <div class="d-flex justify-center">
              <span class="user-name">{{ fullName || '' }}</span>
            </div>
            <div class="d-flex justify-center pb-2">
              <span class="user-enterprise">
                {{ userCurrent.enterprise ? userCurrent.enterprise.name : '' }}
              </span>
            </div>
            <v-divider></v-divider>
            <v-list dense width="auto">
              <v-list-item
                v-for="enterprise in enterprises"
                :key="enterprise.id"
                class="d-flex jusitfy-center pl-9"
                :disabled="enterprise.isActive === 'PENDING'"
                @click="
                  enterprise.isActive === 'PENDING'
                    ? ''
                    : goEnterprise(enterprise.id)
                "
              >
                <v-avatar
                  :color="
                    enterprise.isActive !== 'PENDING' ? 'primary' : 'warning'
                  "
                  :size="25"
                  class="mr-2"
                >
                  <v-icon small class="white--text">mdi-domain</v-icon>
                </v-avatar>
                <div class="d-flex flex-column">
                  <span
                    :class="
                      enterprise.isActive === 'PENDING'
                        ? 'title-confirmation'
                        : 'user-settings'
                    "
                  >
                    {{ enterprise.name }}
                  </span>
                  <span
                    v-if="enterprise.isActive === 'PENDING'"
                    class="text-confirmation"
                  >
                    (En espera de confirmacion)
                  </span>
                </div>
              </v-list-item>

              <v-list-item
                @click="pushToConfigEnterprises"
                class="d-flex jusitfy-center pl-10"
              >
                <v-icon color="#9D9D9E" class="mr-2" small>
                  mdi-office-building
                </v-icon>
                <span class="user-settings">Gestion de cuentas</span>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                v-if="$can(USER_MANAGEMENT, PERMISSIONS_ADMIN)"
                to="/users"
                class="d-flex jusitfy-center pl-10"
              >
                <v-icon color="#9D9D9E" class="mr-2" small>
                  mdi-account-edit
                </v-icon>
                <span class="user-settings">Gestión de usuarios</span>
              </v-list-item>
              <template v-for="item in userMenu">
                <v-list-item
                  :key="item.text"
                  :to="item.href"
                  v-if="!item.disabled"
                  class="d-flex jusitfy-center pl-10"
                >
                  <v-icon
                    color="#9D9D9E"
                    class="mr-2"
                    small
                    :disabled="item.disabled"
                  >
                    {{ item.icon }}
                  </v-icon>
                  <span class="user-settings">
                    {{ item.text }}
                  </span>
                </v-list-item>
              </template>
              <v-divider></v-divider>
              <v-list-item
                class="d-flex jusitfy-center pl-10 mt-2"
                @click="logout"
              >
                <v-icon color="secondary" class="mr-2" small>mdi-logout</v-icon>
                <span class="user-name">Cerrar sesión</span>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      <ModalActivityGeneral
        :modalHandler="modalActivity"
        @close="modalHandlerActivity"
      />
    </v-app-bar>
  </div>
</template>

<script>
import {
  LOGOUT,
  LOGIN_CHANGE_USER_ENTERPRISE,
} from '@/graphql/mutations/authMutations';
import { TOKEN } from '@/constants/settings';
import {
  UPDATE_LOGIN_CONTROL,
  // UPDATE_LOADING_CONTROL,
} from '@/graphql/local-state/mutations';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { GET_FIRST_PIPELINE } from '@/graphql/querys/pipelinesQuery';
import { PERMISSIONS_ADMIN } from '@/constants/permissions';
import { USER_MANAGEMENT } from '@/constants/methods';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_NOTIFICATIONS } from '@/graphql/querys/notificationsQuery';
import { UPDATE_NOTIFICATIONS } from '@/graphql/mutations/notificationsMutations';
import { NOTIFICATIONS_SUBSCRIPTION } from '@/graphql/subscriptions/notificationsSubscriptions';
import notification from '@/assets/songs/notification.mp3';

export default {
  name: 'AppNavbarUser',
  mixins: [modalsAlertsMixin],
  components: {
    MenuNotifications: () =>
      import('@/components/notifications/MenuNotifications.vue'),
    ModalActivityGeneral: () =>
      import('@/components/activities/ModalActivityGeneral.vue'),
  },
  data() {
    return {
      PERMISSIONS_ADMIN,
      USER_MANAGEMENT,
      errorImage: false,
      userCurrent: {},
      messages: 1,
      show: false,
      isLoadingMoreNotifications: false,
      userMenu: [
        {
          icon: 'mdi-cog-outline',
          text: 'Configuraciones',
          disabled: false,
          href: '/settings',
        },
      ],
      notifications: {
        flow: [],
      },
      modalActivity: {
        isOpen: false,
        isLoading: false,
        info: {},
      },
      filters: {
        start: 0,
        take: 5,
        orderBy: 'DESC',
      },
    };
  },
  computed: {
    getRoutePipeline() {
      if (this.$route.fullPath && this.isPipelineRoute)
        return this.$route.fullPath;
      return '/pipeline';
    },
    isPipelineRoute() {
      return this.$route.matched.some((route) => {
        return route.name === 'pipeline-id';
      });
    },
    menu() {
      return [
        {
          text: 'Reportes',
          disabled: false,
          href: '/dashboards',
        },
        {
          text: 'Tratos',
          disabled: false,
          href: this.getRoutePipeline,
        },
        {
          text: 'Contactos',
          disabled: false,
          href: '/contacts',
        },
        {
          text: 'Empresas',
          disabled: false,
          href: '/companies',
        },
        {
          text: 'Actividades',
          disabled: false,
          href: '/activities',
        },
        {
          text: 'Correo',
          disabled: false,
          href: '/email/inbox',
        },
      ];
    },
    nameAccount() {
      if (!this.userCurrent?.user?.name && !this.userCurrent?.user?.lastName)
        return 'SN';
      return `${this.userCurrent.user.name
        .charAt(0)
        .toUpperCase()}${this.userCurrent.user.lastName
        .charAt(0)
        .toUpperCase()}`;
    },
    fullName() {
      if (!this.userCurrent?.user?.name && !this.userCurrent?.user?.lastName)
        return 'Sin nombre';
      return `${this.userCurrent.user.name} ${this.userCurrent.user.lastName}`;
    },
    moreNotifications() {
      if (this.notifications.flow.length === this.notifications.totalFlow) {
        return false;
      }
      return true;
    },
    enterprises() {
      return this.userCurrent.enterprises.filter(
        (enterprise) => enterprise.id !== this.userCurrent.enterprise.id,
      );
    },
  },
  methods: {
    pushHome() {
      if (this.userCurrent.typeUser === 'ADMIN') {
        this.$router
          .push({
            name: 'dashboards',
          })
          .catch(() => {});
      } else {
        this.$router
          .push({
            name: 'pipeline',
          })
          .catch(() => {});
      }
    },
    catchErrorImage(error) {
      if (error) this.errorImage = true;
    },
    logout() {
      this.$apollo
        .mutate({
          mutation: LOGOUT,
        })
        .then(async () => {
          await this.$apollo
            .mutate({
              mutation: UPDATE_LOGIN_CONTROL,
              variables: { isLogged: false },
            })
            .then(() => {
              localStorage.removeItem(TOKEN);
              this.$router.push({ name: 'login' }, () => {
                this.$apollo.provider.defaultClient.resetStore();
              });
            });
        })
        .catch(() => {
          const error =
            'No se pudo cerrar sesión, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    pushUrl(item) {
      this.$router.push({ path: item.href }, () => {});
    },
    pushToConfigEnterprises() {
      if (this.$route.name !== 'enterprises') {
        this.$router.push({ name: 'enterprises' }, () => {});
      }
    },
    playSoundNotification() {
      const audio = new Audio(notification);
      audio.play();
    },
    async updateNotifications() {
      return this.$apollo.queries.notifications.refetch();
    },
    async showMoreNotifications() {
      this.isLoadingMoreNotifications = true;
      // eslint-disable-next-line
      this.filters.take = this.filters.take + 5;
      await this.updateNotifications();
      const existDontReadNotifications = this.notifications.flow.some(
        ({ isView }) => !isView,
      );
      if (existDontReadNotifications) {
        const noReadNotifications = this.notifications.flow.filter(
          ({ isView }) => !isView,
        );
        const notifications = noReadNotifications.map((notif) => {
          // eslint-disable-next-line
          notif.isView = true;
          return notif;
        });
        this.updateShowNotifications(notifications);
      }
      this.isLoadingMoreNotifications = false;
    },
    resetNotifications(menuStatus) {
      if (!menuStatus) {
        this.filters.take = 5;
        this.updateNotifications();
      } else if (this.notifications.flow) {
        const updateNotifications = this.notifications.flow.map((not) => {
          // eslint-disable-next-line
          not.isView = true;
          return not;
        });
        this.updateShowNotifications(updateNotifications);
      }
    },
    updateShowNotifications(notifications) {
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTIFICATIONS,
          variables: {
            input: notifications,
          },
        })
        .then(() => {
          this.updateNotifications();
        })
        .catch(({ graphQLErrors }) => {
          console.log('update notifications', graphQLErrors[0]);
          this.modalHandlerError({
            isOpen: true,
            error:
              'No se pudo actualizar las notificaciones, intente de nuevo o contacte a soporte',
          });
        });
    },
    modalHandlerActivity({ isOpen, isLoading, info }) {
      this.modalActivity = { isOpen, isLoading, info };
    },
    getTypeImport(id) {
      const getType = this.notifications.imports.find((not) => not.id === id);
      if (getType.table === 'CONTACT') {
        return 'contacts';
      }
      if (getType.table === 'COMPANY') {
        return 'companies';
      }
      if (getType.table === 'DEAL') {
        return 'deals';
      }
      return 'contacts';
    },
    async goToSection(notificationSelected) {
      const { to, type, from } = notificationSelected;
      // console.log(notificationSelected);
      if (type === 'IMPORT') {
        if (
          this.$route.path !==
          `/settings/imports-data/${this.getTypeImport(to)}`
        ) {
          await this.$router.push(
            `/settings/imports-data/${this.getTypeImport(to)}`,
          );
        }
      }
      if (type === 'ACTIVITY') {
        if (this.$route.path !== '/activities/calendar') {
          await this.$router.push({
            name: 'activities-calendar',
          });
        }
        this.modalHandlerActivity({ isOpen: true, isLoading: false, info: to });
      }
      if (type === 'TAG_NOTE' || type === 'TAG_COMMENT') {
        if (this.$route.params.id !== to) {
          this.$router.push(`/${from.toLowerCase()}/${to}`, () => {});
        } else {
          this.$router.go();
        }
      }
    },
    goEnterprise(id) {
      if (id !== this.userCurrent.enterprise.id) {
        this.$router.push({ name: 'loading' });
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

              const reset = await this.$apollo.provider.defaultClient
                .resetStore()
                .then(() => true)
                .catch(() => {
                  // patch error in route users manager
                  return true;
                });

              if (reset) {
                let routeName = 'page404';
                if (type === 'ADMIN') routeName = 'dashboards';
                if (type === 'OTHER') routeName = 'pipeline';
                return this.$router.push({ name: routeName }, () => {});
              }

              return null;
            },
          )
          .catch(() => {
            this.$router.push({ name: 'page404' });
          });
      }
    },
  },
  apollo: {
    pipelines: {
      query: GET_FIRST_PIPELINE,
      fetchPolicy: 'no-cache',
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
    notifications: {
      query: GET_NOTIFICATIONS,
      variables() {
        return {
          filters: this.filters,
        };
      },
    },
    $subscribe: {
      notification: {
        query: NOTIFICATIONS_SUBSCRIPTION,
        fetchPolicy: 'no-cache',
        result() {
          this.updateNotifications();
          this.playSoundNotification();
        },
        error() {
          this.modalHandlerError({
            isOpen: true,
            error:
              'No se pudo actualizar las notificaciones por suscripción, intente de nuevo o contacte a soporte',
          });
        },
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{  .user-name .user-enterprise .user-settings .select-class .text-confirmation} from ../../../../scss/components/app.navbar.user';
</style>
