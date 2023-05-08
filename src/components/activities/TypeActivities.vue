<template>
  <div class="d-flex justify-center">
    <v-card tile flat width="36rem" height="30em">
      <div class="d-flex justify-space-between pa-4 primary">
        <span class="title-activities-types mt-2 white--text">
          Tipos de actividades
        </span>
        <v-btn fab small color="secondary" @click="openModalActivityType">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <div
        v-if="activityTypes && activityTypes.length > 0"
        style="max-height: 85%; overflow-y: auto;"
      >
        <v-list dense>
          <draggable
            :list="listActivityTypes"
            handle=".handle"
            @change="changeOrder"
          >
            <transition-group>
              <template v-for="activityType in listActivityTypes">
                <v-list-item
                  :key="activityType.id"
                  dense
                  class="item-type-activity"
                >
                  <v-list-item-action>
                    <v-btn small icon class="handle">
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-chip
                        :color="activityType.color"
                        :text-color="getBestColor(activityType.color)"
                      >
                        {{ activityType.name }}
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-on="on">
                          <v-btn
                            color="primary"
                            v-bind="attrs"
                            x-small
                            outlined
                            @click="openModalRemoveTypeActivity(activityType)"
                            :disabled="activityType.activitiesCount > 0"
                          >
                            <v-icon small color="primary">
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </div>
                      </template>
                      <span>
                        <template v-if="activityType.activitiesCount > 0">
                          No se puede eliminar, tienes
                          {{ activityType.activitiesCount }}
                          {{
                            activityType.activitiesCount === 1
                              ? 'actividad'
                              : 'actividades'
                          }}
                        </template>
                        <template v-else>
                          Eliminar
                        </template>
                      </span>
                    </v-tooltip>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-on="on"
                          v-bind="attrs"
                          color="secondary"
                          x-small
                          @click="editTypeActivity(activityType)"
                        >
                          <v-icon small color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>
                        Editar
                      </span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </transition-group>
          </draggable>
        </v-list>
      </div>
      <div
        v-else
        class="d-flex flex-column align-center justify-center full-heigth"
      >
        <v-icon large>mdi-calendar-remove</v-icon>
        <p class="text-center pb-12">
          No tienes tipos de actividades
        </p>
      </div>
    </v-card>
    <BaseModalDeleteItem
      :dialog.sync="isOpenDelete"
      :config="configModalDelete"
      :isLoading="isLoadingDelete"
      :item="itemSelected"
      @remove="removeTokenCalendar"
    ></BaseModalDeleteItem>
    <ModalActivityType
      :activityTypes="listActivityTypes"
      @refetch="updateTypeActivities"
    ></ModalActivityType>
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="removeTypeActivity"
    />
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { lexoRankMixin } from '@/mixins/lexoRankMixin';
import { tagsMixin } from '@/mixins/tagsMixin';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import ModalActivityType from '@/components/activities/ModalActivityType.vue';
import {
  SET_CALENDAR,
  SET_TOKEN_CALENDAR,
  REMOVE_TOKEN_CALENDAR,
  DELETE_ACTIVITY_TYPE,
  UPDATE_ACTIVITY_TYPE,
} from '@/graphql/mutations/activitiesMutations';
import {
  GET_CALENDAR_URI,
  GET_LIST_CALENDAR,
  GET_ACTIVITIES_TYPES,
} from '@/graphql/querys/activitiesQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import BaseModalDeleteItem from '@/components/ui/BaseModalDeleteItem.vue';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'TypeActivities',
  mixins: [
    modalMethodsMixin,
    modalApolloMixin,
    tagsMixin,
    lexoRankMixin,
    modalsAlertsMixin,
  ],
  components: {
    ModalActivityType,
    draggable,
    BaseModalDeleteItem,
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
      itemTypeActivitySelected: {},
      isOpenDelete: false,
      changeCalendar: false,
      activityTypes: [],
      selectedCalendar: '',
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

            if (this.selectedCalendar === '') {
              this.isOpenModalSelectCalendar = true;
            }
          }
        }
      },
    },
  },
  computed: {
    listActivityTypes() {
      if (this.activityTypes) {
        const list = [...this.activityTypes];
        return this.sortList(list);
      }
      return [];
    },
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
    changeOrder({ moved }) {
      const list = [...this.listActivityTypes];
      const order = this.updateOrder(
        moved.newIndex,
        moved.oldIndex,
        this.sortList(list),
      );

      const { id } = this.listActivityTypes[moved.newIndex];
      const typeIndex = this.activityTypes.findIndex((type) => type.id === id);

      this.activityTypes[typeIndex].order = order;

      this.updateTypeActivity({ ...moved.element, order });
    },
    openModalActivityType() {
      this.changeModal({
        id: 'createActivityType',
        status: true,
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
              data.userCurrent.integrations.push({
                __typename: 'Integration',
                id: Math.random()
                  .toString(36)
                  .slice(2),
                name: 'googleCalendar',
                email: syncronizeGoogleCalendar.email,
                keyItem: '',
              });
              store.writeQuery({ query: GET_USER_LOGGED, data });
            }
          },
        })
        .then(({ data: { syncronizeGoogleCalendar } }) => {
          this.isLoadingAddEmail = false;
          if (!syncronizeGoogleCalendar.success) {
            this.$router.push({ name: 'settings-calendar' });
          }
        })
        .catch(() => {});
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
        })
        .catch(() => {
          this.isLoadingRemoveCalendar = false;
          this.isLoadingDelete = false;
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
        })
        .catch(() => {
          this.isLoadingAddCalendar = false;
          this.changeCalendar = false;
          this.isOpenModalSelectCalendar = false;
        });
    },
    updateTypeActivities() {
      this.$apollo.queries.activityTypes.refetch();
    },
    updateTypeActivity(typeActivity) {
      const { id, order } = typeActivity;
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_ACTIVITY_TYPE,
          // Parameters
          variables: {
            activityTypeInput: {
              id,
              order,
            },
          },
        })
        .then(() => {
          // Result
          // console.log(data);
          this.updateTypeActivities();
        })
        .catch(() => {});
    },
    openModalRemoveTypeActivity(activityType) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: `El tipo de actividad ${activityType.name}`,
          text: 'será eliminado',
        },
        infoDelete: {
          data: activityType,
        },
      });
    },
    removeTypeActivity({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      const { id } = infoDelete.data;
      this.$apollo
        .mutate({
          // Query
          mutation: DELETE_ACTIVITY_TYPE,
          // Parameters
          variables: {
            activityTypeId: id,
          },
        })
        .then(() => {
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          this.updateTypeActivities();
        })
        .catch(() => {
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          const error =
            'No se pudo eliminar el tipo de actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    editTypeActivity(typeActivity) {
      this.changeModal({
        id: 'createActivityType',
        status: true,
        item: typeActivity,
        isEdit: true,
      });
    },
  },
  apollo: {
    getCalendarUri: {
      query: GET_CALENDAR_URI,
    },
    listCalendar: {
      query: GET_LIST_CALENDAR,
      skip() {
        return !this.hasCalendarIntegration;
      },
    },
    userCurrent: {
      query: GET_USER_LOGGED,
    },
    activityTypes: {
      fetchPolicy: 'no-cache',
      query: GET_ACTIVITIES_TYPES,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .settings-calendar-box, .full-heigth, .title-activities-types, .item-type-activity } from ../../../../scss/views/settings.calendar';
</style>
