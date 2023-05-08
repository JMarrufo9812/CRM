<template>
  <v-dialog v-model="modalHandler.isOpen" width="400" persistent>
    <v-card>
      <v-card-title class="primary white--text pl-10">
        <v-icon color="white" class="pr-4">mdi-calendar-clock-outline</v-icon>
        {{ activity.title }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="text-center" v-if="isLoading">
        <v-sheet color="white" class="pa-12">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-sheet>
      </v-card-text>
      <v-card-text v-if="isExistActivity && !isLoading" class="pt-10">
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ formatTime(activity.start, activity.end) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ activity.owner ? activity.owner.user.name : '' }}
              {{ activity.owner ? activity.owner.user.lastName : '' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense v-if="activity.description">
          <v-list-item-icon>
            <v-icon>mdi-card-text-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            v-html="activity.description"
          ></v-list-item-content>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon
              :color="activity.status !== 'PENDING' ? 'success' : 'error'"
            >
              {{
                activity.status !== 'PENDING'
                  ? 'mdi-check-circle'
                  : 'mdi-checkbox-blank-circle-outline'
              }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ activity.status !== 'PENDING' ? 'Completado' : 'Pendiente' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-text v-else-if="!isLoading">
        <p class="pa-12 text-center">
          <v-icon large>mdi-calendar-remove</v-icon>
          Esta actividad ya no existe
        </p>
      </v-card-text>

      <v-card-actions class="pt-12" v-if="isExistActivity && !isLoading">
        <v-btn
          v-if="activity.status !== 'PENDING'"
          color="error"
          @click="saveEventIncomplete(activity.id)"
          :loading="isLoadingIncomplete"
        >
          Deshacer
        </v-btn>
        <v-btn
          color="secondary"
          v-if="activity.status === 'PENDING'"
          @click="openModalActivityReschedule()"
        >
          Reagendar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          v-if="activity.status === 'PENDING'"
          @click.stop.prevent="changeStatus"
          :loading="isLoadingComplete"
        >
          Completar
        </v-btn>
        <ModalEffectiveHistory
          :isOpen="isOpenModal"
          :isLoading="isLoadingComplete"
          :reset="!isLoadingComplete"
          @save="saveComplete"
          @cancel="cancelComplete"
        ></ModalEffectiveHistory>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import { GET_ACTIVITY } from '@/graphql/querys/activitiesQuery';
import { UPDATE_ACTIVITY } from '@/graphql/mutations/activitiesMutations';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';

export default {
  components: {
    ModalEffectiveHistory: () =>
      import('@/components/activities/ModalEffectiveHistory.vue'),
  },
  mixins: [modalMethodsMixin, modalApolloMixin],
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false, info: {} };
      },
    },
  },
  data() {
    return {
      activity: {},
      isExistActivity: false,
      isLoading: true,
      isOpenModal: false,
      isLoadingComplete: false,
      isLoadingIncomplete: false,
    };
  },
  watch: {
    modalHandler({ isOpen, info }) {
      if (isOpen) {
        this.isLoading = true;
        this.$apollo
          .query({
            query: GET_ACTIVITY,
            variables: {
              activityId: info,
            },
          })
          .then(({ data: { activity } }) => {
            this.isExistActivity = true;
            this.activity = activity;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            this.isExistActivity = false;
          });
      } else {
        this.resetValues();
      }
    },
  },
  methods: {
    close() {
      this.$emit('close', { isOpen: false, isLoading: false, info: {} });
    },
    formatTime(dateTimeStart, dateTimeEnd) {
      if (dateTimeStart) {
        const newDateStart = moment(dateTimeStart.split(' ')[0]);
        const newTimeStart = moment(dateTimeStart.split(' ')[1], ['h:mm:ss']);
        const newTimeEnd = moment(dateTimeEnd.split(' ')[1], ['h:mm:ss']);
        return `${newDateStart.format('LL')} ⋅ ${newTimeStart.format(
          'h:mma',
        )} - ${newTimeEnd.format('h:mma')}`;
      }
      return '';
    },
    editEvent(isReschedule) {
      const item = this.activity;
      item.isReschedule = isReschedule;

      this.changeModal({
        id: 'createActivity',
        status: true,
        isEdit: true,
        item,
      });
    },
    openModalActivityReschedule() {
      this.editEvent(true);
    },
    openModalEffective() {
      this.changeModal({
        id: 'modalEffective',
        status: true,
      });
    },
    resetValues() {
      this.activity = {};
      this.isLoading = true;
    },
    changeStatus() {
      const status = this.activity.status !== 'PENDING';
      if (!status) {
        this.isOpenModal = true;
      } else {
        this.saveEventIncomplete(this.activity.id);
      }
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
          this.isLoadingComplete = false;
          this.isLoadingIncomplete = false;
          this.isOpenModal = false;
          this.activity = updateActivity;
        })
        .catch(() => {
          // Error
          this.isLoadingComplete = false;
          this.isLoadingIncomplete = false;
          this.isOpenModal = false;

          const error =
            'No se pudo actualizar el estado de la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    saveEventIncomplete(id) {
      this.isLoadingIncomplete = true;
      this.saveCompleteMutation({ id, status: 'PENDING' });
    },
    cancelComplete() {
      this.isOpenModal = false;
    },
    saveComplete({ status, comments }) {
      this.isLoadingComplete = true;
      const { id } = this.activity;
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
  },
};
</script>
