<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardNewDealsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardNewDealsFilter>
    </template>
    <template #chart>
      <CardNewDealsData
        :defaultFilter="filters.filtersConfig"
      ></CardNewDealsData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardNewDealsFilter from '@/components/charts/cards/CardNewDealsFilter.vue';
import CardNewDealsData from '@/components/charts/cards/CardNewDealsData.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardNewDealsModal',
  components: {
    TableDeals,
    CardNewDealsFilter,
    CardNewDealsData,
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
