<template>
  <div>
    <TiptapVuetify
      v-model="content"
      :placeholder="placeholder"
      :card-props="cardProps"
      :extensions="extensions"
      :native-extensions="nativeExtensions"
      @init="onInit"
    >
      <template #toolbar="{ commands, isActive }">
        <div class="menubar">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
            </template>
            <span>Negritas</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
            </template>
            <span>Itálica</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-underline</v-icon>
              </v-btn>
            </template>
            <span>Subrayado</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-btn>
            </template>
            <span>Lista ordenada</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
            </template>
            <span>Lista desordenada</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                icon
                @click="openEditorLink"
                :disabled="!isSelected"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-link</v-icon>
              </v-btn>
            </template>
            <span>Añadir enlace</span>
          </v-tooltip>
          <EmailEditorLink
            :isOpen="isOpenEditorLink"
            @close="closeEditorLink"
            @save="saveLink(commands.link, ...arguments)"
          ></EmailEditorLink>
        </div>
      </template>
    </TiptapVuetify>
    <p class="mb-0 text-right">{{ isMaxSize }}/{{ maxSize }}</p>
  </div>
</template>

<script>
// Tiptap editor
import {
  // component
  TiptapVuetify,
  // extensions
  Bold,
  Italic,
  Underline,
  ListItem,
  BulletList,
  OrderedList,
} from 'tiptap-vuetify';
import MaxSize from '@/components/tiptap/MaxSize';
import { CustomLink } from '@/components/notes/CustomLink';

export default {
  name: 'NoteEditor',
  components: {
    TiptapVuetify,
    EmailEditorLink: () => import('@/components/emails/EmailEditorLink.vue'),
  },
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Escribe algo...',
    },
    defaultContent: {
      type: String,
      default: '',
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      required: false,
      default: 250,
    },
  },
  data() {
    return {
      editor: {},
      // Extensions of tiptap
      extensions: [
        Bold,
        Italic,
        Underline,
        [CustomLink, { options: { target: '_blank' } }],
        ListItem,
        BulletList,
        OrderedList,
      ],
      // Content of note
      content: '',
      nativeExtensions: [new MaxSize({ maxSize: this.maxSize })],
      isOpenEditorLink: false,
      isSelected: false,
    };
  },
  watch: {
    'editor.selection': {
      handler() {
        const { selection, state } = this.editor;
        const { from, to } = selection;
        const text = state.doc.textBetween(from, to, ' ');
        if (text.length > 0) {
          this.isSelected = true;
        } else {
          this.isSelected = false;
        }
      },
    },
    reset(isReset) {
      if (isReset) this.resetContent();
    },
    isEdit: {
      handler(isEdit) {
        if (isEdit && this.defaultContent?.length)
          this.content = this.defaultContent;
      },
      immediate: true,
    },
    content(value) {
      this.$emit('updateContent', value);
    },
  },
  computed: {
    isMaxSize() {
      const { state } = this.editor;
      return state?.doc?.textContent?.length || 0;
    },
    // Props to card tiptap
    cardProps() {
      return { flat: this.flat, 'max-width': '640' };
    },
  },
  methods: {
    openEditorLink() {
      this.isOpenEditorLink = true;
    },
    closeEditorLink() {
      this.isOpenEditorLink = false;
    },
    saveLink(command, link) {
      if (link.href !== null) {
        command({ href: link.href });
      }
    },
    onInit({ editor }) {
      this.editor = editor;
    },
    resetContent() {
      this.content = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .tiptap-vuetify-editor__content } from ../../../../scss/components/note.editor';
</style>
