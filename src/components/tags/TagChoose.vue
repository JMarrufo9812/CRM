<template>
  <v-card>
    <v-card-title class="py-1 font-weight-bold">
      Elegir etiquetas
      <v-spacer />
      <v-btn @click="closeMenu" small icon>
        <v-icon small>mdi-close-thick</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <template v-if="$apollo.queries.customTags.loading">
      <div v-for="load in [1, 2]" :key="load" class="d-flex justify-center">
        <v-skeleton-loader
          ref="skeleton"
          type="chip"
          tile
          class="my-2"
        ></v-skeleton-loader>
      </div>
    </template>
    <template v-else>
      <v-progress-linear
        v-if="
          isLoadingUpdateContact ||
            isLoadingUpdateCompany ||
            isLoadingUpdateDeal
        "
        indeterminate
        color="secondary"
      ></v-progress-linear>
      <v-list dense>
        <v-list-item-group v-model="tagsID" mandatory multiple>
          <v-list-item
            v-for="tag in listTags"
            :key="tag.id"
            :value="tag.id"
            @click="selectTag(tag)"
            class="my-1"
            :disabled="
              isLoadingUpdateContact ||
                isLoadingUpdateCompany ||
                isLoadingUpdateDeal
            "
          >
            <v-list-item-content class="tag__item">
              <FieldTag :item="tag"></FieldTag>
              <div class="tag__item__edit">
                <v-btn
                  v-if="tag.id !== '0' && $can('update', PERMISSIONS_TAGS)"
                  fab
                  x-small
                  color="white"
                  @click.stop="editTag(tag)"
                >
                  <v-icon small>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        small
        @click="addTag"
        class="mx-auto"
        :disabled="!$can('create', PERMISSIONS_TAGS)"
      >
        <v-icon small>mdi-plus</v-icon>
        Crear etiqueta
      </v-btn>
    </v-card-actions>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-card>
</template>

<script>
import { PERMISSIONS_TAGS } from '@/constants/permissions';
// Querys
import { GET_TAGS } from '@/graphql/querys/tagsQuery';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { dealsMixin } from '@/mixins/dealsMixin';
import { contactsMixin } from '@/mixins/contactsMixin';
import { companiesMixin } from '@/mixins/companiesMixin';
// Components
import FieldTag from '@/components/tags/Tag.vue';

export default {
  name: 'TagChoose',
  mixins: [modalsAlertsMixin, dealsMixin, contactsMixin, companiesMixin],
  components: {
    FieldTag,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    type: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
  },
  data() {
    return {
      PERMISSIONS_TAGS,
      defaultTag: {
        id: '0',
        name: 'Ninguna etiqueta',
        color: 'gray',
        order: 0,
      },
      customTags: [],
      tagsID: this.getIDS(this.item.tags) || [],
      itemListTags: JSON.parse(JSON.stringify(this.item.tags)),
    };
  },
  watch: {
    // Get ids of tags
    item({ tags }) {
      this.tagsID = this.getIDS(tags);
    },
  },
  computed: {
    // List ordered of tags
    listTags() {
      const list = [...this.customTags];
      list.unshift(this.defaultTag);
      return list;
    },
  },
  methods: {
    // Transform data to array id's
    getIDS(data) {
      if (!data) {
        return [];
      }
      return data.map((item) => item.id);
    },
    // Add tag to the list init
    addTagToList(tag) {
      this.itemListTags.push(tag);
    },
    // Remove tag to the list init
    removeTagToList({ id }) {
      this.itemListTags = this.itemListTags.filter((tag) => tag.id !== id);
    },
    // Exist tag into the list?
    isTagIntoList({ id }) {
      // return this.initTagsID.includes(id);
      return this.itemListTags.some((item) => item.id === id);
    },
    // Action if add or remove the tag into the list init
    selectTagAction(tag) {
      if (!this.isTagIntoList(tag)) {
        this.addTagToList(tag);
      } else {
        this.removeTagToList(tag);
      }
    },
    // Format tags id like a object
    formatTagsID(tag) {
      this.selectTagAction(tag);
      const listIDs = this.itemListTags.map((item) => {
        return { id: item.id };
      });
      // Return list ids and object tags with formats
      return [listIDs, this.itemListTags];
    },
    // Action to select tag
    selectTag(tag) {
      let tags = [];
      // Check if the tag don't exist in the list and empty the tags
      if (
        (this.itemListTags.length === 1 && this.isTagIntoList(tag)) ||
        tag.id === '0'
      ) {
        tags = [];
        this.itemListTags = [];
      } else {
        const [tagObj] = this.formatTagsID(tag);
        tags = tagObj;
      }
      switch (this.type) {
        case 'CONTACT':
          this.updateContact({ id: this.item.id, tags });
          break;
        case 'COMPANY':
          this.updateCompany({ id: this.item.id, tags });
          break;
        case 'DEAL':
          this.updateDeal({ id: this.item.id, tags });
          break;
        default:
          this.updateTagContact(tags);
          break;
      }
    },
    addTag() {
      this.$emit('addTag', true);
    },
    editTag(tag) {
      this.$emit('editTag', tag);
    },
    closeMenu() {
      this.$emit('close');
    },
  },
  apollo: {
    customTags: {
      query: GET_TAGS,
      variables() {
        return {
          filters: {
            type: this.type,
          },
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .v-list-item .tag__item } from ../../../../scss/components/tag.choose';
</style>
