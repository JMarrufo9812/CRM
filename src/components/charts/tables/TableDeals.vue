<template>
  <v-data-table
    :headers="headers"
    :items="subreportsDeals.list"
    :items-per-page="5"
    class="elevation-1"
  >
    <template #[`item.title`]="{item}">
      <a class="textPlain" :href="`/deal/${item.id}`" target="_blank">
        {{ item.title }}
      </a>
    </template>
    <template #[`item.value`]="{item}">
      {{ item.value | formatPrice }}
    </template>
    <template #[`item.status`]="{item}">
      <v-chip :color="getColor(item.status)" dark>
        {{ getText(item.status) }}
      </v-chip>
    </template>
    <template #[`item.owner`]="{item}">
      {{ item.owner.user.name }} {{ item.owner.user.lastName }}
    </template>
  </v-data-table>
</template>

<script>
import { GET_REPORT_DEALS } from '@/graphql/querys/chartsQuery';

export default {
  name: 'TableDeals',
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {
          users: [],
          pipelines: [],
          periodRange: {
            start: '',
            end: '',
          },
          dealStatus: '',
        };
      },
    },
  },
  data() {
    return {
      subreportsDeals: {
        count: 0,
        list: [],
      },
      headers: [
        {
          text: 'Título',
          value: 'title',
          sortable: false,
          align: 'start',
        },
        { text: 'Valor', value: 'value', sortable: false },
        { text: 'Estado', value: 'status', sortable: false },
        { text: 'Propietario', value: 'owner', sortable: false },
      ],
      filter: {
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
  created() {
    this.filter = this.noReactive(this.defaultFilter);
  },
  watch: {
    defaultFilter: {
      handler() {
        this.filter = this.noReactive(this.defaultFilter);
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    pipelinesFilter() {
      return this.filter.pipelines.length
        ? this.filter.pipelines.map((pipeline) => {
            return { id: pipeline.id };
          })
        : [];
    },
    ownersFilter() {
      return this.filter.users.length
        ? this.filter.users.map((user) => {
            return { id: user.id };
          })
        : [];
    },
  },
  methods: {
    getColor(status) {
      if (status === 'WON') return '#396A5D';
      if (status === 'LOST') return '#881414';
      if (status === 'OPEN') return '#2E2E2F';
      return '#2E2E2F';
    },
    getText(status) {
      if (status === 'WON') return 'Ganado';
      if (status === 'LOST') return 'Perdido';
      if (status === 'OPEN') return 'Abierto';
      return 'Abierto';
    },
  },
  apollo: {
    subreportsDeals: {
      query: GET_REPORT_DEALS,
      fetchPolicy: 'no-cache',
      client: 'charts',
      variables() {
        return {
          filters: {
            dateRange: {
              dateStart: this.filter.periodRange.start,
              dateEnd: this.filter.periodRange.end,
            },
            owners: this.ownersFilter,
            pipelines: this.pipelinesFilter,
            dealStatus: this.filter.dealStatus,
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.v-data-table {
  box-shadow: none !important;
}
.textPlain {
  text-decoration: none;
}
</style>
