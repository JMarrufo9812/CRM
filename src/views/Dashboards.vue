<template>
  <div>
    <div class="white">
      <v-container fluid>
        <v-row class="my-2">
          <v-col cols="3" class="d-flex align-center">
            <span class="ml-5 font-weight-bold text-uppercase">
              Mi dashboard
            </span>
          </v-col>
          <v-col cols="9" class="text-center">
            <v-menu offset-x transition="slide-x-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined v-bind="attrs" v-on="on">
                  {{ textMenuPanel }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item-group color="primary">
                  <v-list-item
                    v-for="item in items"
                    :key="item.id"
                    :to="item.to"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <div class="d-flex justify-space-between my-5">
        <GlobalFilter></GlobalFilter>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </v-container>
  </div>
</template>

<script>
import GlobalFilter from '@/components/charts/filters/GlobalFilter.vue';
import {
  chartFiltersMethodsMixin,
  chartFiltersApolloDataMixin,
} from '@/mixins/chartFiltersMixin';
import { UPDATE_LOADING_CONTROL } from '@/graphql/local-state/mutations';

export default {
  name: 'Dashboards',
  mixins: [chartFiltersMethodsMixin, chartFiltersApolloDataMixin],
  components: {
    GlobalFilter,
  },
  mounted() {
    this.$apollo.mutate({
      mutation: UPDATE_LOADING_CONTROL,
      variables: { isLoading: false },
    });
  },
  data() {
    return {
      items: [
        { id: 'DAILY', title: 'Reporte diario', to: 'daily' },
        { id: 'WEEKLY', title: 'Reporte semanal', to: 'weekly' },
        { id: 'MONTHLY', title: 'Reporte mensual', to: 'monthly' },
        { id: 'QUARTERLY', title: 'Reporte trimestral', to: 'quarterly' },
        { id: 'ANNUAL', title: 'Reporte anual', to: 'annual' },
      ],
    };
  },
  computed: {
    textMenuPanel() {
      const url = this.$route.path;
      const idUrl = url.split('/')[2].toUpperCase();
      const item = this.items.find(({ id }) => id === idUrl);

      return item?.title || '';
    },
  },
};
</script>
