<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    :max-width="300"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="btnSelect"
        color="primary"
        outlined
        :ripple="false"
        v-bind="attrs"
        v-on="on"
      >
        <slot></slot>
        <v-icon class="ml-3">mdi-filter-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <GlobalSelectUsers
              isEmpty
              :defaultSelect="defaultFilter.users"
              @change="updateUsers"
            ></GlobalSelectUsers>
          </v-col>
          <v-col cols="12">
            <GlobalPeriodPredefined
              :defaultSelect="defaultFilter.periodPredefined"
              @change="updatePeriodPredefined"
            ></GlobalPeriodPredefined>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveFilter" :disabled="!hasChanges">
          Aplicar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import GlobalPeriodPredefined from '@/components/charts/filters/GlobalPeriodPredefined.vue';
import GlobalSelectUsers from '@/components/charts/filters/GlobalSelectUsers.vue';

export default {
  name: 'GlobalFilterMenu',
  components: { GlobalSelectUsers, GlobalPeriodPredefined },
  props: {
    defaultFilter: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      menu: false,
      filters: {
        users: [],
        periodPredefined: [],
      },
    };
  },
  watch: {
    defaultFilter(newValue) {
      this.filters = this.noReactive(newValue);
    },
  },
  computed: {
    hasChanges() {
      return (
        this.filters.users.length > 0 ||
        this.filters.periodPredefined.length > 0
      );
    },
  },
  methods: {
    updateUsers(users) {
      this.filters.users = this.noReactive(users);
    },
    updatePeriodPredefined(periodPredefined) {
      this.filters.periodPredefined = periodPredefined;
    },
    saveFilter() {
      this.$emit('save', this.noReactive(this.filters));
      this.menu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.btnSelect ::v-deep .v-btn__content {
  opacity: 1 !important;
}
</style>
