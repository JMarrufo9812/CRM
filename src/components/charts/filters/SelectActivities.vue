<template>
  <v-select
    v-model="activitiesSelected"
    :items="activityTypes"
    item-value="id"
    item-text="name"
    label="Actividades"
    outlined
    multiple
    hide-details="auto"
    return-object
    small-chips
    @change="updateSelect"
    :loading="isLoading"
  >
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="activityTypes.length > 0 ? 'primary' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Todos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
import { GET_ACTIVITIES_TYPES } from '@/graphql/querys/activitiesQuery';

export default {
  name: 'SelectActivities',
  props: {
    all: {
      type: Boolean,
      default: false,
    },
    defaultSelect: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      activityTypes: [],
      activitiesSelected: [],
    };
  },
  created() {
    this.activitiesSelected = this.noReactive(this.defaultSelect);
    this.updateSelect();
  },
  watch: {
    defaultSelect(newValue, beforeValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(beforeValue)) {
        this.activitiesSelected = this.noReactive(this.defaultSelect);
        this.updateSelect();
      }
    },
    activityTypes: {
      handler(list) {
        if (list.length) {
          if (this.all) {
            this.activitiesSelected = list;
          } else if (this.defaulSelect && this.defaulSelect.length) {
            this.activitiesSelected = this.defaultSelect;
          }
          this.updateSelect();
        }
      },
    },
  },

  computed: {
    allActivities() {
      return this.activitiesSelected.length === this.activityTypes.length;
    },
    someActivities() {
      return this.activitiesSelected.length > 0 && !this.activityTypes;
    },
    icon() {
      if (this.allActivities) return 'mdi-close-box';
      if (this.someActivities) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },
  methods: {
    updateSelect() {
      this.$emit('change', this.activitiesSelected);
    },
    toggle() {
      this.$nextTick(() => {
        if (this.allActivities) {
          this.activitiesSelected = [];
        } else {
          this.activitiesSelected = this.activityTypes.slice();
        }
        this.updateSelect();
      });
    },
  },
  apollo: {
    activityTypes: {
      query: GET_ACTIVITIES_TYPES,
      fetchPolicy: 'no-cache',
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
    },
  },
};
</script>

<style></style>
