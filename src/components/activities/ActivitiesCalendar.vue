<template>
  <div>
    <v-sheet height="100%" class="py-4">
      <v-toolbar flat>
        <v-btn class="ml-8 mr-2" outlined color="primary" @click="prev">
          <v-icon large>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="btn-select"
              color="primary"
              outlined
              plain
              v-bind="attrs"
              v-on="on"
            >
              {{ title }}
              <v-icon right>
                mdi-calendar
              </v-icon>
            </v-btn>
          </template>
          <v-date-picker
            v-model="focus"
            @change="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <v-btn class="ml-2" outlined color="primary" @click="next">
          <v-icon large>
            mdi-chevron-right
          </v-icon>
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
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Día</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semana</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mes</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 días</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="mr-10"
          color="secondary"
          fab
          small
          depressed
          @click="openModalActivity"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <ModalActivity @refetch="refetchActivities"></ModalActivity>
      </v-toolbar>
    </v-sheet>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="2">
        <v-sheet height="100%">
          <div class="pl-10 pt-10">
            <span>
              Categorias
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
      <v-col cols="10" class="px-12">
        <v-sheet>
          <div class="d-flex justify-center calendar">
            <v-card
              elevation="0"
              class="d-flex justify-space-between card-info my-10"
              color="#ffffff"
              width="90%"
            >
              <div class="pt-4 pl-6">
                <v-img
                  src="../../assets/images/horse-2.svg"
                  height="10em"
                  width="8em"
                ></v-img>
              </div>
              <div class="d-flex align-center">
                <span class="title-banner">¡Bienvenido a tus actividades!</span>
              </div>
              <div class="mr-10">
                <v-img
                  src="../../assets/images/calendar.svg"
                  height="10em"
                  width="11em"
                ></v-img>
              </div>
            </v-card>
          </div>
          <AlertConfigCalendar></AlertConfigCalendar>
          <v-calendar
            class="calendar"
            ref="calendar"
            v-model="focus"
            :events="listActivities"
            :event-color="getEventColor"
            event-overlap-mode="stack"
            :event-overlap-threshold="30"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
            locale="es"
            interval-height="44"
            :interval-minutes="60"
            color="secondary"
          >
            <template v-slot:day-body="{ date, week }">
              <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
              >
                <span v-if="cal">
                  {{ cal.times.now.time }}
                </span>
              </div>
            </template>
            <template v-slot:event="{ event }">
              <v-card
                :style="`border-left: ${event.color} 5px solid`"
                class="pl-1 d-flex align-center event-card"
                :class="{
                  'text-decoration-line-through': event.status !== 'PENDING',
                }"
                height="100%"
              >
                <span class="event-text" :style="`color: ${event.color}`">
                  {{ event.name }}
                </span>
              </v-card>
            </template>
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :close-on-click="false"
            :activator="selectedElement"
            offset-x
            :open-on-click="false"
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-spacer></v-spacer>
                <v-btn icon @click="editEvent(selectedEvent.id)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteActivityConfirm()">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-list-item dense>
                  <v-list-item-icon>
                    <div
                      class="icon-color"
                      :style="{ 'background-color': selectedEvent.color }"
                    ></div>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ selectedEvent.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ formatTime(selectedEvent.start, selectedEvent.end) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        selectedEvent.owner ? selectedEvent.owner.user.name : ''
                      }}
                      {{
                        selectedEvent.owner
                          ? selectedEvent.owner.user.lastName
                          : ''
                      }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense v-if="selectedEvent.description">
                  <v-list-item-icon>
                    <v-icon>mdi-card-text-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content
                    v-html="selectedEvent.description"
                  ></v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon
                      :color="
                        selectedEvent.status !== 'PENDING' ? 'success' : 'error'
                      "
                    >
                      {{
                        selectedEvent.status !== 'PENDING'
                          ? 'mdi-check-circle'
                          : 'mdi-checkbox-blank-circle-outline'
                      }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{
                        selectedEvent.status !== 'PENDING'
                          ? 'Completado'
                          : 'Pendiente'
                      }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-btn
                    v-if="selectedEvent.status !== 'PENDING'"
                    color="error"
                    @click="saveEventIncomplete(selectedEvent.id)"
                    :loading="isLoadingIncomplete"
                  >
                    Deshacer
                  </v-btn>
                  <v-btn
                    color="secondary"
                    v-if="selectedEvent.status === 'PENDING'"
                    @click="openModalActivityReschedule(selectedEvent.id)"
                  >
                    Reagendar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    v-if="selectedEvent.status === 'PENDING'"
                    @click.stop.prevent="openModalEffective"
                    :loading="isLoadingComplete"
                  >
                    Completar
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteActivity"
    />
    <ModalEffective
      :reset="!isLoadingComplete"
      @cancel="cancelComplete"
      @save="saveComplete"
    ></ModalEffective>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </div>
</template>

<script>
import moment from 'moment';
import { tagsMixin } from '@/mixins/tagsMixin';
import {
  UPDATE_ACTIVITY,
  DELETE_ACTIVITIES,
} from '@/graphql/mutations/activitiesMutations';
import ModalEffective from '@/components/activities/ModalEffective.vue';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import ModalActivity from '@/components/activities/ModalActivity.vue';
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_TYPES,
} from '@/graphql/querys/activitiesQuery';
import { successesMixin } from '@/mixins/successes';
import AlertConfigCalendar from '@/components/activities/AlertConfigCalendar.vue';

export default {
  name: 'ActivitiesCalendar',
  mixins: [
    modalMethodsMixin,
    modalApolloMixin,
    tagsMixin,
    modalsAlertsMixin,
    successesMixin,
  ],
  components: {
    ModalActivity,
    ModalEffective,
    AlertConfigCalendar,
  },
  data() {
    return {
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        '4day': '4 días',
      },
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      ready: false,
      activityTypes: [],
      filtersActivities: [],
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      start: null,
      end: null,
      isLoadingComplete: false,
      isLoadingIncomplete: false,
      type: 'week',
      selectedEvent: {},
      selectedEventIsComplete: false,
      selectedElement: null,
      selectedOpen: false,
      events: [],
      activities: [],
    };
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
  },
  computed: {
    listActivityTypes() {
      const list = [...this.activityTypes];
      return this.sortList(list);
    },
    computedDateFormattedMomentjs() {
      return this.focus ? moment(this.focus).format('dddd, MMMM Do YYYY') : '';
    },
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? `${this.cal.timeToY(this.cal.times.now)}px` : '-10px';
    },
    filterTypeActivitiesSelected() {
      const activityTypes = this.activityTypes
        .filter((type, index) => this.filtersActivities.includes(index))
        .map((activity) => {
          return { id: activity.id };
        });

      return {
        activityTypes,
      };
    },
    listActivities() {
      if (this.activities.list && this.activities.list.length > 0) {
        return this.activities.list.map(
          ({
            id,
            title,
            start,
            end,
            type: { color },
            description,
            owner,
            status,
            isAllDay,
          }) => {
            return {
              id,
              name: title,
              start: isAllDay ? start.split(' ', 1)[0] : start,
              end: isAllDay ? null : end,
              color,
              description,
              owner,
              status,
              comments: '',
            };
          },
        );
      }
      return [];
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
  watch: {
    activities: {
      handler() {
        this.updateSelectedEvent();
      },
      deep: true,
    },
    selectedOpen() {
      this.updateSelectedEvent();
    },
  },
  methods: {
    sortList(list) {
      return list.sort((a, b) => {
        return a.order > b.order ? 1 : -1;
      });
    },
    refetchActivities() {
      this.$apollo.queries.activities.refetch();
    },
    updateSelectedEvent() {
      const { id } = this.selectedEvent;
      const item = this.findListEvent(id);
      if (item) {
        this.selectedEvent = item;
      }
    },
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
    openModalActivityReschedule(id) {
      this.editEvent(id, true);
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
      this.isLoadingIncomplete = true;
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
        .then(({ data: { updateActivity } }) => {
          // Result
          this.selectedEvent.status = updateActivity.status;
          this.selectedEvent.comments = '';
          this.isLoadingComplete = false;
          this.isLoadingIncomplete = false;
          this.$apollo.queries.activities.refetch();
          if (updateActivity.status !== 'PENDING') {
            this.addSuccess('Se completó la actividad.');
          } else {
            this.addSuccess('Marcaste como incompleta la actividad.');
          }
        })
        .catch(() => {
          // Error
          this.isLoadingComplete = false;
          this.isLoadingIncomplete = false;
          const error =
            'No se pudo actualizar el estado de la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    openModalEffective() {
      this.changeModal({
        id: 'modalEffective',
        status: true,
      });
    },
    formatTime(dateTimeStart, dateTimeEnd) {
      if (dateTimeStart) {
        const newDateStart = moment(dateTimeStart.split(' ')[0]);
        const newTimeStart = dateTimeEnd
          ? moment(dateTimeStart.split(' ')[1], ['h:mm:ss'])
          : null;
        const newTimeEnd = dateTimeEnd
          ? moment(dateTimeEnd.split(' ')[1], ['h:mm:ss'])
          : null;

        return `${newDateStart.format('LL')} ${newTimeEnd ? '⋅' : ''} ${
          newTimeStart ? newTimeStart.format('h:mma') : ''
        } ${newTimeEnd ? '-' : ''} ${
          newTimeEnd ? newTimeEnd.format('h:mma') : ''
        }`;
      }
      return '';
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
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
    editEvent(id, isReschedule) {
      const item = this.findEvent(id);
      item.isReschedule = isReschedule;
      item.filters = this.filterTypeActivitiesSelected;

      this.changeModal({
        id: 'createActivity',
        status: true,
        isEdit: true,
        item,
      });
    },
    findEvent(id) {
      const event = this.activities.list.find((activity) => activity.id === id);
      return {
        ...event,
        start: event.isAllDay ? event.start.split(' ', 1)[0] : event.start,
        end: event.isAllDay ? null : event.end,
      };
    },
    findListEvent(id) {
      return this.listActivities.find((activity) => activity.id === id);
    },
    deleteActivityConfirm() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: 'La actividad seleccionada',
          text: 'será eliminada',
        },
        infoDelete: {},
      });
    },
    deleteActivity({ isOpen, isLoading, message, infoDelete }) {
      const { id } = this.selectedEvent;
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.$apollo
        .mutate({
          // Query
          mutation: DELETE_ACTIVITIES,
          // Parameters
          variables: {
            activities: [{ id }],
          },
        })
        .then(() => {
          // Result
          // console.log(data);
          this.selectedOpen = false;
          this.modalHandlerDelete({
            isOpen: false,
            isLoading: false,
            message: '',
            infoDelete: {},
          });
          this.$apollo.queries.activities.refetch();
          this.addSuccess('Se eliminó la actividad.');
        })
        .catch(() => {
          // Error
          this.selectedOpen = false;
          const error =
            'No se pudo eliminar la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
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
@import '../../scss/settings/color.scss';
@import '{.title-banner .calendar .card-info .icon-color .event-text .v-calendar-daily__intervals-body .theme--light .v-event-timed .event-card .v-calendar-daily__day .v-calendar-daily__day-interval .v-calendar-daily_head-weekday .v-calendar-daily__head .btn-select .v-current-time .v-calendar-daily__scroll-area} from ../../../../scss/components/activities.calendar';
</style>
