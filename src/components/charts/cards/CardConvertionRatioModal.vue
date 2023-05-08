<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardConvertionRatioFilter
        :defaultFilter="filters.filtersConfig"
      ></CardConvertionRatioFilter>
    </template>
    <template #chart>
      <CardConvertionRatioData
        :defaultFilter="filters.filtersConfig"
      ></CardConvertionRatioData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardConvertionRatioData from '@/components/charts/cards/CardConvertionRatioData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardConvertionRatioFilter from '@/components/charts/cards/CardConvertionRatioFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardConvertionRatioModal',
  components: {
    CardConvertionRatioData,
    TableDeals,
    CardConvertionRatioFilter,
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
