<template>
  <v-dialog v-model="modal.status" scrollable max-width="60em" persistent>
    <v-card height="42em">
      <v-card-title class="primary white--text">
        {{ formatTitle }}
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <div v-if="isLoadingTemplate" class="text-center my-10">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <div v-show="!isLoadingTemplate">
          <v-row>
            <v-col>
              <v-text-field
                label="Nombre de la plantilla"
                v-model="emailTemplateEdit.name"
                dense
                outlined
                hide-details="auto"
              ></v-text-field>
              <p v-if="!isValidName" class="red--text">
                El nombre es requerido
              </p>
            </v-col>
          </v-row>
          <EmailEditorSubject
            class="mt-4"
            :isEdit="modal.isEdit"
            :isLoading="isLoadingTemplate"
            :subject="subjectDefault"
            @updateSubject="updateSubject"
            :reset="modal.status"
          ></EmailEditorSubject>
          <p v-if="!isValidSubject" class="red--text">
            El asunto es requerido
          </p>
          <tiptap-vuetify
            class="message"
            v-model="emailTemplateEdit.message"
            :extensions="extensions"
            :card-props="{ outlined: true }"
            placeholder="Write something …"
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
                    <v-btn
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
                <ModalSignature
                  :isOpen="isOpenModalSignature"
                  @close="closeModalSignature"
                  @save="addSignature"
                ></ModalSignature>
                <MenuFieldsTemplate
                  @sendField="sendField($event, commands)"
                ></MenuFieldsTemplate>
              </div>
            </template>
          </tiptap-vuetify>
          <p v-if="!isValidMessage" class="red--text">
            El mensaje es requerido
          </p>
          <div class="mt-4">
            <v-switch
              v-model="emailTemplateEdit.shared"
              inset
              label="Compartir plantilla"
            ></v-switch>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pb-6 mt-2">
        <v-btn large color="secondary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          large
          :color="modal.isEdit ? 'secondary' : 'primary'"
          @click="saveTemplate(false)"
          :loading="isLoading"
          :outlined="!modal.isEdit"
        >
          {{ modal.isEdit ? 'Actualizar' : 'Crear' }}
        </v-btn>
        <v-btn
          v-if="!modal.isEdit"
          large
          color="secondary"
          @click="saveTemplate(true)"
          :loading="isLoading"
        >
          Crear y usar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
import MenuFieldsTemplate from '@/components/emails/MenuFieldsTemplate.vue';
import { successesMixin } from '@/mixins/successes';
import { errorsMixin } from '@/mixins/errors';
import {
  CREATE_TEMPLATE_EMAIL,
  UPDATE_TEMPLATE_EMAIL,
} from '@/graphql/mutations/templateEmailsMutations';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import {
  GET_TEMPLATE_EMAIL,
  GET_TEMPLATES_EMAIL,
} from '@/graphql/querys/templateEmailsQuery';
import ModalSignature from '@/components/emails/ModalSignature.vue';
import { GET_SIGNATURE } from '@/graphql/querys/emailsQuery';
import EmailEditorImage from '@/components/emails/EmailEditorImage.vue';
import EmailEditorLink from '@/components/emails/EmailEditorLink.vue';
import EmailEditorSubject from '@/components/emails/EmailEditorSubject.vue';
import Paragraph from './Paragraph';
import Span from './Span';

