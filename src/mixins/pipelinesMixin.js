import ability from '@/services/ability';
import { DELETE_PIPELINE } from '@/graphql/mutations/pipelinesMutations';
import { DELETE } from '@/constants/methods';
import { PERMISSIONS_PIPELINES } from '@/constants/permissions';

export const pipelinesMixin = {
  methods: {
    // handler delete pipeline
    modalHandlerDeletePipeline({ isOpen, isLoading, infoDelete }) {
      this.modalDeletePipeline = { isOpen, isLoading, infoDelete };
    },
    // controla el tipo de modal de eliminacion que se abrira
    // dependiendo si existen tratos o no en el pipeline
    deletePipelineConfirmation(type, pipeline) {
      const allDeals = pipeline.stages.flatMap(({ deals }) => {
        return deals;
      });
      if (allDeals.length > 0) {
        this.pipelinesOptionsToMove = this.pipelines.filter(({ id }) => {
          return id !== this.pipelineSelected.id;
        });
        this.modalHandlerDeletePipeline({
          isOpen: true,
          isLoading: false,
          infoDelete: {
            type,
            fromPipeline: pipeline.id,
          },
        });
      } else {
        this.modalHandlerDelete({
          isOpen: true,
          isLoading: false,
          message: {
            text: 'será eliminado',
            nameItem: `El embudo ${pipeline.name}`,
          },
          infoDelete: {
            type,
            fromPipeline: pipeline.id,
          },
        });
      }
    },
    // elimina pipelines sin Tratos
    deletePipelineWithoutDeals({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });
      const { fromPipeline } = infoDelete;
      this.deletePipeline(fromPipeline);
    },
    // elimina pipelines con Tratos
    deletePipelineWithDeals({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDeletePipeline({
        isOpen,
        isLoading,
        message,
        infoDelete,
      });
      const { fromPipeline, toPipeline, toStage } = infoDelete;
      this.deletePipeline(fromPipeline, toPipeline, toStage);
    },
    deletePipeline(fromPipeline, toPipeline, toStage) {
      if (ability.can(DELETE, PERMISSIONS_PIPELINES)) {
        const input = {};
        input.fromPipeline = fromPipeline;
        if (toPipeline) input.toPipeline = toPipeline;
        if (toStage) input.toStage = toStage;
        this.$apollo
          .mutate({
            mutation: DELETE_PIPELINE,
            variables: {
              input,
            },
          })
          .then(({ data: { deletePipeline } }) => {
            this.pipelines = this.pipelines.filter(({ id }) => {
              return id !== deletePipeline.id;
            });
            const [pipeline] = this.pipelines;
            this.selectPipeline(pipeline);
            this.modalHandlerDelete({
              isOpen: false,
              isLoading: false,
              message: {},
              infoDelete: {},
            });
            if (this.modalDeletePipeline.isOpen) {
              this.modalHandlerDeletePipeline({
                isOpen: false,
                isLoading: false,
                message: {},
                infoDelete: {},
              });
            }
            this.snackbarHandler({
              isOpen: true,
              color: 'success',
              text: 'El embudo se eliminó correctamente',
            });
          })
          .catch(() => {
            const error = `Ha ocurrido un error durante la eliminacion, porfavor vuelva a intentarlo o contacte a soporte`;
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    // quita el deal del stage antigua y lo mete al nuevo retorna los stages ya actualizados
    updateViewPipelines({ stages, deal }) {
      return stages.map((stage) => {
        // eslint-disable-next-line
        stage.deals = stage.deals.filter(({ id }) => deal.id !== id);
        if (deal.stage.id === stage.id) {
          stage.deals.unshift(deal);
        }
        return stage;
      });
    },
    // elimina el deal del stage retorna los stages ya actualizados
    deleteViewPipelines({ stages, deal }) {
      return stages.map((stage) => {
        // eslint-disable-next-line
        stage.deals = stage.deals.filter(({ id }) => deal.id !== id);
        return stage;
      });
    },
  },
};
