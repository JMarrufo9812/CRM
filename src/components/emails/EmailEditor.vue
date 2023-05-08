<template>
  <tiptap-vuetify
    v-model="content"
    :extensions="extensions"
    :card-props="{ height: '380px', flat: true }"
    placeholder="Write something …"
    :native-extensions="nativeExtensions"
    @init="onInit"
  >
    <template #toolbar="{ commands, isActive }">
      <div class="menubar">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon @click="commands.undo" v-bind="attrs" v-on="on">
              <v-icon>mdi-undo</v-icon>
            </v-btn>
          </template>
          <span>Deshacer</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon @click="commands.redo" v-bind="attrs" v-on="on">
              <v-icon>mdi-redo</v-icon>
            </v-btn>
          </template>
          <span>Rehacer</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
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
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon @click="openEditorImage" v-bind="attrs" v-on="on">
              <v-icon>mdi-image</v-icon>
            </v-btn>
          </template>
          <span>Añadir imagen</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon @click="openEditorAttach" v-bind="attrs" v-on="on">
              <v-icon>mdi-paperclip</v-icon>
            </v-btn>
          </template>
          <span>Adjuntar archivo</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              icon
              @click="isOpenModalSignature = true"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-signature-freehand</v-icon>
            </v-btn>
          </template>
          <span>Añadir firma</span>
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
        <EmailEditorAttach
          :isOpen="isOpenEditorAttach"
          @close="closeEditorAttach"
          @saveFiles="saveFiles"
          :reset="reset"
        ></EmailEditorAttach>
        <ModalSignature
          :isOpen="isOpenModalSignature"
          @close="closeModalSignature"
          @save="addSignature"
        ></ModalSignature>

        <v-menu offset-y left bottom nudge-bottom="10">
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-tooltip top>
              <template
                v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
              >
                <v-btn
                  text
                  icon
                  v-bind="{ ...attrsMenu, ...attrsTooltip }"
                  v-on="{ ...onMenu, ...onTooltip }"
                >
                  <v-icon>mdi-file-plus</v-icon>
                </v-btn>
              </template>
              <span>Añadir plantilla</span>
            </v-tooltip>
          </template>
          <v-list dense>
            <v-subheader>
              <b class="pl-2">Plantillas</b>
            </v-subheader>
            <v-divider></v-divider>
            <v-list-item
              v-for="(emailTemplate, index) in listTemplates.slice(0, 5)"
              :key="index"
              @click="useTemplate(emailTemplate)"
            >
              <v-list-item-title>
                <b>{{ emailTemplate.name }}</b>
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              @click="
                changeModal({
                  id: 'createTemplateEmail',
                  status: true,
                })
              "
            >
              <v-list-item-title>
                <v-btn color="secondary" small>
                  <v-icon small>mdi-plus</v-icon>
                  Nueva
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <MenuFieldsTemplate
          @sendField="sendField($event, commands)"
        ></MenuFieldsTemplate>
      </div>
    </template>
    <template #footer>
      <v-divider></v-divider>
      <div v-if="files.length" class="ma-3">
        <template v-for="(file, index) in files">
          <v-chip
            :key="index"
            close
            close-icon="mdi-delete"
            color="orange"
            class="mt-1"
            @click:close="removeFile(index)"
          >
            {{ truncateString(file.name, 50) }}
            ({{ returnFileSize(file.size) }})
          </v-chip>
        </template>
      </div>
    </template>
  </tiptap-vuetify>
</template>

<script>
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
  Link,
  HardBreak,
} from 'tiptap-vuetify';
import TipTapCustomImage from '@/components/tiptap/TipTapImage';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
import { modalMethodsMixin } from '@/mixins/modalsMixin';
import { GET_TEMPLATES_EMAIL } from '@/graphql/querys/templateEmailsQuery';
import ModalSignature from '@/components/emails/ModalSignature.vue';
import { GET_SIGNATURE } from '@/graphql/querys/emailsQuery';
import EmailEditorImage from '@/components/emails/EmailEditorImage.vue';
import EmailEditorLink from '@/components/emails/EmailEditorLink.vue';
import EmailEditorAttach from '@/components/emails/EmailEditorAttach.vue';
import MenuFieldsTemplate from '@/components/emails/MenuFieldsTemplate.vue';
import Span from './Span';
import Paragraph from './Paragraph';

