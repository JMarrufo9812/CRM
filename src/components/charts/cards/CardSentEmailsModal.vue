<template>
  <BaseModalChart
    :title="title"
    :titleRegular="titleRegular"
    :isOpen="isOpen"
    @close="closeModal"
  >
    <template #filters>
      <CardSentEmailsFilter
        :defaultFilter="filters.filtersConfig"
      ></CardSentEmailsFilter>
    </template>
    <template #chart>
      <CardSentEmailsData
        :defaultFilter="filters.filtersConfig"
      ></CardSentEmailsData>
    </template>
    <template #table>
      <TableEmails :defaultFilter="filters.filtersTable"></TableEmails>
    </template>
  </BaseModalChart>
</template>

<script>
import CardSentEmailsData from '@/components/charts/cards/CardSentEmailsData.vue';
import TableEmails from '@/components/charts/tables/TableEmails.vue';
import CardSentEmailsFilter from '@/components/charts/cards/CardSentEmailsFilter.vue';
import { cardsModalMixin } from '@/mixins/charts/cardsMixin';

export default {
  name: 'CardSentEmailsModal',
  components: {
    CardSentEmailsData,
    CardSentEmailsFilter,
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
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
