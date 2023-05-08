<template>
  <div class="d-flex justify-center">
    <v-card tile flat class="settings-calendar-box" width="35em" height="35em">
      <div
        v-if="!hasCalendarIntegration"
        class="d-flex align-content-center justify-center flex-wrap full-heigth"
      >
        <p class="text-center mx-4">
          Sincroniza tu calendario principal con tu cuenta para crear
          actividades.
        </p>
        <v-btn color="success" @click="addCalendar">
          Añadir calendario
        </v-btn>
      </div>
      <template v-else>
        <div
          class="d-flex align-center full-heigth"
          v-if="hasCalendarIntegration"
        >
          <div class="d-flex flex-column mx-12" style="width: 100%">
            <span class="mb-6 title-activities-types">
              Sincronización de calendario
            </span>
            <v-progress-circular
              v-if="isOpenModalSelectCalendar"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <v-text-field
              readonly
              outlined
              dense
              :value="selectedCalendarEmail"
              label="Correo"
            >
              <template v-slot:append>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
            </v-text-field>
            <v-text-field
              label="Calendario"
              v-if="!changeCalendar && hasCalendarComplete"
              readonly
              outlined
              dense
              :value="getCalendarIntegracionId"
            >
              <template v-slot:append>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
            </v-text-field>
            <v-select
              v-if="changeCalendar || !hasCalendarComplete"
              dense
              v-model="selectedCalendar"
              :items="listCalendar"
              item-text="summary"
              item-value="id"
              label="Selecciona un calendario"
              outlined
            ></v-select>
            <div
              v-if="!changeCalendar && hasCalendarComplete"
              class="d-flex justify-end"
            >
              <v-btn outlined small class="ml-3" @click="remove">
                Quitar
              </v-btn>
              <v-btn
                small
                class="mx-3"
                color="primary"
                @click="changeCalendar = true"
              >
                Editar
              </v-btn>
              <v-btn small color="secondary" @click="addCalendar">
                Cambiar
              </v-btn>
            </div>
            <div v-else class="d-flex justify-end">
              <v-btn
                small
                v-if="hasSelectCalendar"
                outlined
                color="primary"
                @click="changeCalendar = false"
                class="mt-2 mr-3"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="mt-2"
                small
                color="secondary"
                @click="setCalendar"
                :loading="isLoadingAddCalendar"
                :disabled="hasSelectCalendar === selectedCalendar"
              >
                Guardar
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </v-card>
    <BaseModalDeleteItem
      :dialog.sync="isOpenDelete"
      :config="configModalDelete"
      :isLoading="isLoadingDelete"
      :item="itemSelected"
      @remove="removeTokenCalendar"
    ></BaseModalDeleteItem>
    <ModalSelectCalendar
      :dialog.sync="isOpenModalSelectCalendar"
      :loading="isLoadingAddCalendar"
      :listCalendar="listCalendar"
      @saveCalendar="saveCalendar"
    ></ModalSelectCalendar>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <v-snackbar
      v-model="snackbar.isOpen"
      :color="snackbar.color"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <template v-slot:action>
        <v-btn
          text
          @click="snackbarHandler({ isOpen: false, color: '', text: '' })"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { lexoRankMixin } from '@/mixins/lexoRankMixin';
import { tagsMixin } from '@/mixins/tagsMixin';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import {
  SET_CALENDAR,
  SET_TOKEN_CALENDAR,
  REMOVE_TOKEN_CALENDAR,
} from '@/graphql/mutations/activitiesMutations';
import {
  GET_CALENDAR_URI,
  GET_LIST_CALENDAR,
} from '@/graphql/querys/activitiesQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import BaseModalDeleteItem from '@/components/ui/BaseModalDeleteItem.vue';
import ModalSelectCalendar from '@/components/settingsCalendar/ModalSelectCalendar.vue';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { snackbarMixin } from '@/mixins/alerts/snackbarMixin';

