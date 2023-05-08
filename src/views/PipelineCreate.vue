<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10" class="white py-6 pl-12">
        <v-text-field
          v-show="!isLoadingPage"
          v-model="newPipeline.name"
          class="input-width-20"
          label="Nombre de Embudo"
          outlined
          maxlength="30"
          hide-details="auto"
          dense
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
              class="my-4 mr-8  white--text"
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
              :disabled="newPipeline.stages.length >= 15"
              @click="addStage"
            >
              <v-icon left>mdi-view-carousel-outline</v-icon>
              {{
                newPipeline.stages.length >= 15
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
    <v-card class="mt-12 ml-10 stage-container" flat>
      <draggable
        :group="{ name: 'stages', put: true }"
        v-model="newPipeline.stages"
        :animation="200"
        @change="changeOrderStage"
        class="d-flex"
      >
        <v-card
          v-for="(stage, index) in newPipeline.stages"
          :key="index"
          width="100%"
          min-width="300"
          height="90%"
          class="justify-center flex-column  mx-6 mb-6 stage-edit"
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
              :disabled="newPipeline.stages.length <= 2"
              @click="deleteStageConfirmation(index, stage)"
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
    <v-col align="end">
      <v-btn
        @click="confirmBack"
        class="mr-8"
        large
        tile
        outlined
        color="secondary"
      >
        Cancelar
      </v-btn>
      <v-btn
        v-if="$can(CREATE, PERMISSIONS_PIPELINES)"
        large
        tile
        normal
        color="secondary"
        :loading="isLoading"
        @click="createPipeline(newPipeline)"
      >
        Guardar
      </v-btn>
    </v-col>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="deleteStage"
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
import { CREATE } from '@/constants/methods';
import { PERMISSIONS_PIPELINES } from '@/constants/permissions';
import { GET_PIPELINES_DEFAULT } from '@/graphql/querys/pipelinesQuery';
import { CREATE_PIPELINE } from '@/graphql/mutations/pipelinesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'PipelineCreate',
  components: {
    BaseErrorComponent: () => import('@/components/ui/BaseErrorComponent.vue'),
    draggable,
  },
  mixins: [modalsAlertsMixin],
  data() {
    return {
      PERMISSIONS_PIPELINES,
      CREATE,
      newPipeline: { stages: [] },
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
  watch: {
    defaultPipelines(data) {
      if (data) {
        const [pipeline] = data;
        const cleanStages = pipeline.stages.map(
          ({ name, probability, maxDays, order }) => {
            const stageClean = { name, probability, maxDays, order };
            return stageClean;
          },
        );
        pipeline.stages = cleanStages;
        this.newPipeline = pipeline;
        this.isLoadingPage = false;
      }
    },
  },
  methods: {
    changeOrderStage({ moved: { newIndex, oldIndex } }) {
      const pipelineCopy = JSON.parse(JSON.stringify(this.newPipeline.stages));
      const oldStage = pipelineCopy.find((item, index) => index === oldIndex);
      const newStage = pipelineCopy.find((item, index) => index === newIndex);
      pipelineCopy[oldIndex] = oldStage;
      pipelineCopy[newIndex] = newStage;
      const stages = pipelineCopy.map((stage, index) => {
        stage.order = index + 1; // eslint-disable-line
        return {
          id: stage.id,
          name: stage.name,
          probability: stage.probability,
          maxDays: stage.maxDays,
          order: stage.order,
        };
      });
      this.newPipeline.stages = stages;
    },
    createPipeline({ name, stages }) {
      // eslint-disable-next-line
      stages = stages.map((stage) => {
        // eslint-disable-next-line
        delete stage.id;
        // eslint-disable-next-line
        stage.maxDays = parseInt(stage.maxDays);
        return stage;
      });
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: CREATE_PIPELINE,
          variables: {
            input: { name, stages },
          },
        })
        .then(
          ({
            data: {
              createPipeline: { id },
            },
          }) => {
            this.isLoading = false;
            this.$router.push({
              name: 'pipeline-id',
              params: { id },
            });
          },
        )
        .catch(({ graphQLErrors }) => {
          this.isLoading = false;
          const error = `Error ${graphQLErrors[0]?.statusCode} No se ha podido crear el embudo, intente de nuevo`;
          this.modalHandlerError({ isOpen: true, error });
        });
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
    deleteStageConfirmation(index, stage) {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: {
          nameItem: `La etapa ${stage.name}`,
          text: 'será eliminada del embudo',
        },
        infoDelete: {
          index,
        },
      });
    },
    deleteStage({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      this.newPipeline.stages.splice(infoDelete.index, 1);
      this.reorderStages();
      this.modalHandlerDelete({
        isOpen: false,
        isLoading,
        message,
        infoDelete,
      });
    },
    reorderStages() {
      this.newPipeline.stages = this.newPipeline.stages.map((stage, index) => {
        stage.order = index + 1; // eslint-disable-line
        return stage;
      });
    },
    addStage() {
      const newStage = {
        name: 'Nueva Etapa',
        probability: '0',
        maxDays: 0,
        order: 1,
      };
      this.newPipeline.stages.push(newStage);
      this.reorderStages();
    },
  },
  apollo: {
    defaultPipelines: {
      query: GET_PIPELINES_DEFAULT,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{  .stage-container, .stage-edit, .stage-header-edit } from ../../../scss/components/stage';
@import '{  .input-width-20 } from ../../../scss/components/input';
@import '{  .v-skeleton-loader__image .v-skeleton-loader__button } from ../../../scss/views/pipeline.edit';

::v-deep .v-skeleton-loader__image {
  height: 600px !important;
}
::v-deep .v-skeleton-loader__button {
  width: 200px !important;
  height: 50px !important;
}
</style>
