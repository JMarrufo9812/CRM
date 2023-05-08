<template>
  <div class="d-inline-block mb-2">
    <v-menu open-on-hover bottom offset-y v-if="isPreview">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon small>mdi-information</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list dense>
          <v-list-item v-for="filter in listFiltersMap" :key="filter.id">
            <template v-if="filter.id === 'period'">
              <v-list-item-content>
                <v-list-item-title>{{ filter.name }}:</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getTextPeriod(filter.optionSelected.id) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title>{{ filter.name }}:</v-list-item-title>
                <v-list-item-subtitle>
                  {{ filter.optionSelected }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <template v-else v-for="filter in listFiltersMap">
      <v-chip
        label
        small
        color="secondary"
        class="titleFilter mr-1"
        :key="filter.id"
      >
        <template v-if="filter.id === 'period'">
          <b class="mr-1">{{ filter.name }}:</b>
          {{ getTextPeriod(filter.optionSelected.id) }}
        </template>
        <template v-else>
          <b class="mr-1">{{ filter.name }}:</b>
          {{ filter.optionSelected }}
        </template>
      </v-chip>
    </template>
  </div>
</template>

<script>
import { periods } from '@/constants/periods';
import { FILTERS } from '@/constants/filtersChart';

export default {
  name: 'ListFilters',
  props: {
    settings: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      periods,
      listFilters: FILTERS,
    };
  },
  computed: {
    listFiltersMap() {
      if (this.settings?.periodPredefined && this.settings?.periodRange)
        return this.getNewSettings(this.settings);
      return [];
    },
  },
  methods: {
    getTextPeriod(idPeriod) {
      const period = this.periods.find(({ id }) => id === idPeriod);
      return period.text || 'Sin período';
    },
    getNewSettings(settings) {
      const newSettings = {
        period: {
          id: settings.periodPredefined[0],
          range: {
            start: settings.periodRange.start,
            end: settings.periodRange.end,
          },
        },
      };
      if (settings.filterBy) {
        newSettings.filterBy = settings.filterBy;
      }
      if (settings.users) {
        newSettings.users = settings.users;
      }
      if (settings.user) {
        newSettings.user = settings.user;
      }
      if (settings.pipelines) {
        newSettings.pipelines = settings.pipelines;
      }
      if (settings.pipeline) {
        newSettings.pipeline = settings.pipeline;
      }

      const result = Object.entries(newSettings);

      return result.map((item) => {
        const findItem = this.listFilters.find(
          (filter) => filter.id === item[0],
        );
        return {
          ...findItem,
          optionSelected: this.getValuesFilter(item[0], item[1]),
        };
      });
    },
    getValuesFilter(filterKey, optionsFilter) {
      switch (filterKey) {
        case 'filterBy':
          return optionsFilter === 'count' ? 'Cantidad' : 'Valor';
        case 'pipelines':
          return optionsFilter.map((option) => option.name).join(', ');
        case 'pipeline':
          return optionsFilter.name;
        case 'users':
          return optionsFilter
            .map((option) => {
              return option.user?.name
                ? `${option.user?.name} ${option.user?.lastName}`
                : option?.name;
            })
            .join(', ');
        case 'user':
          return optionsFilter.user?.name
            ? `${optionsFilter.user?.name} ${optionsFilter.user?.lastName}`
            : optionsFilter?.name;
        default:
          return optionsFilter;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.titleFilter {
  font-size: 0.7rem;
}
</style>