export default {
  name: 'ModalEmailTemplate',
  components: {
    TiptapVuetify,
    EmailEditorImage,
    EmailEditorLink,
    ModalSignature,
    EmailEditorSubject,
    MenuFieldsTemplate,
  },
  mixins: [modalMethodsMixin, modalApolloMixin, successesMixin, errorsMixin],
  data() {
    return {
      isLoading: false,
      modalId: 'createTemplateEmail',
      modal: {},
      isLoadingTemplate: false,
      subjectDefault: '',
      emailTemplateEdit: {
        name: '',
        subject: '',
        message: '',
        shared: false,
        myTemplate: true,
      },
      emailTemplate: {},
      defaultTemplate: {
        name: '',
        subject: '',
        message: '',
        shared: false,
        myTemplate: true,
      },
      userEnterpriseSignature: { signature: '' },
      isSelected: false,
      editor: {},
      files: [],
      isOpenEditorImage: false,
      isOpenEditorLink: false,
      isOpenEditorAttach: false,
      isOpenModalSignature: false,
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
      nativeExtensions: [new Paragraph(), new Span(), new TipTapCustomImage()],
      isValidName: true,
      isValidSubject: true,
      isValidMessage: true,
    };
  },
  watch: {
    modal(modalItem) {
      if (modalItem.isEdit) this.getEmail();
      if (!modalItem.status) this.reset();
    },
    // eslint-disable-next-line
    'editor.selection': function() {
      const {
        selection: { from, to },
        state,
      } = this.editor;
      this.isSelected = state.doc.textBetween(from, to, ' ').length > 0;
    },
    'emailTemplateEdit.name': {
      handler(name) {
        this.validName(name);
      },
    },
    'emailTemplateEdit.subject': {
      handler(subject) {
        this.validSubject(subject);
      },
    },
    'emailTemplateEdit.message': {
      handler(message) {
        this.validMessage(message);
      },
    },
  },
  computed: {
    hasFiles() {
      return this.files.length > 0;
    },
    formatTitle() {
      return this.modal.isEdit
        ? 'Editar plantilla de correo'
        : 'Crear plantilla de correo';
    },
  },
  methods: {
    validName(name) {
      if (!this.modal.status) {
        this.isValidName = true;
      } else {
        this.isValidName = name !== '';
      }
    },
    validSubject(subject) {
      if (!this.modal.status) {
        this.isValidSubject = true;
      } else {
        this.isValidSubject = !this.isEmptyEditor(subject, 'SUBJECT');
      }
    },
    validMessage(message) {
      if (!this.modal.status) {
        this.isValidMessage = true;
      } else {
        this.isValidMessage = !this.isEmptyEditor(message, 'MESSAGE');
      }
    },
    isEmptyEditor(content, type) {
      let resultTest = false;
      if (type === 'SUBJECT') {
        const regexNoSpacesP = /<p>.*[a-zA-ZñÑ].*<\/p>/g;
        resultTest = regexNoSpacesP.test(content);
      }
      if (type === 'MESSAGE') {
        const regexNoSpaces = /<div>.*[a-zA-ZñÑ].*<\/div>/g;
        const regexNoSpacesH = /<h[1-3]>.*[a-zA-ZñÑ].*<\/h[1-3]>/g;
        resultTest =
          regexNoSpaces.test(content) || regexNoSpacesH.test(content);
      }
      return content === '' || content === '<div></div>' || !resultTest;
    },
    sendField(field, commands) {
      commands.span({ id: field.id, label: field.label });
    },
    onInit({ editor }) {
      this.editor = editor;
    },
    updateSubject(subject) {
      this.emailTemplateEdit.subject = subject;
    },
    deleteTemplate() {
      this.$emit('deleteTemplate', this.emailTemplateEdit);
    },
    getEmail() {
      this.isLoadingTemplate = true;
      this.$apollo
        .query({
          query: GET_TEMPLATE_EMAIL,
          variables: {
            emailTemplateId: this.modal.item.id,
          },
        })
        .then(
          ({
            data: {
              emailTemplate: {
                id,
                name,
                content: { subject, message },
                shared,
                myTemplate,
              },
            },
          }) => {
            this.emailTemplateEdit = {
              id,
              name,
              subject,
              message,
              shared,
              myTemplate,
            };
            this.subjectDefault = subject;
            this.isLoadingTemplate = false;
          },
        )
        .catch(() => {
          this.isLoadingTemplate = false;
          this.addError({
            code: 400,
            message:
              'No se pudo obtener la plantilla, intente de nuevo o contacte a soporte',
          });
        });
    },
    reset() {
      setTimeout(() => {
        this.emailTemplateEdit = {
          name: '',
          subject: '',
          message: '',
          shared: false,
          myTemplate: true,
        };
        this.isValidName = true;
        this.isValidSubject = true;
        this.isValidMessage = true;
      }, 1);
    },
    close() {
      this.changeModal({
        id: 'createTemplateEmail',
        status: false,
        isEdit: false,
        item: null,
      });
    },
    truncateString(str, num) {
      if (str.length <= num) return str;
      return `${str.slice(0, num)} ...`;
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.$emit('saveFiles', this.files);
    },
    returnFileSize(number) {
      if (!number) return '';
      if (number < 1024) return `${number} bytes`;
      if (number >= 1024 && number < 1048576)
        return `${(number / 1024).toFixed(1)} KB`;
      if (number >= 1048576) return `${(number / 1048576).toFixed(1)} MB`;
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
        this.emailTemplateEdit.message = `${this.emailTemplateEdit.message} <br> <br> ---------- ${this.userEnterpriseSignature.signature}`;
      } else if (value.length > 0 && value !== '<div></div>') {
        this.emailTemplateEdit.message = `${this.emailTemplateEdit.message} <br> <br> ---------- ${value}`;
      }
      this.closeModalSignature();
    },
    closeModalSignature() {
      this.isOpenModalSignature = false;
    },
    useTemplateToSend(template) {
      this.changeModal({
        id: 'sendEmail',
        status: true,
        isEdit: true,
        item: { ...template, myTemplate: true },
      });
    },
    // Create or update template
    saveTemplate(useTemplate) {
      this.validName(this.emailTemplateEdit.name);
      this.validSubject(this.emailTemplateEdit.subject);
      this.validMessage(this.emailTemplateEdit.message);
      if (this.isValidName && this.isValidSubject && this.isValidMessage) {
        // Start loading
        this.isLoading = true;
        // Is editing?
        if (!this.modal.isEdit) {
          this.createTemplate(this.emailTemplateEdit, useTemplate);
        } else {
          this.updateTemplate(this.emailTemplateEdit);
        }
        this.close();
        this.isLoading = false;
      }
    },
    createTemplate({ name, subject, message, shared }, useTemplate) {
      this.$apollo
        .mutate({
          mutation: CREATE_TEMPLATE_EMAIL,
          variables: {
            emailTemplateInput: {
              name,
              subject,
              message,
              shared,
            },
          },
          update: (store, { data: { saveTemplateEmail } }) => {
            const data = store.readQuery({ query: GET_TEMPLATES_EMAIL });
            data.emailTemplates.push({
              __typename: 'EmailTemplate',
              id: saveTemplateEmail.id,
              name: saveTemplateEmail.name,
              shared: saveTemplateEmail.shared,
              myTemplate: true,
            });
            store.writeQuery({ query: GET_TEMPLATES_EMAIL, data });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            saveTemplateEmail: {
              __typename: 'EmailTemplate',
              id: -1,
              name,
              shared,
              myTemplate: true,
            },
          },
        })
        .then(({ data: { saveTemplateEmail } }) => {
          const newTemplate = {
            id: saveTemplateEmail.id,
            name: saveTemplateEmail.name,
            shared: saveTemplateEmail.shared,
            myTemplate: true,
          };
          if (useTemplate) {
            this.useTemplateToSend(newTemplate);
          }
          this.isLoading = false;
          this.addSuccess('Se creó la plantilla con éxito.');
        })
        .catch(() => {
          this.isLoading = false;
          this.addError({
            code: 400,
            message:
              'No se pudo crear la plantilla, intente de nuevo o contacte a soporte',
          });
          this.close();
        });
    },
    updateTemplate(template) {
      this.$apollo
        .mutate({
          mutation: UPDATE_TEMPLATE_EMAIL,
          variables: {
            emailTemplateInput: {
              id: template.id,
              name: template.name,
              shared: template.shared,
              subject: template.subject,
              message: template.message,
            },
          },
          update: (store, { data: { updateEmailTemplate } }) => {
            const data = store.readQuery({ query: GET_TEMPLATES_EMAIL });
            const index = data.emailTemplates.findIndex(
              (templateEmail) => templateEmail.id === updateEmailTemplate.id,
            );
            data.emailTemplates[index] = {
              ...updateEmailTemplate,
              myTemplate: true,
            };
            store.writeQuery({ query: GET_TEMPLATES_EMAIL, data });

            const dataTemplate = store.readQuery({
              query: GET_TEMPLATE_EMAIL,
              variables: {
                emailTemplateId: template.id,
              },
            });
            const { id, name, subject, message, shared, myTemplate } = template;
            dataTemplate.emailTemplate = {
              __typename: 'EmailTemplate',
              id,
              name,
              content: { __typename: 'TemplateContent', subject, message },
              shared,
              myTemplate,
            };

            store.writeQuery({
              query: GET_TEMPLATE_EMAIL,
              variables: {
                emailTemplateId: id,
              },
              data: dataTemplate,
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateEmailTemplate: {
              __typename: 'EmailTemplate',
              id: template.id,
              name: template.name,
              shared: template.shared,
              myTemplate: true,
            },
          },
        })
        .then(() => {
          this.isLoading = false;
          this.close();
          this.addSuccess('Se actualizo la plantilla con éxito.');
        })
        .catch(() => {
          this.isLoading = false;
          this.close();
          this.addError({
            code: 400,
            message:
              'No se pudo actualizar la plantilla, intente de nuevo o contacte a soporte',
          });
        });
    },
  },
  apollo: {
    userEnterpriseSignature: {
      query: GET_SIGNATURE,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .message .tiptap-vuetify-editor .is-active .variable } from ../../../../scss/components/modal.email.template';
</style>
