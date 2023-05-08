<template>
  <div class="d-flex">
    <v-card tile class="mr-2 add-lost-reason-box" width="19em" height="28em">
      <p class="title-lost-reason-settings text-center">
        Configuraciones razones de pérdida para tratos
      </p>
      <div class="d-flex flex-column px-12 pt-6">
        <v-text-field
          v-model="newReason"
          maxlength="25"
          counter
          dense
          outlined
          label="Agregar razón"
        ></v-text-field>
        <v-btn
          :disabled="validateReason"
          :loading="isLoadingCreate"
          @click="createReason(newReason)"
          color="secondary"
        >
          Agregar
        </v-btn>
      </div>
    </v-card>
    <v-card tile width="15.5em" height="28em">
      <v-progress-linear
        v-if="isLoadingGet"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <BaseErrorComponent v-if="isErrorGetReasons" :info="infoError" />
      <p
        v-if="lostReasons.length === 0 && !isErrorGetReasons && !isLoadingGet"
        class="text-center px-10 pt-12"
      >
        Aún no hay razones de pérdida creadas
      </p>
      <div
        class="d-flex justify-center py-1"
        v-if="lostReasons.length > 0 && !isErrorGetReasons"
      >
        <span class="title-lost-reasons">Razones creadas</span>
      </div>
      <v-divider
        v-if="lostReasons.length > 0 && !isErrorGetReasons"
      ></v-divider>
      <v-card
        v-if="lostReasons.length > 0 && !isErrorGetReasons"
        class="scroll"
        height="90%"
        flat
      >
        <v-card
          class="d-flex justify-space-between ma-4 py-2"
          v-for="(reason, i) in lostReasons"
          :key="i"
        >
          <p class="mb-0 mx-2 reason-text">
            {{ reason.reason }}
          </p>
          <div class="d-flex align-center">
            <v-btn
              class="mt-1 mr-2"
              color="grey"
              outlined
              @click.stop="deleteReasonConfirmation(reason.id)"
              x-small
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <v-edit-dialog
              cancel-text="Cancelar"
              save-text="Guardar"
              large
              @open="editReason = reason.reason"
              @cancel="editReason = ''"
              @save="
                updateReason({
                  id: reason.id,
                  reason: editReason.trim(),
                })
              "
            >
              <v-btn class="mr-2" color="secondary" x-small>
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <template v-slot:input>
                <v-text-field
                  v-model="editReason"
                  :value="reason.reason"
                  maxlength="25"
                  label="Editar"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </div>
        </v-card>
      </v-card>
    </v-card>
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteReason"
    />
  </div>
</template>

<script>
import { lostReasonMixin } from '@/mixins/lostReasonMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import {
  DELETE_LOST_REASON,
  UPDATE_LOST_REASON,
  CREATE_LOST_REASON,
} from '@/graphql/mutations/dealsMutations';

export default {
  mixins: [lostReasonMixin, modalsAlertsMixin],
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
  },
  data() {
    return {
      lostReasons: [],
      newReason: '',
      editReason: '',
      isLoadingCreate: false,
    };
  },
  computed: {
    validateReason() {
      if (
        this.newReason !== null &&
        this.newReason !== undefined &&
        this.newReason !== '' &&
        this.newReason.trim().length >= 1
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    deleteReasonConfirmation(lostReasonId) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: { nameItem: 'La razón seleccionada', text: 'será eliminada' },
        infoDelete: {
          lostReasonId,
        },
      });
    },
    deleteReason({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({
        isOpen,
        isLoading,
        message,
        infoDelete,
      });
      this.$apollo
        .mutate({
          mutation: DELETE_LOST_REASON,
          variables: {
            lostReasonId: infoDelete.lostReasonId,
          },
        })
        .then(() => {
          this.$apollo.queries.lostReasons.refetch();
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
          this.outData('SUCCESS', {
            isOpen: true,
            color: 'success',
            text: 'La razón fue eliminada',
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar la razón de pérdida intente de nuevo o contacte a soporte';
          this.outData('ERROR', {
            isOpen: true,
            error,
          });
        });
    },
    updateReason(reason) {
      if (reason.reason.trim().length > 0) {
        this.$apollo
          .mutate({
            mutation: UPDATE_LOST_REASON,
            variables: {
              input: reason,
            },
          })
          .then(() => {
            this.$apollo.queries.lostReasons.refetch();
            this.outData('SUCCESS', {
              isOpen: true,
              color: 'success',
              text: 'La razón fue actualizada',
            });
          })
          .catch(() => {
            const error =
              'No se pudo actualizar la razón de pérdida, intente de nuevo o contacte a soporte';
            this.outData('ERROR', {
              isOpen: true,
              error,
            });
          });
      } else {
        const error = 'Agrega mínimo una letra o un número';
        this.outData('ERROR', {
          isOpen: true,
          error,
        });
      }
    },
    outData(type, info) {
      if (type === 'SUCCESS') this.$emit('success', info);
      if (type === 'ERROR') this.$emit('error', info);
    },
    createReason(reason) {
      this.isLoadingCreate = true;
      this.$apollo
        .mutate({
          mutation: CREATE_LOST_REASON,
          variables: {
            input: { reason },
          },
        })
        .then(() => {
          this.$apollo.queries.lostReasons.refetch();
          this.isLoadingCreate = false;
          this.newReason = '';
        })
        .catch(() => {
          this.isLoadingCreate = false;
          const error =
            'No se pudo crear la razón de pérdida, intente de nuevo o contacte a soporte';
          this.outData('ERROR', {
            isOpen: true,
            error,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .title-lost-reason-settings, .title-lost-reasons, .reason-text, .add-lost-reason-box .field .scroll .v-skeleton-loader__image .item .icon-btn } from ../../../../scss/components/lost.reasons.settings';
</style>
