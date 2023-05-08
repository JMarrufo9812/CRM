<template>
  <v-dialog persistent v-model="modalHandler.isOpen" max-width="500">
    <v-card width="500">
      <v-card-title>
        <v-icon color="warning" x-large class="mr-12">
          mdi-alert
        </v-icon>
        <span class="text-h5 font-weight-black">
          Esta etapa contiene tratos
        </span>
      </v-card-title>
      <v-card-text class="mt-2">
        <P class="text-center font-weight-black">
          selecciona que deseas hacer
        </P>
        <v-radio-group v-model="isDeleteDeals">
          <v-radio label="Mover a otra etapa" :value="false"></v-radio>
          <v-form v-model="isValidate" ref="formDeal">
            <v-select
              v-if="!isDeleteDeals"
              v-model="modalHandler.infoDelete.toStage"
              :items="stages"
              :item-text="(stage) => stage.name"
              :item-value="(stage) => stage.id"
              :rules="rules.isRequired"
              label="selecciona una etapa"
              class="mt-6"
              outlined
            ></v-select>
          </v-form>

          <v-radio label="Eliminar todos los tratos" :value="true"></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions class="pa-5 justify-end">
        <v-btn tile class="mr-6" color="secondary" outlined @click="cancel">
          Cancelar
        </v-btn>
        <v-btn
          color="secondary"
          :loading="modalHandler.isLoading"
          tile
          @click="confirm"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'BaseModalDelete',
  mixins: [rulesMixin],
  props: {
    stages: {
      required: true,
      type: [Array, Object],
      default: () => {
        return [];
      },
    },
    modalHandler: {
      required: true,
      type: Object,
      default: () => {
        return {
          isOpen: false,
          isLoading: false,
          message: '',
          infoDelete: {},
        };
      },
    },
  },
  data() {
    return {
      isDeleteDeals: false,
      isValidate: false,
    };
  },
  watch: {
    isDeleteDeals(value) {
      if (value) delete this.modalHandler.infoDelete.toStage;
    },
    modalHandler({ isOpen }) {
      if (!isOpen) this.resetValues();
    },
  },
  methods: {
    confirm() {
      if (this.$refs.formDeal.validate()) {
        this.$emit('confirm', {
          isOpen: true,
          isLoading: true,
          infoDelete: this.modalHandler.infoDelete,
        });
      }
    },
    cancel() {
      this.$emit('cancel', {
        isOpen: false,
        isLoading: false,
        infoDelete: {},
      });
    },
    resetValues() {
      this.isDeleteDeals = false;
      delete this.modalHandler.infoDelete.toStage;
      delete this.modalHandler.infoDelete.fromStage;
      this.$refs.formDeal.resetValidation();
    },
  },
};
</script>
