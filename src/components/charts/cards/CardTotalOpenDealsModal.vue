<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardTotalOpenDealsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardTotalOpenDealsFilter>
    </template>
    <template #chart>
      <CardTotalOpenDealsData
        :defaultFilter="filters.filtersConfig"
      ></CardTotalOpenDealsData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardTotalOpenDealsFilter from '@/components/charts/cards/CardTotalOpenDealsFilter.vue';
import CardTotalOpenDealsData from '@/components/charts/cards/CardTotalOpenDealsData.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardTotalOpenDealsModal',
  components: {
    TableDeals,
    CardTotalOpenDealsFilter,
    CardTotalOpenDealsData,
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