export default {
  name: 'SettingsCalendar',
  mixins: [
    modalMethodsMixin,
    modalApolloMixin,
    tagsMixin,
    lexoRankMixin,
    modalsAlertsMixin,
    snackbarMixin,
  ],
  components: {
    BaseModalDeleteItem,
    ModalSelectCalendar,
  },
  data() {
    return {
      isOpenModalSelectCalendar: false,
      isLoadingAddCalendar: false,
      isLoadingRemoveCalendar: false,
      isLoadingDelete: false,
      configModalDelete: {
        title: 'Desvincular calendario',
        subtitle: 'Estas por quitar tu calendario',
        description: 'Se perderán tus datos de actividades, ¿estás seguro?',
      },
      itemSelected: {},
      isOpenDelete: false,
      changeCalendar: false,
      selectedCalendar: '',
      selectedCalendarEmail: '',
      getGmailUri: '',
      listCalendar: [],
      userCurrent: {},
      isLoading: false,
      isLoadingRemove: false,
    };
  },
  watch: {
    '$route.query.code': {
      handler(newValue) {
        if (newValue) {
          this.sendTokenCalendar();
        }
      },
      immediate: true,
    },
    'userCurrent.integrations': {
      handler(integrations) {
        if (integrations?.length > 0) {
          const existIntegration = integrations.some(
            (integration) => integration.name === 'googleCalendar',
          );
          if (existIntegration) {
            this.selectedCalendar = integrations.find(
              (integration) => integration.name === 'googleCalendar',
            ).keyItem;
            this.selectedCalendarEmail = integrations.find(
              (integration) => integration.name === 'googleCalendar',
            ).email;

            if (this.selectedCalendar === '') {
              this.isOpenModalSelectCalendar = true;
            }
          }
        }
      },
    },
  },
  computed: {
    hasCalendarIntegration() {
      if (this.userCurrent.integrations) {
        return this.userCurrent.integrations.some(
          (integration) => integration.name === 'googleCalendar',
        );
      }
      return true;
    },
    hasCalendarComplete() {
      if (this.userCurrent.integrations) {
        const calendar = this.userCurrent.integrations.find(
          (integration) => integration.name === 'googleCalendar',
        );
        if (calendar && calendar.id && calendar.keyItem) {
          return true;
        }
        return false;
      }
      return false;
    },
    hasSelectCalendar() {
      if (this.userCurrent.integrations) {
        return this.userCurrent.integrations.find(
          (integration) => integration.name === 'googleCalendar',
        ).keyItem;
      }
      return false;
    },
    getCalendarIntegracionId() {
      if (this.hasCalendarIntegration) {
        const id = this.userCurrent.integrations.find(
          (integration) => integration.name === 'googleCalendar',
        ).keyItem;

        if (id) {
          const item = this.listCalendar.find((list) => list.id === id);

          return item?.summary || '';
        }
      }
      return '';
    },
  },
  methods: {
    saveCalendar(selectedCalendar) {
      this.selectedCalendar = selectedCalendar;
      this.setCalendar();
    },
    sortList(list) {
      return list.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
      });
    },
    addCalendar() {
      const url = this.getCalendarUri;
      window.location.href = url;
    },
    sendTokenCalendar() {
      const codeToken = this.$route.query.code;
      this.$apollo
        .mutate({
          mutation: SET_TOKEN_CALENDAR,
          variables: {
            codeToken,
          },
          update: (store, { data: { syncronizeGoogleCalendar } }) => {
            if (syncronizeGoogleCalendar.success) {
              const data = store.readQuery({ query: GET_USER_LOGGED });
              const index = data.userCurrent.integrations.findIndex(
                (integration) => integration.name === 'googleCalendar',
              );
              if (index) {
                data.userCurrent.integrations[index] = {
                  __typename: 'Integration',
                  id: Math.random()
                    .toString(36)
                    .slice(2),
                  name: 'googleCalendar',
                  email: syncronizeGoogleCalendar.email,
                  keyItem: '',
                };
              } else {
                data.userCurrent.integrations.push({
                  __typename: 'Integration',
                  id: Math.random()
                    .toString(36)
                    .slice(2),
                  name: 'googleCalendar',
                  email: syncronizeGoogleCalendar.email,
                  keyItem: '',
                });
              }
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(({ data: { syncronizeGoogleCalendar } }) => {
          if (syncronizeGoogleCalendar.success) {
            this.isLoadingAddEmail = false;
            this.$apollo.queries.listCalendar.refresh();
            this.$router.push({ name: 'settings-calendar' });
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'Se vinculo el calendario correctamente.',
            });
          } else {
            const error =
              'El token no es válido, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          }
        })
        .catch(() => {
          const error =
            'Ocurrió un error, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    remove() {
      this.itemSelected = { name: this.getCalendarIntegracionId };
      this.changeModal({ id: 'deleteTemplateEmail', status: true });
    },
    removeTokenCalendar() {
      this.isLoadingDelete = true;
      this.isLoadingRemoveCalendar = true;
      this.$apollo
        .mutate({
          mutation: REMOVE_TOKEN_CALENDAR,
          update: (store, { data: { desynchronizeGoogleCalendar } }) => {
            if (desynchronizeGoogleCalendar) {
              const data = store.readQuery({ query: GET_USER_LOGGED });
              data.userCurrent.integrations = this.userCurrent.integrations.filter(
                (integration) => integration.name !== 'googleCalendar',
              );
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(() => {
          this.isLoadingRemoveCalendar = false;
          this.isLoadingDelete = false;
          this.changeModal({ id: 'deleteTemplateEmail', status: false });
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Se desvinculo el calendario correctamente.',
          });
        })
        .catch(() => {
          this.isLoadingRemoveCalendar = false;
          this.isLoadingDelete = false;
          const error =
            'Ocurrió un error, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    setCalendar() {
      this.isLoadingAddCalendar = true;
      const calendarId = this.selectedCalendar;

      this.$apollo
        .mutate({
          // Query
          mutation: SET_CALENDAR,
          // Parameters
          variables: {
            calendarId,
          },
          update: (store, { data: { setPrimaryCalendar } }) => {
            if (setPrimaryCalendar.success) {
              const data = store.readQuery({ query: GET_USER_LOGGED });
              const index = data.userCurrent.integrations.findIndex(
                (integration) => integration.name === 'googleCalendar',
              );
              data.userCurrent.integrations[
                index
              ].keyItem = this.selectedCalendar;
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(() => {
          this.isLoadingAddCalendar = false;
          this.changeCalendar = false;
          this.isOpenModalSelectCalendar = false;
          this.snackbarHandler({
            isOpen: true,
            color: 'success',
            text: 'Se conecto el calendario correctamente.',
          });
        })
        .catch(() => {
          this.isLoadingAddCalendar = false;
          this.changeCalendar = false;
          this.isOpenModalSelectCalendar = false;
          const error =
            'Ocurrió un error, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
  apollo: {
    getCalendarUri: {
      query: GET_CALENDAR_URI,
      fetchPolicy: 'no-cache',
    },
    listCalendar: {
      query: GET_LIST_CALENDAR,
      fetchPolicy: 'no-cache',
      skip() {
        return !this.hasCalendarIntegration;
      },
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .settings-calendar-box, .full-heigth, .title-activities-types, .item-type-activity } from ../../../../scss/views/settings.calendar';
</style>
