<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardAverageDaysInPipelineFilter
        :defaultFilter="filters.filtersConfig"
      ></CardAverageDaysInPipelineFilter>
    </template>
    <template #chart>
      <CardAverageDaysInPipelineData
        :defaultFilter="filters.filtersConfig"
      ></CardAverageDaysInPipelineData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardAverageDaysInPipelineData from '@/components/charts/cards/CardAverageDaysInPipelineData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardAverageDaysInPipelineFilter from '@/components/charts/cards/CardAverageDaysInPipelineFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardAverageDaysInPipelineModal',
  components: {
    CardAverageDaysInPipelineData,
    TableDeals,
    CardAverageDaysInPipelineFilter,
  },
  mixins: [cardsModalMixin],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Sin título',
    },
    titleRegular: {
      type: String,
      default: '',
    },
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
            users: [],
            pipeline: {},
            periodPredefined: ['THIS_MONTH'],
            periodRange: {
              start: '',
              end: '',
            },
            periodRangeToCompare: {
              period: '',
              start: '',
              end: '',
            },
            ownerToCompare: {
              id: '',
            },
          },
          filtersTable: {
            users: [],
            pipelines: [],
            periodRange: {
              start: '',
              end: '',
            },
            dealStatus: '',
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
