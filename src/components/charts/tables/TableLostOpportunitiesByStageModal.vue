<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <TableLostOpportunitiesByStageFilter
        :defaultFilter="filters.filtersConfig"
      ></TableLostOpportunitiesByStageFilter>
    </template>
    <template #chart>
      <TableLostOpportunitiesByStageData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></TableLostOpportunitiesByStageData>
    </template>
    <template #table>
      <TableDeals :defaultFilter="filters.filtersTable"></TableDeals>
    </template>
  </BaseModalChart>
</template>

<script>
import TableLostOpportunitiesByStageFilter from '@/components/charts/tables/TableLostOpportunitiesByStageFilter.vue';
import TableLostOpportunitiesByStageData from '@/components/charts/tables/TableLostOpportunitiesByStageData.vue';
import TableDeals from '@/components/charts/tables/TableDeals.vue';
import { tablesModalMixin } from '@/mixins/charts/tablesMixin';

export default {
  name: 'TableLostOpportunitiesByStageModal',
  components: {
    TableLostOpportunitiesByStageFilter,
    TableLostOpportunitiesByStageData,
    TableDeals,
  },
  mixins: [tablesModalMixin],
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          filtersConfig: {
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
};
</script>

<style lang="scss" scoped></style>
