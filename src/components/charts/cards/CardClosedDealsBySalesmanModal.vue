<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardClosedDealsBySalesmanFilter
        :defaultFilter="filters.filtersConfig"
      ></CardClosedDealsBySalesmanFilter>
    </template>
    <template #chart>
      <CardClosedDealsBySalesmanData
        :defaultFilter="filters.filtersConfig"
      ></CardClosedDealsBySalesmanData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardClosedDealsBySalesmanData from '@/components/charts/cards/CardClosedDealsBySalesmanData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardClosedDealsBySalesmanFilter from '@/components/charts/cards/CardClosedDealsBySalesmanFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardClosedDealsBySalesmanModal',
  components: {
    CardClosedDealsBySalesmanData,
    TableDeals,
    CardClosedDealsBySalesmanFilter,
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