export default {
  name: 'EmailEditor',
  components: {
    TiptapVuetify,
    EmailEditorImage,
    EmailEditorLink,
    EmailEditorAttach,
    ModalSignature,
    MenuFieldsTemplate,
  },
  mixins: [modalMethodsMixin],
  props: {
    message: {
      type: String,
      default: '',
    },
    signature: {
      type: String,
      default: '',
    },
    reset: {
      type: Boolean,
    },
  },
  data() {
    return {
      emailTemplates: [],
      userEnterpriseSignature: { signature: '' },
      isSelected: false,
      editor: {},
      files: [],
      isOpenEditorImage: false,
      isOpenEditorLink: false,
      isOpenEditorAttach: false,
      isOpenModalSignature: false,
      isOpenModalTemplate: false,
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
      nativeExtensions: [new Span(), new Paragraph(), new TipTapCustomImage()],
      // starting editor's content
      content: '',
    };
  },
  watch: {
    message(newMessage) {
      this.content = newMessage;
    },
    hasSignature() {
      this.addSignature();
    },
    content(newValue) {
      this.$emit('updateMessage', newValue);
    },
    reset(value) {
      if (value) {
        this.content =
          this.userEnterpriseSignature.signature.length > 0
            ? `<br> <br> ---------- ${this.userEnterpriseSignature.signature}`
            : '';
      } else {
        this.content = '';
        this.files = [];
      }
    },
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
  },
  computed: {
    hasFiles() {
      return this.files.length > 0;
    },
    hasSignature() {
      return (
        this.userEnterpriseSignature.signature.length > 0 &&
        this.userEnterpriseSignature.signature !== '<div></div>'
      );
    },
    listTemplates: {
      // Get list with order
      get() {
        const listOrder = this.emailTemplates.filter((template) =>
          this.emailTemplatesOrder.includes(template.id),
        );
        const listWithoutOrder = this.emailTemplates.filter(
          (template) => !this.emailTemplatesOrder.includes(template.id),
        );
        return listOrder
          .slice(0)
          .sort((a, b) => {
            return (
              this.emailTemplatesOrder.indexOf(a.id) -
              this.emailTemplatesOrder.indexOf(b.id)
            );
          })
          .concat(...listWithoutOrder);
      },
      // Set new list ordered
      set(newListOrdered) {
        this.emailTemplatesOrder = newListOrdered.map(
          (template) => template.id,
        );
      },
    },
  },
  methods: {
    sendField(field, commands) {
      commands.span({ id: field.id, label: field.label });
    },
    onInit({ editor }) {
      this.editor = editor;
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return `${str.slice(0, num)} ...`;
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.$emit('saveFiles', this.files);
    },
    returnFileSize(number) {
      if (!number) return '';
      if (number < 1024) {
        return `${number} bytes`;
      }
      if (number >= 1024 && number < 1048576) {
        const num = (number / 1024).toFixed(1);
        return `${num} KB`;
      }
      if (number >= 1048576) {
        const num = (number / 1048576).toFixed(1);
        return `${num} MB`;
      }
      return '';
    },
    openEditorImage() {
      this.isOpenEditorImage = true;
    },
    closeEditorImage() {
      this.isOpenEditorImage = false;
    },
    saveImage(command, image) {
      if (image.src !== null) {
        command({ src: image.src, alt: image.alt });
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
    openEditorAttach() {
      this.isOpenEditorAttach = true;
    },
    closeEditorAttach() {
      this.isOpenEditorAttach = false;
    },
    saveFiles(files) {
      if (files.length > 0) {
        this.files = files;
        this.$emit('saveFiles', files);
        this.closeEditorAttach();
      }
    },
    addSignature(value) {
      if (
        this.userEnterpriseSignature.signature.length > 0 &&
        this.userEnterpriseSignature.signature !== '<div></div>'
      ) {
        this.content = `${this.content} <br> <br> ---------- ${this.userEnterpriseSignature.signature}`;
      } else if (value.length > 0 && value !== '<div></div>') {
        this.content = `${this.content} <br> <br> ---------- ${value}`;
      }
      this.closeModalSignature();
    },
    closeModalSignature() {
      this.isOpenModalSignature = false;
    },
    closeModalTemplate() {
      this.isOpenModalTemplate = false;
    },
    useTemplate(template) {
      const newTemplate = JSON.parse(JSON.stringify(template));
      this.changeModal({
        id: 'sendEmail',
        status: true,
        isEdit: true,
        item: newTemplate,
      });
    },
    goToManageTemplate() {
      this.$router.push({ name: 'email-templates' }, () => {});
      this.changeModal({
        id: 'sendEmail',
        status: false,
        isEdit: false,
        item: null,
      });
    },
  },
  apollo: {
    userEnterpriseSignature: {
      query: GET_SIGNATURE,
    },
    emailTemplates: {
      query: GET_TEMPLATES_EMAIL,
    },
    emailTemplatesOrder: {
      query: GET_USER_LOGGED,
      update({ userCurrent }) {
        return userCurrent.emailTemplatesOrder;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .tiptap-vuetify-editor__content .tiptap-vuetify-editor__footer  .is-active .variable} from ../../../../scss/components/email.editor';
</style>
