<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardWonDealsEarningValueFilter
        :defaultFilter="filters.filtersConfig"
      ></CardWonDealsEarningValueFilter>
    </template>
    <template #chart>
      <CardWonDealsEarningValueData
        :defaultFilter="filters.filtersConfig"
      ></CardWonDealsEarningValueData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardWonDealsEarningValueData from '@/components/charts/cards/CardWonDealsEarningValueData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardWonDealsEarningValueFilter from '@/components/charts/cards/CardWonDealsEarningValueFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardWonDealsEarningValueModal',
  components: {
    CardWonDealsEarningValueData,
    TableDeals,
    CardWonDealsEarningValueFilter,
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
