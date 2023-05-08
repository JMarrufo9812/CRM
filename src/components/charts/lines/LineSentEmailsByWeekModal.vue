<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <LineSentEmailsByWeekFilter
        :defaultFilter="filters.filtersConfig"
      ></LineSentEmailsByWeekFilter>
    </template>
    <template #chart>
      <LineSentEmailsByWeekData
        :defaultFilter="filters.filtersConfig"
        isFull
      ></LineSentEmailsByWeekData>
    </template>
    <template #table>
      <TableEmails :defaultFilter="filters.filtersTable"></TableEmails>
    </template>
  </BaseModalChart>
</template>

<script>
import { linesModalMixin } from '@/mixins/charts/linesMixin';
import LineSentEmailsByWeekFilter from '@/components/charts/lines/LineSentEmailsByWeekFilter.vue';
import LineSentEmailsByWeekData from '@/components/charts/lines/LineSentEmailsByWeekData.vue';
import TableEmails from '@/components/charts/tables/TableEmails.vue';

export default {
  name: 'LineSentEmailsByWeekModal',
  components: {
    LineSentEmailsByWeekFilter,
    LineSentEmailsByWeekData,
    TableEmails,
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
