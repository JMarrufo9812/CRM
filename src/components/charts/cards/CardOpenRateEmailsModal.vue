<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardOpenRateEmailsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardOpenRateEmailsFilter>
    </template>
    <template #chart>
      <CardOpenRateEmailsData
        :defaultFilter="filters.filtersConfig"
      ></CardOpenRateEmailsData>
    </template>
    <template #table>
      <TableEmails :defaultFilter="filters.filtersTable"></TableEmails>
    </template>
  </BaseModalChart>
</template>

<script>
import CardOpenRateEmailsData from '@/components/charts/cards/CardOpenRateEmailsData.vue';
import TableEmails from '@/components/charts/tables/TableEmails.vue';
import CardOpenRateEmailsFilter from '@/components/charts/cards/CardOpenRateEmailsFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardOpenRateEmailsModal',
  components: {
    CardOpenRateEmailsData,
    CardOpenRateEmailsFilter,
    TableEmails,
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
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
