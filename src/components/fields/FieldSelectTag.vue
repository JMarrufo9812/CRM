<template>
  <!-- este componente es especialmente dirigido a la creacion de los fitltros -->
  <v-select
    v-model="field.value"
    :prepend-icon="field.icon"
    :items="customTags"
    :item-value="(tag) => tag.id"
    :item-text="(tag) => tag.name"
    :rules="field.isRequired ? rules.isRequiredObject : []"
    :class="[
      inputProps ? inputProps.class : '',
      field.isRequired ? 'required' : '',
    ]"
    :label="field.label || 'Etiquetas'"
    :dense="inputProps ? inputProps.isDense : false"
    hide-details="auto"
    hide-selected
    outlined
  >
    <template v-slot:selection="{ item }">
      <v-chip
        :color="item.color"
        :text-color="getBestColor(item.color)"
        :small="inputProps ? inputProps.isDense : false"
      >
        <v-avatar left>
          <v-icon x-small>mdi-tag</v-icon>
        </v-avatar>
        <span>{{ item.name }}</span>
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-chip
        :text-color="getBestColor(item.color)"
        :color="item.color"
        :small="inputProps ? inputProps.isDense : false"
      >
        <v-avatar left>
          <v-icon small>mdi-tag</v-icon>
        </v-avatar>
        {{ item.name }}
      </v-chip>
    </template>
  </v-select>
</template>

<script>
import { GET_TAGS } from '@/graphql/querys/tagsQuery';
import { tagsMixin } from '@/mixins/tagsMixin';
import { rulesMixin } from '@/mixins/rulesMixin';

export default {
  name: 'FieldSelectTag',
  mixins: [tagsMixin, rulesMixin],
  props: {
    field: {
      type: Object,
      required: true,
    },
    inputProps: {
      type: Object,
      required: false,
    },
    resetHandler: {
      type: Boolean,
      default: false,
    },
    isScrolled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagsMenu: false,
      filters: {
        type: '',
      },
    };
  },
  created() {
    this.filters.type = this.field.typeTable;
  },
  watch: {
    resetValues(value) {
      if (!value) this.resetValues();
    },
  },
  methods: {
    resetValues() {
      delete this.field.value;
      this.tagsMenu = false;
      this.filters.type = '';
    },
  },
  apollo: {
    customTags: {
      query: GET_TAGS,
      variables() {
        return {
          filters: this.filters,
        };
      },
    },
  },
};
</script>
