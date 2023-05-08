<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardAdvancedDealsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardAdvancedDealsFilter>
    </template>
    <template #chart>
      <CardAdvancedDealsData
        :defaultFilter="filters.filtersConfig"
      ></CardAdvancedDealsData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardAdvancedDealsFilter from '@/components/charts/cards/CardAdvancedDealsFilter.vue';
import CardAdvancedDealsData from '@/components/charts/cards/CardAdvancedDealsData.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardAdvancedDealsModal',
  components: {
    TableDeals,
    CardAdvancedDealsFilter,
    CardAdvancedDealsData,
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
