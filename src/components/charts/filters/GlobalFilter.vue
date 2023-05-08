<template>
  <div>
    <GlobalFilterMenu
      :defaultFilter="filtersChartsGlobal"
      @save="updateFilters"
    >
      Filtrar
    </GlobalFilterMenu>
    <GlobalFilterChip
      v-if="formatTextUsers.length > 0"
      :formatItems="formatTextUsers"
      @close="close('users')"
    ></GlobalFilterChip>
    <GlobalFilterChip
      v-if="formatPeriodPredefined.length > 0"
      :formatItems="formatPeriodPredefined"
      @close="close('periodPredefined')"
    ></GlobalFilterChip>
  </div>
</template>

<script>
import moment from 'moment';
import GlobalFilterMenu from '@/components/charts/filters/GlobalFilterMenu.vue';
import GlobalFilterChip from '@/components/charts/filters/GlobalFilterChip.vue';
import { GET_FILTERS_CHARTS_GLOBAL } from '@/graphql/local-state/queries';
import { UPDATE_FILTERS_CHARTS_GLOBAL } from '@/graphql/local-state/mutations';

export default {
  name: 'GlobalFilter',
  components: {
    GlobalFilterMenu,
    GlobalFilterChip,
  },
  data() {
    return {
      filters: {
        users: [],
        periodPredefined: [],
      },
      filtersChartsGlobal: {},
    };
  },
  created() {
    this.filters = this.noReactive(this.filtersChartsGlobal);
  },
  computed: {
    formatTextUsers() {
      if (this.filters.users.length > 0) {
        return [
          'Propietarios',
          this.formatUsers(this.filters.users, this.formatUser).join(', '),
        ];
      }
      return [];
    },
    formatPeriodPredefined() {
      if (
        this.filters?.periodPredefined &&
        this.filters?.periodPredefined.length > 0
      ) {
        if (this.filters?.periodPredefined[0] !== 'CUSTOM') {
          return [
            `Período: ${this.filters?.periodPredefined[2]}`,
            this.formatPeriodDates(this.filters.periodPredefined[1]),
          ];
        }
        return [
          `Período: ${this.filters?.periodPredefined[2]}`,
          this.formatPeriodDates(this.filters.periodPredefined[1]),
        ];
      }
      return [];
    },
  },
  methods: {
    formatCompleteUser(user) {
      return {
        __typename: 'user',
        id: user?.id || null,
        name: user?.user?.name || null,
        lastName: user?.user?.lastName || null,
      };
    },
    formatUsers(users, format) {
      return users.map((user) => {
        return format(user);
      });
    },
    updateFilters(filters) {
      const users = filters.users.map((user) => {
        return user.user ? this.formatCompleteUser(user) : user;
      });

      this.filters = {
        __typename: 'filtersChartsGlobal',
        users: users || [],
        periodPredefined: filters.periodPredefined,
      };

      this.$apollo.mutate({
        mutation: UPDATE_FILTERS_CHARTS_GLOBAL,
        variables: {
          updateFilters: {
            ...this.filters,
          },
        },
      });
    },
    maybePluralize(count, noun, suffix = 's') {
      return `${count} ${noun}${count !== 1 ? suffix : ''}`;
    },
    formatUser(user) {
      return `${user.name} ${user.lastName}`;
    },
    formatPeriodDates(periods) {
      return `Del ${moment(periods[0]).format('L')} al ${moment(
        periods[1],
      ).format('L')}`;
    },
    close(propertyItem) {
      const newFilters = this.noReactive(this.filters);
      if (propertyItem === 'users') {
        newFilters[propertyItem] = [];
      }
      if (propertyItem === 'periodPredefined') {
        newFilters[propertyItem] = [];
      }
      this.updateFilters(newFilters);
    },
  },
  apollo: {
    filtersChartsGlobal: {
      query: GET_FILTERS_CHARTS_GLOBAL,
    },
  },
};
</script>

<style lang="scss" scoped></style>
