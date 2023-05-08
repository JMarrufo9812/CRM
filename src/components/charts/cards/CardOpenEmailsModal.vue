<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardOpenEmailsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardOpenEmailsFilter>
    </template>
    <template #chart>
      <CardOpenEmailsData
        :defaultFilter="filters.filtersConfig"
      ></CardOpenEmailsData>
    </template>
    <template #table>
      <TableEmails :defaultFilter="filters.filtersTable"></TableEmails>
    </template>
  </BaseModalChart>
</template>

<script>
import CardOpenEmailsData from '@/components/charts/cards/CardOpenEmailsData.vue';
import TableEmails from '@/components/charts/tables/TableEmails.vue';
import CardOpenEmailsFilter from '@/components/charts/cards/CardOpenEmailsFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardOpenEmailsModal',
  components: {
    CardOpenEmailsData,
    CardOpenEmailsFilter,
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
