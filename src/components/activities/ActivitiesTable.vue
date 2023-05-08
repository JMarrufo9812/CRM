<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <v-sheet height="100%" class="py-4">
        <v-toolbar flat>
          <v-menu
            ref="menuSelectorRange"
            v-model="menuSelectorRange"
            :close-on-content-click="false"
            left
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="btnSelect ml-8 mr-2"
                color="primary"
                outlined
                plain
                v-bind="attrs"
                v-on="on"
              >
                {{ dateRangeText }}
                <v-icon right>
                  mdi-calendar
                </v-icon>
              </v-btn>
            </template>
            <v-date-picker
              v-model="datesSelected"
              range
              no-title
              :show-current="false"
              :min="minDate"
            >
              <v-btn text color="primary" @click="menuSelectorRange = false">
                <v-icon>mdi-close</v-icon>
                Cerrar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="clearSelectorRange">
                Borrar
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn
            color="error"
            v-if="activitiesSelected.length > 0"
            class="ml-2"
            @click="deleteActivitiesConfirm"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn
            :outlined="$route.path !== '/activities/calendar'"
            :color="$route.path === '/activities/calendar' ? 'primary' : ''"
            @click="$router.push({ name: 'activities-calendar' }, () => {})"
          >
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
          <v-btn
            class="mr-6"
            :outlined="$route.path !== '/activities/list'"
            :color="$route.path === '/activities/list' ? 'primary' : ''"
            @click="$router.push({ name: 'activities-table' }, () => {})"
          >
            <v-icon>
              mdi-table-large
            </v-icon>
          </v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="primary"
                v-bind="attrs"
                v-on="on"
                class="mr-6"
              >
                <span>{{ getTextFilterDate(filterDate) }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectFilterDate('EXPIRED')">
                <v-list-item-title>Vencidas</v-list-item-title>
              </v-list-item>
              <v-list-item @click="selectFilterDate('TODAY')">
                <v-list-item-title>Hoy</v-list-item-title>
              </v-list-item>
              <v-list-item @click="selectFilterDate('TOMORROW')">
                <v-list-item-title>Mañana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="selectFilterDate('THIS_WEEK')">
                <v-list-item-title>Esta semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="selectFilterDate('NEXT_WEEK')">
                <v-list-item-title>Próxima semana</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            class="mr-10"
            small
            fab
            depressed
            color="secondary"
            @click="openModalActivity"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="2" class="pt-0" style="min-height:40em">
      <v-divider></v-divider>
      <v-sheet height="100%">
        <div class="pl-10 pt-10">
          <span>
            Categorías
          </span>

          <v-checkbox
            v-model="allFilters"
            class="pb-2"
            hide-details="auto"
            label="Ver todo"
          ></v-checkbox>
          <v-checkbox
            v-model="filtersActivities"
            v-for="(activityType, index) in listActivityTypes"
            :key="activityType.id"
            :value="index"
            hide-details="auto"
            class="pb-2"
            :color="activityType.color"
          >
            <template v-slot:label>
              <span :style="`color: ${activityType.color}`">
                {{ activityType.name }}
              </span>
            </template>
          </v-checkbox>
        </div>
      </v-sheet>
    </v-col>
    <v-col cols="10">
      <v-card outlined class="mt-12 mx-12">
        <v-data-table
          v-model="activitiesSelected"
          :headers="headers"
          :items="listActivities"
          item-key="id"
          :loading="loading"
          loading-text="Cargando contactos..."
          show-select
          disable-sort
          :server-items-length="activities.count"
          :page="page"
          @update:page="updatePage"
          :items-per-page="itemsPerPage"
          @update:items-per-page="updateItems"
          class="activities-table"
          hide-default-footer
        >
          <template #[`item.status`]="{ item }">
            <div class="text-center">
              <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-simple-checkbox
                    v-bind="attrs"
                    v-on="on"
                    :color="
                      item.isComplete && item.status === 'EFFECTIVE'
                        ? 'success'
                        : 'error'
                    "
                    on-icon="mdi-checkbox-marked-circle"
                    off-icon="mdi-checkbox-blank-circle-outline"
                    :value="item.isComplete"
                    @click="changeStatus(item.id, item.isComplete)"
                  ></v-simple-checkbox>
                </template>
                <span>
                  {{ item.isComplete ? 'Desmarcar' : 'Completar' }}
                </span>
              </v-tooltip>
            </div>
          </template>
          <template #[`item.title`]="{item}">
            <span :class="{ 'text-decoration-line-through': item.isComplete }">
              {{ item.title }}
            </span>
          </template>
          <template #[`item.start`]="{ item }">
            <span>{{ formatDateActivity(item.start) }}</span>
          </template>
          <template
            #[`item.companies`]="{ item: { companies: [company, ...companies] } }"
          >
            <span
              class="cursorStyle font-weight-bold"
              @click="goToProfile('company', company.id)"
            >
              <v-icon small class="mr-1">
                {{ company ? 'mdi-domain' : '' }}
              </v-icon>
              {{ company ? company.name : '' }}
            </span>
            <v-menu allow-overflow>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip top color="white">
                  <template v-slot:activator="{ on: tooltip }">
                    <v-chip
                      outlined
                      class="ml-1 pa-1"
                      v-show="companies.length > 0"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      x-small
                    >
                      <v-icon x-small class="mr-1">
                        mdi-domain
                      </v-icon>
                      + {{ companies.length }}
                    </v-chip>
                  </template>
                  <span class="black--text">
                    Este contacto cuenta con más de una empresa, has click para
                    ver
                  </span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item
                  v-for="(company, index) in companies"
                  :key="index"
                  dense
                  @click="goToProfile('company', company.id)"
                >
                  <v-icon class="mr-2" small>mdi-domain</v-icon>
                  <v-list-item-title>{{ company.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template
            #[`item.contacts`]="{ item: { contacts: [contact, ...contacts] } }"
          >
            <span
              class="cursorStyle font-weight-bold"
              @click="goToProfile('contact', contact.id)"
            >
              <v-icon small class="mr-1">
                {{ contact ? 'mdi-account' : '' }}
              </v-icon>
              {{ contact ? contact.name : '' }}
            </span>
            <v-menu allow-overflow>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip top color="white">
                  <template v-slot:activator="{ on: tooltip }">
                    <v-chip
                      outlined
                      class="ml-1 pa-1"
                      v-show="contacts.length > 0"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      x-small
                    >
                      <v-icon x-small class="mr-1">
                        mdi-account
                      </v-icon>
                      + {{ contacts.length }}
                    </v-chip>
                  </template>
                  <span class="black--text">
                    Esta actividad cuenta con más de un contacto, has click para
                    ver
                  </span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item
                  v-for="(contact, index) in contacts"
                  :key="index"
                  dense
                  @click="goToProfile('company', contact.id)"
                >
                  <v-icon class="mr-2" small>mdi-domain</v-icon>
                  <v-list-item-title>{{ contact.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template #[`item.deal`]="{ item }">
            <span>
              <v-icon>
                {{ item.deal ? 'mdi-handshake' : '' }}
              </v-icon>
              {{ item.deal ? item.deal.title : '' }}
            </span>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="secondary"
                  @click="editEvent(item)"
                >
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </template>
              <span>Reagendar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="secondary"
                  @click="deleteActivityConfirm(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
          <template v-slot:footer="{ props }">
            <v-divider></v-divider>
            <div
              class="d-flex justify-center mt-4 mb-6"
              v-if="props.pagination.pageCount > 1"
            >
              <v-btn
                v-if="props.pagination.page > 1"
                @click="backPage()"
                outlined
                class="mr-6"
              >
                <v-icon large>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn outlined>
                {{ props.pagination.page }} De {{ props.pagination.pageCount }}
              </v-btn>
              <v-btn
                v-if="
                  props.pagination.page !== props.pagination.pageCount &&
                    props.pagination.pageCount > 1
                "
                outlined
                class="ml-6"
                @click="nextPage(props.pagination.pageCount)"
              >
                <v-icon large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteActivities"
    />
    <BaseModalDelete
      :modalHandler="modalDeleteActivity"
      @cancel="modalHandlerDeleteActivity"
      @confirm="deleteActivity"
    />
    <ModalEffective
      :isLoading="isLoadingComplete"
      :reset="!isLoadingComplete"
      @cancel="cancelComplete"
      @save="saveComplete"
    ></ModalEffective>
    <ModalActivity @refetch="refetchActivities"></ModalActivity>
  </v-row>
</template>

<script>
import moment from 'moment';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import {
  UPDATE_ACTIVITY,
  DELETE_ACTIVITIES,
} from '@/graphql/mutations/activitiesMutations';
import ModalEffective from '@/components/activities/ModalEffective.vue';
import { tagsMixin } from '@/mixins/tagsMixin';
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_TYPES,
} from '@/graphql/querys/activitiesQuery';
import ModalActivity from '@/components/activities/ModalActivity.vue';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { successesMixin } from '@/mixins/successes';

export default {
  name: 'ActivitiesTable',
  components: { ModalActivity, ModalEffective },
  mixins: [
    modalMethodsMixin,
    modalApolloMixin,
    tagsMixin,
    modalsAlertsMixin,
    successesMixin,
  ],
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      selectedEvent: {},
      isLoadingComplete: false,
      datesSelected: [],
      start: null,
      end: null,
      focus: new Date().toISOString().substr(0, 10),
      filterDate: 'THIS_WEEK',
      filtersActivities: [],
      menuSelectorRange: false,
      searchContact: '',
      activitiesSelected: [],
      activities: {},
      loading: false,
      dateType: {
        EXPIRED: 'EXPIRED',
        TODAY: 'TODAY',
        TOMORROW: 'TOMORROW',
        THIS_WEEK: 'THIS_WEEK',
        NEXT_WEEK: 'NEXT_WEEK',
        RANGE: 'RANGE',
      },
      activityTypes: [],
      modalDeleteActivity: { isOpen: false, isLoading: false, infoDelete: {} },
    };
  },
  watch: {
    datesSelected(value) {
      if (value && value.length === 2) {
        this.filterDate = 'RANGE';
      } else if (this.filterDate === 'RANGE') {
        this.filterDate = '';
      }
    },
    filterDate(filter) {
      if (filter !== this.dateType.RANGE) {
        this.datesSelected = [];
      }
    },
  },
  computed: {
    listActivityTypes() {
      const list = [...this.activityTypes];
      return this.sortList(list);
    },
    listActivities() {
      if (this.activities.list) {
        return this.activities.list.map((activity) => {
          return { ...activity, isComplete: activity.status !== 'PENDING' };
        });
      }
      return [];
    },
    minDate() {
      return this.datesSelected.length > 0 ? this.datesSelected[0] : '';
    },
    dateRangeText() {
      return this.datesSelected.length
        ? this.datesSelected.join(' ~ ')
        : 'Rango de fecha';
    },
    headers() {
      return [
        {
          text: 'Estatus',
          align: 'center',
          value: 'status',
        },
        {
          text: 'Título',
          value: 'title',
        },
        { text: 'Fecha para hacer', value: 'start' },
        { text: 'Contactos', value: 'contacts' },
        { text: 'Empresas', value: 'companies' },
        { text: 'Trato', value: 'deal' },
        { text: 'Acciones', value: 'actions' },
      ];
    },
    filterTypeActivitiesSelected() {
      const dateRange = { dateStart: '', dateEnd: '' };

      const dateType = this.filterDate.length ? this.filterDate : null;
      const activityTypes = this.activityTypes
        ? this.activityTypes
            .filter((type, index) => this.filtersActivities.includes(index))
            .map((activity) => {
              return { id: activity.id };
            })
        : [];

      const filter = {
        activityTypes,
        dateType,
        take: this.itemsPerPage,
        skip: (this.page - 1) * this.itemsPerPage,
      };

      if (this.filterDate === 'RANGE' && this.datesSelected.length === 2) {
        [dateRange.dateStart, dateRange.dateEnd] = this.datesSelected;
        filter.dateRange = dateRange;
      }

      return filter;
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return '';
      }

      const newStart = moment(start.date);
      const newEnd = moment(end.date);

      if (
        newStart.year() === newEnd.year() &&
        newStart.month() === newEnd.month()
      ) {
        return `${newStart.format('D')} - ${newEnd.format('LL')}`;
      }
      if (
        newStart.year() === newEnd.year() &&
        newStart.month() !== newEnd.month()
      ) {
        return `${newStart.format('D MMMM')} - ${newEnd.format('LL')}`;
      }

      return `${newStart.format('LL')} - ${newEnd.format('LL')}`;
    },
    allFilters: {
      // eslint-disable-next-line
      get: function() {
        if (this.filtersActivities.length > 0) {
          return false;
        }
        return true;
      },
      // eslint-disable-next-line
      set: function(value) {
        if (value) {
          this.filtersActivities = [];
        }
      },
    },
  },
  methods: {
    nextPage(totalPages) {
      if (totalPages !== this.page) {
        this.page += 1;
      }
    },
    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },
    sortList(list) {
      return list.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
      });
    },
    goToProfile(type, id) {
      this.$router.push(`/${type}/${id}`, () => {});
    },
    editEvent(event) {
      const item = event;
      item.isReschedule = true;
      item.filters = this.filterTypeActivitiesSelected;

      this.changeModal({
        id: 'createActivity',
        status: true,
        isEdit: true,
        item,
      });
    },
    refetchActivities() {
      this.$apollo.queries.activities.refetch();
    },
    updatePage(countPage) {
      this.page = countPage;
    },
    updateItems(countItems) {
      this.itemsPerPage = countItems;
    },
    isComplete(status) {
      return status !== 'PENDING';
    },
    clearSelectorRange() {
      this.filterDate = '';
      this.datesSelected = [];
    },
    openModalEffective() {
      this.changeModal({
        id: 'modalEffective',
        status: true,
      });
    },
    cancelComplete() {
      this.selectedEventIsComplete = false;
      this.selectedEvent.status = 'PENDING';
      this.selectedEvent.comments = '';
    },
    saveComplete({ status, comments }) {
      this.isLoadingComplete = true;
      const { id } = this.selectedEvent;
      if (status) {
        this.saveCompleteMutation({ id, status: 'EFFECTIVE' });
      } else {
        this.saveCompleteMutation({
          id,
          status: 'INEFFECTIVE',
          comments,
        });
      }
    },
    saveEventIncomplete(id) {
      this.saveCompleteMutation({ id, status: 'PENDING' });
    },
    saveCompleteMutation({ id, status, comments }) {
      this.$apollo
        .mutate({
          mutation: UPDATE_ACTIVITY,
          variables: {
            activityInput: {
              id,
              status,
              comments,
            },
          },
        })
        .then(() => {
          this.isLoadingComplete = false;
          this.refetchActivities();
        })
        .catch(() => {
          // Error
          this.isLoadingComplete = false;
          const error =
            'No se pudo actualizar el estado de la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deleteActivitiesConfirm() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          text: 'serán eliminados',
          nameItem: 'Las actividades seleccionadas',
        },
        infoDelete: {},
      });
    },
    deleteActivityConfirm(item) {
      this.modalHandlerDeleteActivity({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: `${item.title}`,
          text: 'será eliminada',
        },
        infoDelete: item,
      });
    },
    deleteActivities({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      const listIDs = this.activitiesSelected.map((activityID) => {
        return { id: activityID.id };
      });
      this.$apollo
        .mutate({
          // Query
          mutation: DELETE_ACTIVITIES,
          // Parameters
          variables: {
            activities: listIDs,
          },
        })
        .then(() => {
          // Result
          // console.log(data);
          this.activitiesSelected = [];
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          this.refetchActivities();
          this.addSuccess('Se eliminaron las actividades correctamente.');
        })
        .catch(() => {
          // Error
          this.activitiesSelected = [];
          const error =
            'No se pudieron eliminar las actividades, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    deleteActivity({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDeleteActivity({
        isOpen,
        isLoading,
        message,
        infoDelete,
      });
      const listIDs = [{ id: infoDelete.id }];
      this.$apollo
        .mutate({
          // Query
          mutation: DELETE_ACTIVITIES,
          // Parameters
          variables: {
            activities: listIDs,
          },
        })
        .then(() => {
          this.modalHandlerDeleteActivity({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          this.refetchActivities();
          this.addSuccess('Se eliminó la actividad correctamente.');
        })
        .catch(() => {
          // Error
          this.activitiesSelected = [];
          const error =
            'No se pudo eliminar la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    modalHandlerDeleteActivity({ isOpen, isLoading, message, infoDelete }) {
      this.modalDeleteActivity = { isOpen, isLoading, message, infoDelete };
    },
    openModalActivity() {
      const item = {};
      item.filters = this.filterTypeActivitiesSelected;
      this.changeModal({
        id: 'createActivity',
        status: true,
        item,
      });
    },
    formatDateActivity(date) {
      const newDate = moment(date);
      return newDate.format('DD/MM/YYYY hh:mma');
    },
    changeStatus(id, status) {
      this.selectedEvent = { id };
      if (!status) {
        this.openModalEffective();
      } else {
        this.saveEventIncomplete(id);
      }
    },
    selectFilterDate(filterDate) {
      this.filterDate = filterDate;
    },
    getTextFilterDate(filterDate) {
      if (filterDate === 'THIS_WEEK') return 'Esta semana';
      if (filterDate === 'EXPIRED') return 'Vencidas';
      if (filterDate === 'TODAY') return 'Hoy';
      if (filterDate === 'TOMORROW') return 'Mañana';
      if (filterDate === 'NEXT_WEEK') return 'Próxima semana';
      return 'Filtro de dias';
    },
  },
  apollo: {
    activityTypes: {
      query: GET_ACTIVITIES_TYPES,
      fetchPolicy: 'no-cache',
    },
    activities: {
      query: GET_ACTIVITIES,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          filters: this.filterTypeActivitiesSelected,
        };
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../scss/components/activities.table';
@import '../../scss/settings/font.scss';
</style>
