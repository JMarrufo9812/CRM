<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardConvertionRateFilter
        :defaultFilter="filters.filtersConfig"
      ></CardConvertionRateFilter>
    </template>
    <template #chart>
      <CardConvertionRateData
        :defaultFilter="filters.filtersConfig"
      ></CardConvertionRateData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardConvertionRateFilter from '@/components/charts/cards/CardConvertionRateFilter.vue';
import CardConvertionRateData from '@/components/charts/cards/CardConvertionRateData.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardConvertionRateModal',
  components: {
    TableDeals,
    CardConvertionRateFilter,
    CardConvertionRateData,
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
            filterBy: 'count',
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
