<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardRottenDealsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardRottenDealsFilter>
    </template>
    <template #chart>
      <CardRottenDealsData
        :defaultFilter="filters.filtersConfig"
      ></CardRottenDealsData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardRottenDealsFilter from '@/components/charts/cards/CardRottenDealsFilter.vue';
import CardRottenDealsData from '@/components/charts/cards/CardRottenDealsData.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardRottenDealsModal',
  components: {
    TableDeals,
    CardRottenDealsFilter,
    CardRottenDealsData,
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
