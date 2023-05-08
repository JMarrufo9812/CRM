<template>
  <div>
    <v-card class="my-4" width="95%">
      <ActionTemplate
        :action="item"
        :typeItem="typeItem"
        :ownerId="ownerId"
        :isLoading="isLoadingComplete"
        @remove="removeConfirm"
        @edit="editEvent"
        @done="changeStatus"
        @updateHistory="updateHistory"
      ></ActionTemplate>
      <BaseModalDelete
        :modalHandler="modalDelete"
        @cancel="modalHandlerDelete"
        @confirm="remove"
      />
      <ModalEffectiveHistory
        :isOpen="isOpenModal"
        :isLoading="isLoadingComplete"
        :reset="!isLoadingComplete"
        @save="saveComplete"
        @cancel="cancelComplete"
      ></ModalEffectiveHistory>
    </v-card>
  </div>
</template>

<script>
import ActionTemplate from '@/components/activities/ActionTemplate.vue';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { GET_CONTACT_HISTORY } from '@/graphql/querys/contactsQuery';
import {
  UPDATE_ACTIVITY,
  DELETE_ACTIVITIES,
} from '@/graphql/mutations/activitiesMutations';
import { GET_COMPANY_HISTORY } from '@/graphql/querys/companiesQuery';
import { GET_DEAL_HISTORY } from '@/graphql/querys/dealsQuery';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';

export default {
  name: 'Action',
  components: {
    ActionTemplate,
    ModalEffectiveHistory: () =>
      import('@/components/activities/ModalEffectiveHistory.vue'),
  },
  mixins: [modalMethodsMixin, modalApolloMixin, modalsAlertsMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    ownerId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpenModal: false,
      isLoadingComplete: false,
    };
  },
  methods: {
    removeConfirm() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: `La actividad ${this.item.title}`,
          text: 'será eliminada',
        },
        infoDelete: {},
      });
    },
    remove({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      const { id } = this.item;
      this.$apollo
        .mutate({
          mutation: DELETE_ACTIVITIES,
          variables: {
            activities: [{ id }],
          },
        })
        .then(() => {
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          this.$emit('updateHistory');
        })
        .catch(() => {});
    },
    editEvent() {
      const event = this.item;

      const item = {
        ...event,
        start: event.isAllDay ? event.start.split(' ', 1)[0] : event.start,
        end: event.isAllDay ? null : event.end,
      };

      this.changeModal({
        id: 'createActivity',
        status: true,
        isEdit: true,
        item,
      });
    },
    changeStatus(id, status) {
      if (!status) {
        this.isOpenModal = true;
      } else {
        this.saveEventIncomplete(id);
      }
    },
    typeHistory(typeItem) {
      if (typeItem === 'COMPANY') {
        return {
          query: GET_COMPANY_HISTORY,
          variables: {
            companyId: this.itemId,
          },
        };
      }
      if (typeItem === 'DEAL') {
        return {
          query: GET_DEAL_HISTORY,
          variables: {
            dealId: this.itemId,
          },
        };
      }
      // DEFAULT typeItem === 'CONTACT'
      return {
        query: GET_CONTACT_HISTORY,
        variables: {
          contactId: this.itemId,
        },
      };
    },
    saveCompleteMutation({ id, status, comments }) {
      this.isLoadingComplete = true;
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
          this.$emit('updateHistory');
          this.isLoadingComplete = false;
          this.isOpenModal = false;
        })
        .catch(() => {
          // Error
          this.isLoadingComplete = false;
          this.isOpenModal = false;
          const error =
            'No se pudo actualizar el estado de la actividad, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    saveEventIncomplete(id) {
      this.saveCompleteMutation({ id, status: 'PENDING' });
    },
    cancelComplete() {
      this.isOpenModal = false;
    },
    saveComplete({ status, comments }) {
      this.isLoadingComplete = true;
      const { id } = this.item;
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
    updateHistory() {
      this.$emit('updateHistory');
    },
  },
};
</script>
