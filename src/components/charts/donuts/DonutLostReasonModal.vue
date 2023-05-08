<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <DonutLostReasonFilter
        :defaultFilter="filters.filtersConfig"
      ></DonutLostReasonFilter>
    </template>
    <template #chart>
      <DonutLostReasonData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></DonutLostReasonData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import BaseModalChart from '@/components/charts/layout/BaseModalChart.vue';
import DonutLostReasonFilter from '@/components/charts/donuts/DonutLostReasonFilter.vue';
import DonutLostReasonData from '@/components/charts/donuts/DonutLostReasonData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';

export default {
  name: 'DonutLostReasonModal',
  components: {
    BaseModalChart,
    DonutLostReasonFilter,
    DonutLostReasonData,
    TableDeals,
  },
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
            ownerToCompare: {},
            typeCompare: 'none',
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
