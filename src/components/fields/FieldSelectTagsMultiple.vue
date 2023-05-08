<template>
  <v-select
    v-model="tags"
    :menu-props="{
      value: tagsMenu,
      top: false,
      offsetY: true,
    }"
    @click="clickOnTextField"
    @blur="tagsMenu = false"
    @change="updateValue"
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
    multiple
  >
    <template v-slot:selection="{ item }">
      <v-chip
        :color="item.color"
        :text-color="getBestColor(item.color)"
        @click:close="deleteTag(item)"
        close
        small
      >
        <v-avatar left>
          <v-icon small>mdi-tag</v-icon>
        </v-avatar>
        {{ item.name }}
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-chip small :text-color="getBestColor(item.color)" :color="item.color">
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
      tags: [],
      filters: {
        type: '',
      },
    };
  },
  created() {
    // SELECT_TAG_CONTACT
    // split = [SELECT, TAG, CONTACT]
    // SE MUEVE HACIA LA POSICION 3
    [, , this.filters.type] = this.field.type.split('_');
  },
  watch: {
    isScrolled(value) {
      if (value) this.tagsMenu = false;
    },
    resetValues(value) {
      if (!value) this.resetValues();
    },
  },
  methods: {
    clickOnTextField() {
      this.tagsMenu = !this.tagsMenu;
      this.$emit('scrolled', false);
    },
    updateValue() {
      const formatTags = this.tags.map((tagId) => {
        return { id: tagId };
      });
      this.field.value = formatTags;
    },
    deleteTag(tag) {
      this.tagsMenu = false;
      this.tags = this.tags.filter((tagId) => {
        return tagId !== tag.id;
      });
      this.updateValue();
    },
    resetValues() {
      delete this.field.value;
      this.tagsMenu = false;
      this.tags = [];
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
