<template>
  <div>
    <v-menu
      v-model="isOpenMenuTag"
      :close-on-content-click="false"
      nudge-width="200"
      offset-y
      bottom
      @input="close"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="secondary"
          fab
          x-small
          @click="isOpenMenuTag = !isOpenMenuTag"
        >
          <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </template>
      <template v-if="!isLoading">
        <TagCreate
          v-if="isCreateTag"
          :type="type"
          @close="closeTag"
        ></TagCreate>
        <TagEdit
          v-else-if="isEditTag"
          :type="type"
          :tag="tagSelected"
          @close="closeTag"
        ></TagEdit>
        <TagChoose
          v-else
          :item="item"
          :type="type"
          @addTag="createTag"
          @editTag="editTag"
          @close="close"
          @updateItem="updateItem"
          @updateHistory="updateHistory"
        ></TagChoose>
      </template>
    </v-menu>
  </div>
</template>

<script>
// Components
import TagChoose from '@/components/tags/TagChoose.vue';
import TagCreate from '@/components/tags/TagCreate.vue';
import TagEdit from '@/components/tags/TagEdit.vue';

export default {
  name: 'TagMenu',
  components: {
    TagChoose,
    TagCreate,
    TagEdit,
  },
  props: {
    isLoading: {
      type: Boolean,
    },
    item: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
  },
  data() {
    return {
      isOpenMenuTag: false,
      isCreateTag: false,
      isEditTag: false,
      tagSelected: {
        id: '',
        name: '',
        color: '',
      },
    };
  },
  watch: {
    isOpen() {
      // Reset menu options before to open menu
      if (this.isOpen) {
        this.isCreateTag = false;
        this.isEditTag = false;
      }
      // Pass props value to new variable to modify local
      this.isOpenMenuTag = this.isOpen;
    },
  },
  methods: {
    // Close menu
    close() {
      this.isOpenMenuTag = false;
    },
    // Close submenus into menu
    closeTag() {
      this.isCreateTag = false;
      this.isEditTag = false;
    },
    // Active submenu created tag
    createTag() {
      this.isCreateTag = true;
    },
    // Select tag and active submenu edit tag
    editTag({ id, name, color }) {
      this.tagSelected = {
        id,
        name,
        color,
      };
      this.isEditTag = true;
    },
    updateItem(itemUpdated) {
      this.$emit('updateItem', itemUpdated);
    },
    updateHistory() {
      this.$emit('updateHistory');
    },
  },
};
</script>
