<template>
  <v-data-table
    :headers="headers"
    :items="subreportsActivities.list"
    :items-per-page="5"
    class="elevation-1"
  >
    <template #[`item.start`]="{item}">
      {{ item.start | formatDate }}
    </template>
    <template #[`item.end`]="{item}">
      {{ item.end | formatDate }}
    </template>
    <template #[`item.status`]="{item}">
      <v-chip :color="getColor(item.status)" dark>
        {{ getText(item.status) }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { GET_REPORT_ACTIVITIES } from '@/graphql/querys/chartsQuery';

export default {
  name: 'TableActivities',
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
          activitiesStatus: '',
          activityTypes: [],
          fromReportStatus: '',
        };
      },
    },
  },
  data() {
    return {
      subreportsActivities: {
        count: 0,
        list: [],
      },
      headers: [
        {
          text: 'Título',
          value: 'title',
          sortable: false,
        },
        { text: 'Inicio', value: 'start', sortable: false },
        { text: 'Final', value: 'end', sortable: false },
        { text: 'Estado', value: 'status', sortable: false },
      ],
      filter: {
        users: [],
        pipelines: [],
        periodRange: {
          start: '',
          end: '',
        },
        dealStatus: '',
        activityTypes: [],
        fromReportStatus: '',
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
    activityTypes() {
      return this.filter.activityTypes.length
        ? this.filter.activityTypes.map((type) => {
            return { id: type.id };
          })
        : [];
    },
  },
  methods: {
    getColor(status) {
      if (status === 'PENDING') return '#2E2E2F';
      if (status === 'INEFFECTIVE') return '#88141';
      if (status === 'EFFECTIVE') return '#396A5D';
      return '#2E2E2F';
    },
    getText(status) {
      if (status === 'PENDING') return 'Pendiente';
      if (status === 'INEFFECTIVE') return 'Inefectivo';
      if (status === 'EFFECTIVE') return 'Efectivo';
      return 'Pendiente';
    },
  },
  apollo: {
    subreportsActivities: {
      query: GET_REPORT_ACTIVITIES,
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
            activitiesStatus: this.filter.activitiesStatus,
            activityTypes: this.activityTypes,
            fromReportStatus: this.filter.fromReportStatus,
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
