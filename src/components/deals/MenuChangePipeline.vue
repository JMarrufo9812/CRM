<template>
  <v-menu
    v-model="menu"
    bottom
    offset-y
    max-width="300"
    nudge-bottom="10"
    :close-on-content-click="false"
    :disabled="!((canEdit || canEditOthers) && !deal.isDelete)"
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <v-btn
          outlined
          :class="{
            normalCursor: !((canEdit || canEditOthers) && !deal.isDelete),
          }"
        >
          {{ deal.pipeline ? deal.pipeline.name : '' }}
          <v-icon v-if="(canEdit || canEditOthers) && !deal.isDelete">
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </span>
    </template>

    <v-card>
      <v-card-title class="py-1 font-weight-bold"></v-card-title>
      <v-card-text>
        <p>Cambiar Embudo</p>
        <div>
          <v-select
            v-model="pipelineSelected"
            :items="pipelines"
            item-text="name"
            item-value="id"
            :return-object="true"
            prepend-icon="mdi-view-column"
            label="Embudo"
            class="mb-6"
            outlined
            dense
            hide-details="auto"
          ></v-select>
          <div v-if="viewStages">
            <span>
              <v-icon class="mr-4">mdi-view-carousel-outline</v-icon>
              Etapa
            </span>
            <div class="Pipeline py-3 pl-8">
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
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn color="primary" outlined small @click="cancel" class="mr-3">
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!viewStages"
          :loading="isLoading"
          color="secondary"
          small
          @click="outData"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import { PERMISSIONS_DEALS } from '@/constants/permissions';

export default {
  name: 'MenuChangePipeline',
  props: {
    deal: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      pipelineSelected: { id: '', name: '', stages: [] },
      stageSelected: { id: '' },
      PERMISSIONS_DEALS,
      UPDATE,
      UPDATE_OTHERS,
    };
  },
  watch: {
    isLoading(value) {
      if (!value) {
        this.menu = false;
      }
    },
    menu(value) {
      if (value) {
        this.pipelineSelected = JSON.parse(JSON.stringify(this.deal.pipeline));
      }
    },
    pipelineSelected(pipeline) {
      if (pipeline && this.viewStages) {
        this.selectStage(0, pipeline.stages[0]);
      }
    },
  },
  computed: {
    viewStages() {
      if (this.pipelineSelected?.id !== this.deal.pipeline?.id) return true;
      return false;
    },
    canEdit() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_DEALS, { authorId: this.ownerId || '' }),
      );
    },
    canEditOthers() {
      if (!this.canEdit) {
        return (
          ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
          !ability.can(
            UPDATE_OTHERS,
            subject(PERMISSIONS_DEALS, {
              authorId: this.ownerId || '',
            }),
          )
        );
      }
      return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
    },
  },
  methods: {
    outData() {
      const input = {
        pipelineId: this.pipelineSelected.id,
        stageId: this.stageSelected.id,
      };
      this.$emit('outData', input);
    },
    cancel() {
      this.menu = false;
    },
    selectStage(index, stageSelected) {
      this.pipelineSelected.stages = this.pipelineSelected.stages.map(
        (stage, stageIndex) => {
          // si es menor que el index done es = true
          stage.done = stageIndex <= index; // eslint-disable-line
          return stage;
        },
      );
      this.stageSelected = stageSelected;
    },
  },
  apollo: {
    pipelines: {
      query: GET_PIPELINES,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .pipeline } from ../../../../scss/components/menu.change.pipeline';
.normalCursor:hover {
  cursor: default;
}
</style>
