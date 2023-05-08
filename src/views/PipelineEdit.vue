<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10" class="white py-6 pl-12">
        <v-text-field
          v-show="!isLoadingPage"
          v-model="editPipeline.name"
          class="input-width-20"
          label="Nombre de Embudo"
          outlined
          maxlength="30"
          hide-details="auto"
          dense
          append-icon="mdi-pencil"
        ></v-text-field>
        <v-skeleton-loader
          v-show="isLoadingPage"
          type="button"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="2" align-self="start" align="end" class="white">
        <v-menu offset-y ransition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn
              class="my-4 mr-8 white--text"
              color="secondary"
              fab
              depressed
              small
              v-on="on"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="$can(UPDATE, PERMISSIONS_PIPELINES)"
              :disabled="editPipeline.stages.length >= 15"
              @click="addStage"
            >
              <v-icon left>mdi-view-carousel-outline</v-icon>
              {{
                editPipeline.stages.length >= 15
                  ? 'Limite de etapas superado'
                  : 'Nueva Etapa'
              }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col v-if="isError">
        <v-card height="800">
          <BaseErrorComponent :info="infoError" />
        </v-card>
      </v-col>
      <v-col v-show="isLoadingPage" v-for="(item, index) in 4" :key="index">
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-card v-show="!isLoadingPage" class="mt-12 ml-10 stage-container" flat>
      <draggable
        :group="{ name: 'stages', put: true }"
        v-model="editPipeline.stages"
        :animation="200"
        @change="changeOrderStage"
        class="d-flex"
      >
        <v-card
          v-for="(stage, index) in editPipeline.stages"
          :key="index"
          width="100%"
          min-width="300"
          height="90%"
          tile
          class="justify-center flex-column mx-6 mb-6 stage-edit"
        >
          <v-card-title class="stage-header-edit">
            {{ stage.name }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              v-model="stage.name"
              label="Nombre de etapa"
              class="my-10"
              outlined
              maxlength="25"
              counter="25"
            ></v-text-field>
            <v-text-field
              v-model="stage.probability"
              label="Probabilidad de cierre %"
              class="mb-10"
              outlined
              :min="0"
              :max="100"
              v-mask="['###%', '##.##%']"
              @change="
                if (parseInt(stage.probability, 10) > 100) {
                  stage.probability = '100';
                } else if (parseInt(stage.probability, 10) < 0) {
                  stage.probability = '0';
                }
              "
            ></v-text-field>
            <v-text-field
              v-model.number="stage.maxDays"
              :min="0"
              :max="365"
              type="number"
              label="Días de estancamiento"
              outlined
              v-mask="'###'"
              @change="
                if (stage.maxDays > 365) {
                  stage.maxDays = 365;
                } else if (stage.maxDays < 0) {
                  stage.maxDays = 0;
                }
              "
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center stage-actions">
            <v-btn
              v-if="$can(UPDATE, PERMISSIONS_PIPELINES)"
              @click="deleteStageConfirmation(stage)"
              :disabled="editPipeline.stages.length <= 2"
              class="button-delete-stage mb-7"
              color="red"
              width="60%"
              outlined
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </draggable>
    </v-card>
    <v-col align="end" v-show="!isLoadingPage">
      <v-btn
        @click="confirmBack"
        class="mr-8"
        large
        tile
        outlined
        color="primary"
      >
        Cancelar
      </v-btn>
      <v-btn
        v-if="$can(UPDATE, PERMISSIONS_PIPELINES)"
        large
        tile
        normal
        color="secondary"
        :loading="isLoading"
        @click="updateHandler()"
      >
        Guardar
      </v-btn>
    </v-col>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteStageWithoutDeals"
    />
    <ModalDeleteStage
      :stages="stagesToSelect"
      :modalHandler="modalDeleteStage"
      @cancel="modalHandlerDeleteStage"
      @confirm="deleteStageWithDeals"
    />
    <BaseModalAlert
      :modalHandler="modalAlert"
      @confirm="backPipeline"
      @close="modalHandlerAlert"
    ></BaseModalAlert>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import ability from '@/services/ability';
import { UPDATE } from '@/constants/methods';
import { PERMISSIONS_PIPELINES } from '@/constants/permissions';
import { GET_PIPELINE_EDIT } from '@/graphql/querys/pipelinesQuery';
import {
  UPDATE_PIPELINE,
  DELETE_STAGE,
} from '@/graphql/mutations/pipelinesMutations';
import { UTIL_ORDER } from '@/helpers/utils';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'PipelineEdit',
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    ModalDeleteStage: () =>
      import('@/components/pipelines/ModalDeleteStage.vue'),
    draggable,
  },
  mixins: [modalsAlertsMixin],
  data() {
    return {
      PERMISSIONS_PIPELINES,
      UPDATE,
      originalPipeline: {},
      editPipeline: { stages: [] },
      modalDeleteStage: { isOpen: false, isLoading: false, infoDelete: {} },
      stagesToDelete: [],
      isLoading: false,
      isLoadingPage: true,
      isError: false,
      infoError: {
        icon: 'mdi-alert',
        title: 'error',
        message: 'No se ha podido cargar los tratos, contacte con el soporte',
      },
    };
  },
  computed: {
    stagesToSelect() {
      return this.editPipeline.stages.filter((stage) => stage.id);
    },
  },
  created() {
    const pipeline = this.$route.params.id
      ? this.$route.params.id
      : 'no se encontro id';
    this.getPipeline(pipeline);
  },
  methods: {
    changeOrderStage({ moved: { newIndex, oldIndex } }) {
      const pipelineCopy = JSON.parse(JSON.stringify(this.editPipeline.stages));
      const oldStage = pipelineCopy.find((item, index) => index === oldIndex);
      const newStage = pipelineCopy.find((item, index) => index === newIndex);
      pipelineCopy[oldIndex] = oldStage;
      pipelineCopy[newIndex] = newStage;
      const stages = pipelineCopy.map((stage, index) => {
        stage.order = index + 1; // eslint-disable-line
        return {
          id: stage.id,
          name: stage.name,
          deals: stage.deals,
          probability: stage.probability,
          maxDays: stage.maxDays,
          order: stage.order,
        };
      });
      this.editPipeline.stages = stages;
    },
    getPipeline(pipelineId) {
      this.$apollo
        .query({
          query: GET_PIPELINE_EDIT,
          fetchPolicy: 'no-cache',
          variables: {
            pipelineId,
          },
        })
        .then(
          ({
            data: {
              pipeline: { id, name, stages },
            },
          }) => {
            // eslint-disable-next-line
            stages = stages.map((stage) => {
              // eslint-disable-next-line
              delete stage.__typename;
              return stage;
            });
            const orderStages = UTIL_ORDER({
              listItems: stages,
              orderBy: 'ASC',
              nextElement: 'order',
            });
            this.editPipeline = { id, name, stages: orderStages };
            this.originalPipeline = {
              id,
              name,
              stages: JSON.parse(JSON.stringify(orderStages)),
            };
            this.isLoadingPage = false;
          },
        )
        .catch(() => {
          this.isError = true;
          this.infoError = {
            icon: 'mdi-alert-outline',
            title: `Error`,
            message: 'No se ha podido cargar el embudo, contacte con soporte',
          };
        });
    },
    updateHandler() {
      this.isLoading = true;

      if (this.stagesToDelete.length > 0) {
        this.stagesToDelete.forEach(({ fromStage, toStage }) => {
          this.deleteStage(fromStage, toStage);
        });
        this.stagesToDelete = [];
      }

      const input = { id: this.editPipeline.id, stages: [] };
      // cuando cambia el nombre del embudo
      if (this.originalPipeline.name !== this.editPipeline.name) {
        input.name = this.editPipeline.name;
      }
      // reoconoce los cambios en cada uno de los stages
      const stagesEditPipeline = JSON.parse(
        JSON.stringify(this.editPipeline.stages),
      );

      const getDifferences = stagesEditPipeline
        .filter(
          (stageEdit) =>
            !this.originalPipeline.stages.some(
              ({ name, probability, maxDays, order }) =>
                name === stageEdit.name &&
                probability === stageEdit.probability &&
                maxDays === stageEdit.maxDays &&
                order === stageEdit.order,
            ),
        )
        .map((stage) => {
          if (typeof stage.maxDays === 'string') {
            // eslint-disable-next-line
            stage.maxDays = 0;
          }
          return stage;
        });

      if (
        getDifferences.length === 0 &&
        stagesEditPipeline.length !== this.originalPipeline.stages.length
      ) {
        input.stages = this.editPipeline.stages.map(({ id }, index) => {
          return { id, order: index + 1 };
        });
      }

      if (getDifferences.length > 0) {
        stagesEditPipeline.forEach((stage, index) => {
          if (getDifferences.some(({ id }) => id === stage.id)) {
            const stageEdited = getDifferences.find(
              ({ id }) => id === stage.id,
            );
            delete stageEdited.deals;
            stageEdited.order = index + 1;
            // eslint-disable-next-line
            input.stages.push(stageEdited);
          } else {
            input.stages.push({ id: stage.id, order: index + 1 });
          }
        });
      }

      if (input.stages.length === 0) delete input.stages;

      this.updatePipeline(input);
    },
    updatePipeline(input) {
      if (ability.can(UPDATE, PERMISSIONS_PIPELINES)) {
        this.$apollo
          .mutate({
            mutation: UPDATE_PIPELINE,
            variables: {
              input,
            },
          })
          .then(
            ({
              data: {
                updatePipeline: { id },
              },
            }) => {
              this.$router.push({
                name: 'pipeline-id',
                params: { id },
              });
            },
          )
          .catch(() => {
            this.isLoading = false;
            const error = `Error no se ha podido actualizar el embudo, intente de nuevo o contacte a soporte`;
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    confirmBack() {
      this.modalHandlerAlert({
        isOpen: true,
        isLoading: false,
        message: {
          text: 'Si sale en este momento su configuración se perderá',
        },
        info: {},
      });
    },
    backPipeline() {
      window.history.back();
    },
    modalHandlerDeleteStage({ isOpen, isLoading, infoDelete }) {
      this.modalDeleteStage = { isOpen, isLoading, infoDelete };
    },
    deleteStageConfirmation(stage) {
      if (stage.deals?.length > 0) {
        this.modalHandlerDeleteStage({
          isOpen: true,
          isLoading: false,
          infoDelete: {
            fromStage: stage.id,
          },
        });
      } else {
        this.modalHandlerDelete({
          isOpen: true,
          isLoading: false,
          message: {
            nameItem: `La etapa ${stage.name}`,
            text: 'será eliminada del embudo',
          },
          infoDelete: {
            fromStage: stage.id,
          },
        });
      }
    },
    deleteStageWithoutDeals({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      const { fromStage } = infoDelete;
      this.stagesToDelete.push({ existDeals: false, fromStage });
      this.editPipeline.stages = this.editPipeline.stages.filter(
        (stage) => stage.id !== fromStage,
      );
      this.modalHandlerDelete({
        isOpen: false,
        isLoading,
        message,
        infoDelete,
      });
    },
    deleteStageWithDeals({ isOpen, isLoading, message, infoDelete }) {
      const { fromStage, toStage } = infoDelete;
      this.modalHandlerDeleteStage({ isOpen, isLoading, message, infoDelete });
      this.stagesToDelete.push({ existDeals: true, fromStage, toStage });
      this.editPipeline.stages = this.editPipeline.stages.filter(
        (stage) => stage.id !== fromStage,
      );
      this.modalHandlerDeleteStage({
        isOpen: false,
        isLoading: false,
        message: {},
        infoDelete: {},
      });
    },
    deleteStage(fromStage, toStage) {
      if (ability.can(UPDATE, PERMISSIONS_PIPELINES)) {
        const input = {};
        input.fromStage = fromStage;
        if (toStage) input.toStage = toStage;
        this.$apollo
          .mutate({
            mutation: DELETE_STAGE,
            variables: {
              input,
            },
          })
          .then(() => {
            this.reorderStages();
          })
          .catch(() => {
            const error =
              'Error, no se ha podido eliminar la etapa, intente de nuevo';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    reorderStages() {
      this.editPipeline.stages = this.editPipeline.stages.map(
        (stage, index) => {
          stage.order = index + 1; // eslint-disable-line
          return stage;
        },
      );
    },
    addStage() {
      const newStage = {
        name: 'Nueva Etapa',
        probability: '0',
        maxDays: 0,
        order: 0,
      };
      this.editPipeline.stages.push(newStage);
      this.reorderStages();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{  .stage-container, .stage-edit, .stage-header-edit } from ../../../scss/components/stage';
@import '{  .input-width-20 } from ../../../scss/components/input';
@import '{ .v-skeleton-loader__image .v-skeleton-loader__button  } from ../../../scss/views/pipeline.edit';
</style>
