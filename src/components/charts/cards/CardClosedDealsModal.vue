<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardClosedDealsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardClosedDealsFilter>
    </template>
    <template #chart>
      <CardClosedDealsData
        :defaultFilter="filters.filtersConfig"
      ></CardClosedDealsData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardClosedDealsData from '@/components/charts/cards/CardClosedDealsData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardClosedDealsFilter from '@/components/charts/cards/CardClosedDealsFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardClosedDealsModal',
  components: {
    CardClosedDealsData,
    TableDeals,
    CardClosedDealsFilter,
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
