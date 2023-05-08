<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardIncomeLostDealsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardIncomeLostDealsFilter>
    </template>
    <template #chart>
      <CardIncomeLostDealsData
        :defaultFilter="filters.filtersConfig"
      ></CardIncomeLostDealsData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardIncomeLostDealsData from '@/components/charts/cards/CardIncomeLostDealsData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardIncomeLostDealsFilter from '@/components/charts/cards/CardIncomeLostDealsFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardIncomeLostDealsModal',
  components: {
    CardIncomeLostDealsData,
    TableDeals,
    CardIncomeLostDealsFilter,
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
