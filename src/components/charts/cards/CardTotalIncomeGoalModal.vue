<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardTotalIncomeGoalFilter
        :defaultFilter="filters.filtersConfig"
      ></CardTotalIncomeGoalFilter>
    </template>
    <template #chart>
      <CardTotalIncomeGoalData
        :defaultFilter="filters.filtersConfig"
      ></CardTotalIncomeGoalData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import CardTotalIncomeGoalData from '@/components/charts/cards/CardTotalIncomeGoalData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import CardTotalIncomeGoalFilter from '@/components/charts/cards/CardTotalIncomeGoalFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardTotalIncomeGoalModal',
  components: {
    CardTotalIncomeGoalData,
    TableDeals,
    CardTotalIncomeGoalFilter,
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
