<template>
  <tiptap-vuetify
    v-model="content"
    :extensions="extensions"
    :card-props="{ height: '300px', class: 'px-4 card-overflow' }"
    placeholder="Write something …"
    :native-extensions="nativeExtensions"
    @init="onInit"
  >
    <template #toolbar="{ commands, isActive }">
      <div class="menubar">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              icon
              @click="commands.undo"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-undo</v-icon>
            </v-btn>
          </template>
          <span>Deshacer</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              icon
              @click="commands.redo"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-redo</v-icon>
            </v-btn>
          </template>
          <span>Rehacer</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              icon
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
              v-bind="attrs"
              v-on="on"
            >
              <b>H1</b>
            </v-btn>
          </template>
          <span>Título H1</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              icon
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
              v-bind="attrs"
              v-on="on"
            >
              <b>H2</b>
            </v-btn>
          </template>
          <span>Subtítulo H2</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              icon
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
              v-bind="attrs"
              v-on="on"
            >
              <b>H3</b>
            </v-btn>
          </template>
          <span>Subtítulo H3</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
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
              small
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
              small
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
              small
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
              small
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
              small
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
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              text
              icon
              @click="openEditorImage"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-image</v-icon>
            </v-btn>
          </template>
          <span>Añadir imagen</span>
        </v-tooltip>
        <EmailEditorLink
          :isOpen="isOpenEditorLink"
          @close="closeEditorLink"
          @save="saveLink(commands.link, ...arguments)"
        ></EmailEditorLink>
        <EmailEditorImage
          :isOpen="isOpenEditorImage"
          @close="closeEditorImage"
          @save="saveImage(commands.image, ...arguments)"
        ></EmailEditorImage>
      </div>
    </template>
  </tiptap-vuetify>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  History,
  Bold,
  Italic,
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  HardBreak,
} from 'tiptap-vuetify';
import TipTapCustomImage from '@/components/tiptap/TipTapImage';
import EmailEditorImage from '@/components/emails/EmailEditorImage.vue';
import EmailEditorLink from '@/components/emails/EmailEditorLink.vue';
import Paragraph from './Paragraph';

export default {
  name: 'EmailEditorSignature',
  components: {
    TiptapVuetify,
    EmailEditorImage,
    EmailEditorLink,
  },
  props: {
    signature: {
      type: String,
      default: '',
    },
    signatureBefore: {
      type: String,
      default: '',
    },
    reset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelected: false,
      editor: {},
      files: [],
      isOpenEditorImage: false,
      isOpenEditorLink: false,
      isOpenEditorAttach: false,
      // declare extensions you want to use
      extensions: [
        Bold,
        History,
        Underline,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Link,
        HardBreak,
      ],
      // starting editor's content
      content: '',
      nativeExtensions: [new Paragraph(), new TipTapCustomImage()],
    };
  },
  watch: {
    reset(value) {
      if (!value) this.resetData();
    },
    signatureBefore(value) {
      this.content = value;
    },
    content(newValue) {
      this.$emit('update:signature', newValue);
    },
    // eslint-disable-next-line
    'editor.selection': function() {
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
  created() {
    this.content = this.signatureBefore;
  },
  methods: {
    onInit({ editor }) {
      this.editor = editor;
    },
    openEditorImage() {
      this.isOpenEditorImage = true;
    },
    closeEditorImage() {
      this.isOpenEditorImage = false;
    },
    saveImage(command, image) {
      if (image.src !== null) {
        command({
          src: image.src,
          alt: image.alt,
          height: image.height,
          width: image.width,
        });
      }
    },
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
    resetData() {
      this.content = this.signatureBefore;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .ProseMirror .tiptap-vuetify-editor__content .is-active .card-overflow } from ../../../../scss/components/email.editor.signature';
</style>
