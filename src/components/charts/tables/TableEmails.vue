<template>
  <v-data-table
    :headers="headers"
    :items="list"
    :items-per-page="5"
    class="elevation-1"
  >
    <template #[`item.tracking`]="{item}">
      <v-chip :color="getColor(item.tracking)" dark>
        {{ getText(item.tracking) }}
      </v-chip>
    </template>
    <template #[`item.openingTime`]="{item}">
      {{ item.openingTime | formatDate }}
    </template>
  </v-data-table>
</template>

<script>
import { GET_REPORT_EMAILS } from '@/graphql/querys/chartsQuery';

export default {
  name: 'TableEmails',
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
          emailStatus: 'ALL',
        };
      },
    },
  },
  data() {
    return {
      subreportsEmails: {
        count: 0,
        list: [],
      },
      headers: [
        {
          text: 'Asunto',
          value: 'subject',
          sortable: false,
        },
        { text: 'Correo electrónico', value: 'address', sortable: false },
        { text: 'Contacto', value: 'contact', sortable: false },
        { text: 'Seguimiento', value: 'tracking', sortable: false },
        { text: 'Fecha de apertura', value: 'openingTime', sortable: false },
      ],
      filter: {
        users: [],
        pipelines: [],
        periodRange: {
          start: '',
          end: '',
        },
        emailStatus: 'ALL',
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
    list() {
      return this.subreportsEmails.list.map((email) => {
        return {
          subject: email.subject,
          address: email.address,
          contact: email?.contact?.name || 'Sin contacto',
          tracking: email.tracking,
          openingTime: email.openingTime,
        };
      });
    },
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
      if (status === 'OPEN') return '#2E2E2F';
      if (status === 'NOT_OPEN') return '#881414';
      if (status === 'NO_TRACK') return '#396A5D';
      return '#2E2E2F';
    },
    getText(status) {
      if (status === 'OPEN') return 'Abierto';
      if (status === 'NOT_OPEN') return 'No abierto';
      if (status === 'NO_TRACK') return 'Sin seguimiento';
      return 'Abierto';
    },
  },
  apollo: {
    subreportsEmails: {
      query: GET_REPORT_EMAILS,
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
            emailStatus: this.filter.emailStatus,
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
