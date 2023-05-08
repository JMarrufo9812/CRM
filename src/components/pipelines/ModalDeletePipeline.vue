<template>
  <v-dialog persistent v-model="modalHandler.isOpen" max-width="500">
    <v-card width="500">
      <div class="d-flex justify-center pt-6">
        <v-icon color="warning" x-large>
          mdi-alert
        </v-icon>
      </div>
      <v-card-title class="justify-center">
        <span class="title-modal">
          Este embudo contiene tratos
        </span>
      </v-card-title>
      <v-card-text>
        <P class="d-flex justify-center">
          selecciona que deseas hacer
        </P>
        <v-radio-group v-model="isDeleteDeals">
          <v-radio
            :class="isDeleteDeals ? 'pb-4' : ''"
            label="Mover a otro embudo"
            :value="false"
          ></v-radio>
          <v-form v-model="isValidate" ref="formDeal">
            <v-select
              v-if="!isDeleteDeals"
              v-model="pipelineSelected"
              :items="pipelines"
              :item-text="(pipeline) => pipeline.name"
              :return-object="true"
              :rules="rules.isRequiredObject"
              label="selecciona un embudo"
              class="mt-6"
              outlined
            ></v-select>
          </v-form>
          <div v-if="viewStages" class="mb-6">
            <span>
              Selecciona una etapa
            </span>
            <div class="Pipeline py-36-">
              <div class="Pipeline__stages open">
                <ul>
                  <li
                    v-for="(stage, index) in pipelineSelected.stages"
                    :key="index"
                    :class="stage.done ? 'active Stage' : 'Stage'"
                    @click="selectStage(index, stage)"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div class="Stage__content" v-bind="attrs" v-on="on">
                          <div class="Stage__name"></div>
                          <span class="Stage__separator "></span>
                        </div>
                      </template>
                      <span class="d-block font-weight-bold">
                        {{ stage.name }}
                      </span>
                    </v-tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <v-radio :value="true">
            <template v-slot:label>
              <p class="mb-0">
                Eliminar todos los tratos
              </p>
            </template>
          </v-radio>
          <p v-if="isDeleteDeals" class="font-weight-bold secondary--text pl-8">
            <strong>
              ¡Atención!
            </strong>
            Los tratos se eliminarán de manera definitiva esto significa que no
            podrá restaurarlos en el futuro y afectará a todos los historiales
          </p>
        </v-radio-group>
      </v-card-text>
      <v-card-actions class="pa-5 justify-center">
        <v-btn
          width="40%"
          tile
          class="mr-4"
          color="primary"
          outlined
          @click="cancel"
        >
          Cancelar
        </v-btn>
        <v-btn
          width="40%"
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
  name: 'ModalDeletePipeline',
  mixins: [rulesMixin],
  props: {
    pipelines: {
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
      pipelineSelected: {},
      isDeleteDeals: false,
      isValidate: false,
      viewStages: false,
    };
  },
  watch: {
    isDeleteDeals(value) {
      if (value) {
        delete this.modalHandler.infoDelete.toPipeline;
        delete this.modalHandler.infoDelete.toStage;
        this.pipelineSelected = {};
        this.viewStages = false;
      }
    },
    modalHandler({ isOpen }) {
      if (!isOpen) this.resetValues();
    },
    pipelineSelected(value) {
      if (Object.keys(value).length > 0) {
        this.modalHandler.infoDelete.toPipeline = value.id;
        this.selectStage(0, value.stages[0]);
        this.viewStages = true;
      }
    },
  },
  methods: {
    confirm() {
      if (this.$refs.formDeal.validate()) {
        console.log(this.modalHandler.infoDelete);
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
      this.$refs.formDeal.reset();
    },
    resetValues() {
      this.isDeleteDeals = false;
      this.viewStages = false;
      this.pipelineSelected = {};
      this.$refs.formDeal.resetValidation();
    },
    selectStage(index, stageSelected) {
      this.pipelineSelected.stages = this.pipelineSelected.stages.map(
        (stage, stageIndex) => {
          // si es menor que el index done es = true
          stage.done = stageIndex <= index; // eslint-disable-line
          return stage;
        },
      );

      this.modalHandler.infoDelete.toStage = stageSelected.id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{  .title-modal .pipeline .Stage__separator .Stage__separator .active} from ../../../../scss/components/modal.delete.pipeline';
</style>
