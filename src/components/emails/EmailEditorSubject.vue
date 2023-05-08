<template>
  <div class="mb-2">
    <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
      placeholder="Asunto del correo"
      :card-props="{
        flat: true,
        tile: true,
      }"
      :native-extensions="nativeExtensions"
    >
      <template #toolbar="{ commands }">
        <MenuFieldsTemplate
          @sendField="sendField($event, commands)"
        ></MenuFieldsTemplate>
      </template>
    </tiptap-vuetify>
  </div>
</template>

<script>
import { Extension } from 'tiptap';
import {
  TiptapVuetify,
  History,
  Heading,
  Bold,
  Italic,
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  Image,
  Link,
  HardBreak,
} from 'tiptap-vuetify';
import MenuFieldsTemplate from '@/components/emails/MenuFieldsTemplate.vue';
import Span from './Span';
import MaxSize from './MaxSize';

export default {
  name: 'EmailEditorSubject',
  components: {
    TiptapVuetify,
    MenuFieldsTemplate,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    subject: {
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
      content: '',
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
        Image,
        Link,
        HardBreak,
      ],
      nativeExtensions: [
        new Span(),
        new (class extends Extension {
          // eslint-disable-next-line
          keys() {
            return {
              Enter: () => true,
            };
          }
        })(),
        new MaxSize({ maxSize: 90 }),
      ],
    };
  },
  watch: {
    subject: {
      handler(newSubject) {
        this.content = newSubject;
      },
      immediate: true,
    },
    isLoading: {
      handler() {
        if (this.isEdit) {
          this.content = this.subject;
        }
      },
      immediate: true,
    },
    isEdit: {
      handler() {
        if (this.isEdit) {
          this.content = this.subject;
        }
      },
      immediate: true,
    },
    content: {
      handler(newContent) {
        if (newContent !== '<p></p>') {
          this.$emit('updateSubject', newContent);
        } else {
          this.$emit('updateSubject', '');
        }
      },
      immediate: true,
    },
    reset(isReset) {
      if (!isReset) {
        this.resetEditor();
      }
    },
  },
  methods: {
    sendField(field, commands) {
      commands.span({ id: field.id, label: field.label });
    },
    resetEditor() {
      this.content = '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .tiptap-vuetify-editor__content .is-active .variable .tiptap-vuetify-editor .tiptap-vuetify-editor__content .tiptap-vuetify-editor__toolbar} from ../../../../scss/components/email.editor.subject';
</style>
