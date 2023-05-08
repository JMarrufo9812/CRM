<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <ModalValueDeal
            :deal="deal"
            :isLoading="isLoadingUpdateDeal"
            @outData="updateDeal"
          />
          <div class="d-inline-block mx-3" v-if="deal.contact">
            <v-icon color="primary">mdi-account</v-icon>
            {{ deal.contact ? deal.contact.name : '' }}
          </div>
          <div class="d-inline-block" v-if="deal.company">
            <v-icon color="primary">mdi-domain</v-icon>
            {{ deal.company ? deal.company.name : '' }}
          </div>
        </v-col>
        <v-col class="d-flex justify-end" cols="6">
          <MenuChangePipeline
            :isLoading="isLoadingUpdatePipeline"
            :ownerId="deal.owner ? deal.owner.id : ''"
            :deal="deal"
            @outData="updatePipeline"
          />
        </v-col>
        <v-col cols="12" class="pt-0">
          <Stages
            v-if="!isLoading"
            :isLoading="isLoadingUpdateStage"
            :ownerId="deal.owner ? deal.owner.id : ''"
            :deal="deal"
            @updateStage="updateStage"
          />
          <v-skeleton-loader
            v-else
            class="mx-auto"
            min-width="150px"
            type="list-item"
            tile
          ></v-skeleton-loader>
          <div class="d-flex justify-end mt-3">
            <MenuCloseDate
              :isLoading="isLoadingUpdateDeal"
              :ownerId="deal.owner ? deal.owner.id : ''"
              :dateClose="deal.expectedCloseDate"
              :dealId="deal.id ? deal.id : ''"
              :deal="deal"
              @outData="updateDeal"
            />
          </div>
        </v-col>
        <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// ability
import { subject } from '@casl/ability';
import {
  PERMISSIONS_DEALS,
  PERMISSIONS_GROUP_DEAL,
} from '@/constants/permissions';
import { UPDATE } from '@/constants/methods';
// graphql
import {
  CHANGE_DEAL_STAGE,
  CHANGE_DEAL_PIPELINE,
} from '@/graphql/mutations/dealsMutations';
// mixins
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { permissionGroupMixin } from '@/mixins/permissionGroupMixin';
import { dealsMixin } from '@/mixins/dealsMixin';

export default {
  name: 'SubHeader',
  mixins: [permissionGroupMixin, modalsAlertsMixin, dealsMixin],
  components: {
    Stages: () => import('@/components/deals/Stages.vue'),
    ModalValueDeal: () => import('@/components/deals/ModalValueDeal.vue'),
    MenuCloseDate: () => import('@/components/deals/MenuCloseDate.vue'),
    MenuChangePipeline: () =>
      import('@/components/deals/MenuChangePipeline.vue'),
  },
  props: {
    deal: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      UPDATE,
      subject,
      PERMISSIONS_DEALS,
      PERMISSIONS_GROUP_DEAL,
      isLoadingUpdatePipeline: false,
      isLoadingUpdateStage: false,
    };
  },
  computed: {
    owner() {
      if (this.deal.owner) {
        return { authorId: this.deal.owner.id || '' };
      }
      return { authorId: '' };
    },
    isCentralLoading() {
      if (this.isLoading || this.isLoadingUpdateStage) return true;
      return false;
    },
  },
  methods: {
    updateStage({ id }) {
      this.isLoadingUpdateStage = true;
      this.$apollo
        .mutate({
          // Query
          mutation: CHANGE_DEAL_STAGE,
          // Parameters
          variables: {
            input: {
              dealId: this.deal.id,
              oldStageId: this.deal.stage.id,
              newStageId: id,
            },
          },
        })
        .then(({ data: { changeDealStage } }) => {
          console.log(changeDealStage.pipeline.stages);
          this.$emit('updateItem', changeDealStage);
          this.$emit('updateHistory');
          this.isLoadingUpdateStage = false;
        })
        .catch(() => {
          const error =
            'No se pudo actualizar la etapa, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    updatePipeline({ stageId, pipelineId }) {
      this.isLoadingUpdatePipeline = true;
      const input = {
        dealId: this.deal.id,
        newPipelineId: pipelineId,
        newStageId: stageId,
      };
      this.$apollo
        .mutate({
          mutation: CHANGE_DEAL_PIPELINE,
          variables: {
            input,
          },
        })
        .then(({ data: { changeDealPipeline } }) => {
          this.$emit('updateItem', changeDealPipeline);
          this.$emit('updateHistory');
          this.isLoadingUpdatePipeline = false;
        })
        .catch(() => {
          this.isLoadingUpdatePipeline = false;
          const error =
            'No se pudo actualizar el embudo, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
};
</script>
