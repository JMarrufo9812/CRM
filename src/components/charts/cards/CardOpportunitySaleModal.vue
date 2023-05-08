<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardOpportunitySaleFilter
        :defaultFilter="filters.filtersConfig"
      ></CardOpportunitySaleFilter>
    </template>
    <template #chart>
      <CardOpportunitySaleData
        :defaultFilter="filters.filtersConfig"
      ></CardOpportunitySaleData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardOpportunitySaleData from '@/components/charts/cards/CardOpportunitySaleData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardOpportunitySaleFilter from '@/components/charts/cards/CardOpportunitySaleFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardOpportunitySaleModal',
  components: {
    CardOpportunitySaleData,
    TableDeals,
    CardOpportunitySaleFilter,
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
            user: {},
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
