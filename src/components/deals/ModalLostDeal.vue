<template>
  <v-dialog v-model="modalHandler.isOpen" width="430" persistent>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between primary white--text py-4"
      >
        <span>
          Perder trato
        </span>
        <v-icon @click="close" class="white--text">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text class="pt-6">
        <v-form ref="formOldReason" v-model="isValidate">
          <v-select
            v-show="!isNewReason"
            v-model="lostInfo.lostReason.id"
            :items="lostReasons"
            :menu-props="{
              closeOnContentClick: true,
            }"
            :item-text="({ reason }) => reason"
            :item-value="({ id }) => id"
            label="Motivo de pérdida"
            required
            :rules="rules.select"
            outlined
          >
            <template v-slot:no-data>
              <span></span>
            </template>
            <template v-slot:append-item>
              <v-list-item @click="newReason">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    Agregar nueva razón
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-form>
        <v-form ref="formNewReason" v-model="isValidate">
          <v-text-field
            v-show="isNewReason"
            v-model="lostInfo.lostReason.reason"
            label="Nueva razón"
            outlined
            counter
            maxlength="25"
            :rules="rules.isRequired"
          ></v-text-field>
        </v-form>

        <v-textarea
          v-model="lostInfo.comments"
          label="Comentarios"
          outlined
        ></v-textarea>
      </v-card-text>
      <v-card-actions class="pa-5 justify-center">
        <v-btn
          width="45%"
          class="mr-4"
          large
          tile
          outlined
          color="primary"
          @click="close"
        >
          Cancelar
        </v-btn>
        <v-btn
          width="45%"
          large
          tile
          normal
          color="secondary"
          @click="outData"
          :loading="modalHandler.isLoading"
        >
          Agregar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { lostReasonMixin } from '@/mixins/lostReasonMixin';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'ModalLostDeal',
  mixins: [rulesMixin, lostReasonMixin],
  props: {
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return { isOpen: false, isLoading: false };
      },
    },
  },
  data() {
    return {
      isValidate: true,
      isNewReason: false,
      reasonsMenu: false,
      lostInfo: {
        lostReason: {},
        comments: '',
      },
    };
  },
  watch: {
    modalHandler({ isOpen }) {
      if (!isOpen) this.resetValues();
      else this.$apollo.queries.lostReasons.refetch();
    },
  },
  methods: {
    newReason() {
      delete this.lostInfo.lostReason.id;
      this.isNewReason = true;
      this.reasonsMenu = false;
    },
    close() {
      this.$emit('close', { isOpen: false, isLoading: false });
    },
    outData() {
      if (this.isNewReason) this.$refs.formNewReason.validate();
      if (!this.isNewReason) this.$refs.formOldReason.validate();
      if (this.isValidate) {
        if (this.lostInfo.comments.length > 0) {
          this.lostInfo.comments = `Comentario de pérdida: ${this.lostInfo.comments}`;
        }
        this.$emit('outData', 'LOST', this.lostInfo);
      }
    },
    resetValues() {
      this.$refs.formNewReason.resetValidation();
      this.$refs.formOldReason.resetValidation();
      this.isNewReason = false;
      this.lostInfo = {
        lostReason: {},
        comments: '',
      };
    },
  },
};
</script>
