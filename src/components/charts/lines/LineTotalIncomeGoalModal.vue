<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineTotalIncomeGoalFilter
        :defaultFilter="filters.filtersConfig"
      ></LineTotalIncomeGoalFilter>
    </template>
    <template #chart>
      <LineTotalIncomeGoalData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineTotalIncomeGoalData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import LineTotalIncomeGoalFilter from '@/components/charts/lines/LineTotalIncomeGoalFilter.vue';
import LineTotalIncomeGoalData from '@/components/charts/lines/LineTotalIncomeGoalData.vue';
import { linesModalMixin } from '@/mixins/charts/linesMixin';

export default {
  name: 'LineTotalIncomeGoalModal',
  components: {
    LineTotalIncomeGoalFilter,
    LineTotalIncomeGoalData,
  },
  mixins: [linesModalMixin],
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
            filterTime: 'WEEKS',
            users: [],
            pipeline: {},
            periodRange: {
              start: '',
              end: '',
            },
            periodPredefined: ['THIS_MONTH'],
            periodRangeToCompare: {
              period: '',
              start: '',
              end: '',
            },
            ownersToCompare: [],
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
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped></style>
