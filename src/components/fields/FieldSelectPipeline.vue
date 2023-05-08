<template>
  <div>
    <v-select
      v-model="pipelineSelected"
      :prepend-icon="field.icon ? field.icon : 'mdi-view-column'"
      :dense="inputProps ? inputProps.isDense : false"
      :items="pipelines"
      :item-text="({ name }) => name"
      item-value="id"
      :return-object="true"
      :rules="field.isRequired ? rules.isRequiredObject : []"
      outlined
      hide-details="auto"
      :class="[
        inputProps ? inputProps.class : '',
        field.isRequired ? 'required' : '',
      ]"
      :label="field.label || 'Embudo'"
    ></v-select>
    <div v-if="pipelineSelected.id !== ''" class="mt-5">
      <span>
        <v-icon class="mr-4">mdi-view-carousel-outline</v-icon>
        Etapa
        <b v-show="field.isRequired" class="red--text">
          *
        </b>
      </span>
      <div class="Pipeline py-3 pl-8">
        <div class="Pipeline__stages open">
          <ul>
            <li
              v-for="(stage, index) in stages"
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
</template>

<script>
import { GET_PIPELINES } from '@/graphql/querys/pipelinesQuery';
import { rulesMixin } from '@/mixins/rulesMixin';
import { UTIL_ORDER } from '@/helpers/utils';

export default {
  name: 'FieldSelect',
  mixins: [rulesMixin],
  props: {
    resetHandler: {
      type: Boolean,
      default: false,
    },
    field: {
      type: Object,
      required: true,
    },
    inputProps: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      // ¡¡ declarar vacios los props evita errores de reactividad !!
      pipelineSelected: { id: '', name: '', stages: [] },
      stageSelected: {},
      stages: [],
    };
  },
  created() {
    if (this.field.defaultValue) this.addDefaultValue();
  },
  watch: {
    resetHandler(value) {
      if (!value) this.resetValues();
      else if (this.field.defaultValue && value) {
        this.addDefaultValue();
      }
    },
    pipelineSelected(value) {
      if (Object.keys(value).length !== 0) {
        this.stages = UTIL_ORDER({
          listItems: value.stages,
          orderBy: 'ASC',
          nextElement: 'order',
        });
        const [stage] = this.stages;
        stage.done = true;
        this.selectStage(0, stage);
      }
    },
    // actualiza el valor del input
    stageSelected(value) {
      if (Object.keys(value).length !== 0) {
        const { id: stageId } = value;

        this.field.value = { stageId, pipelineId: this.pipelineSelected.id };
      }
    },
  },
  methods: {
    selectStage(index, stageSelected) {
      this.stages = this.stages.map((stage, stageIndex) => {
        // si es menor que el index done es = true
        stage.done = stageIndex <= index; // eslint-disable-line
        return stage;
      });
      this.stageSelected = stageSelected;
    },
    addDefaultValue() {
      if (this.field.defaultValue.pipeline) {
        const { id, name, stages } = this.field.defaultValue.pipeline;
        // ¡¡ evita error de reactividad cuando se crea un nuevo embudo !!
        this.pipelineSelected = {
          id,
          name,
          stages,
        };
      }
      if (this.field.defaultValue.stage) {
        const index = this.field.defaultValue.stage.order - 1;
        const { stage } = this.field.defaultValue;
        stage.done = true;
        this.selectStage(index, stage);
      }
    },
    resetValues() {
      this.field.defaultValue = {};
      this.field.value = {};
      this.stageSelected = {};
      this.pipelineSelected = {};
      this.stages = [];
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
.Pipeline {
  position: relative;

  .Pipeline__stages {
    position: relative;
    display: table;
    height: 24px;
    overflow: visible;
    ul {
      width: 100%;
      display: table;
      border-collapse: collapse;
      table-layout: fixed;
      height: 24px;
      -ms-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
      overflow: hidden;
      list-style: none;
    }
  }

  .Stage {
    position: relative;
    background: #e5e5e5;
    display: table-cell;
    text-align: left;
    line-height: 24px;
    vertical-align: middle;
    color: #fff;
    text-align: center;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .Stage__content {
      position: relative;
    }

    .Stage__name {
      font: 400 13px/16px Source Sans Pro, sans-serif;
      display: inline-block;
      position: relative;
      left: 4px;
    }

    .Stage__separator {
      width: 5px;
      height: 30px;
      position: absolute;
      top: -5px;
      left: 0;
      overflow: hidden;

      &:after {
        width: 23px;
        height: 22px;
        position: absolute;
        right: -7px;
        top: 5px;
        border-top: 3px solid #fff;
        border-right: 3px solid #fff;
        transform: scaleX(0.3) rotate(45deg);
        content: ' ';
        cursor: pointer;
        background: #e5e5e5;
      }
    }

    &:first-child .Stage__separator {
      display: none;
    }

    &.active {
      background: #2e2e2f;

      .Stage__separator {
        &:after {
          background: #2e2e2f;
        }
      }
    }

    &.active + .Stage .Stage__separator:after {
      border-top: 3px solid #fff;
      border-right: 3px solid #fff;
      background: #2e2e2f;
    }
  }
}
</style>
