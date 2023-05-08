<template>
  <v-row>
    <v-dialog v-model="modal.status" scrollable max-width="500px" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          {{ formatTitle }}
          <v-spacer />
          <v-btn
            icon
            color="white"
            @click="modal.isEdit ? close() : closeAndDeleteImages()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          <NoteEditor
            :isEdit="modal.isEdit"
            :message="messageDefault"
            :itemId="itemId"
            :typeItem="typeItem"
            :reset="modal.status"
            @updateMessage="updateMessage"
            @updateImage="savekeysImages"
          ></NoteEditor>
          <p v-if="!isValidMessage" class="red--text">
            El mensaje es requerido
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            outlined
            @click="modal.isEdit ? close() : closeAndDeleteImages()"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            @click="modal.isEdit ? updateNote(content) : saveNote()"
            :loading="isLoading"
          >
            {{ modal.isEdit ? 'Actualizar' : 'Crear' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-row>
</template>

<script>
import { GET_DEAL } from '@/graphql/querys/dealsQuery';
import { CREATE_NOTE, UPDATE_NOTE } from '@/graphql/mutations/notesMutations';
import { GET_COMPANY } from '@/graphql/querys/companiesQuery';
import { GET_CONTACT } from '@/graphql/querys/contactsQuery';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
// mixins
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { filesMixin } from '@/mixins/filesMixin';

export default {
  name: 'ModalNote',
  components: {
    NoteEditor: () => import('@/components/notes/NoteEditor.vue'),
  },
  mixins: [modalMethodsMixin, modalApolloMixin, modalsAlertsMixin, filesMixin],
  props: {
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
  },
  data() {
    return {
      modalId: 'createNote',
      modal: {},
      messageDefault: '',
      isValidMessage: true,
      content: '',
      images: [],
      userCurrent: {},
      isLoading: false,
    };
  },
  watch: {
    modal({ isEdit, status }) {
      if (isEdit) this.getNote();
      if (!status) this.reset();
    },
    content(value) {
      this.validMessage(value);
    },
  },
  computed: {
    formatTitle() {
      return this.modal.isEdit ? 'Editar nota' : 'Crear una nota';
    },
    filters() {
      const filterObject = { orderBy: 'desc' };
      if (this.typeItem === 'CONTACT') {
        filterObject.contactId = this.itemId;
      } else if (this.typeItem === 'COMPANY') {
        filterObject.companyId = this.itemId;
      } else if (this.typeItem === 'DEAL') {
        filterObject.dealId = this.itemId;
      }

      return filterObject;
    },
  },
  methods: {
    getKeyImage(html) {
      return html.replace(/<img[^>]*>/gi, (imgTag) => {
        return imgTag.replace(
          /\b(alt\s*=\s*(?:['"]?))([^'"> ]+)/i,
          (alt, prefix, url) => {
            this.savekeysImages(url);
          },
        );
      });
    },
    savekeysImages(key) {
      this.images.push({ key });
    },
    validMessage(message) {
      if (!this.modal.status) {
        this.isValidMessage = true;
      } else {
        this.isValidMessage = !this.isEmptyEditor(message);
      }
    },
    isEmptyEditor(content) {
      return content === '' || content === '<div></div>';
    },
    reset() {
      setTimeout(() => {
        this.messageDefault = '';
        this.isValidMessage = true;
      }, 1);
    },
    getNote() {
      this.messageDefault = this.modal.item.content;
      this.getKeyImage(this.modal.item.content);
    },
    updateMessage(message) {
      this.content = message;
    },
    closeAndDeleteImages() {
      this.changeModal({
        id: 'createNote',
        status: false,
        isEdit: false,
        item: null,
      });
      setTimeout(() => {
        this.content = '';
        if (this.images.length > 0) {
          this.images.forEach(({ key }) => {
            this.deleteFileWhitOutModal(key);
          });
        }
        this.images = [];
      }, 1);
    },
    close() {
      this.changeModal({
        id: 'createNote',
        status: false,
        isEdit: false,
        item: null,
      });
      setTimeout(() => {
        this.content = '';
        this.images = [];
      }, 1);
    },
    // Get today with format 00/00/00 00:00
    getToday() {
      const today = new Date();
      const date = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}`;
      return `${date} ${time}`;
    },
    getData(data, createNote) {
      switch (this.typeItem) {
        case 'CONTACT':
          data.contact.notes.unshift(createNote);
          return data;
        case 'COMPANY':
          data.company.notes.unshift(createNote);
          return data;
        case 'DEAL':
          data.deal.notes.unshift(createNote);
          return data;
        default:
          data.contact.notes.unshift(createNote);
          return data;
      }
    },
    getQuery() {
      switch (this.typeItem) {
        case 'CONTACT':
          return {
            query: GET_CONTACT,
            variables: {
              contactId: this.itemId,
            },
          };
        case 'COMPANY':
          return {
            query: GET_COMPANY,
            variables: {
              companyId: this.itemId,
            },
          };
        case 'DEAL':
          return {
            query: GET_DEAL,
            variables: {
              dealId: this.itemId,
            },
          };
        default:
          return {
            query: GET_CONTACT,
            variables: {
              contactId: this.itemId,
            },
          };
      }
    },
    getType() {
      switch (this.typeItem) {
        case 'CONTACT':
          return { contact: { id: this.itemId } };
        case 'COMPANY':
          return { company: { id: this.itemId } };
        case 'DEAL':
          return { deal: { id: this.itemId } };
        default:
          return { contact: { id: this.itemId } };
      }
    },
    saveNote() {
      this.validMessage(this.content);
      if (this.isValidMessage) {
        const beforeImages = JSON.parse(JSON.stringify(this.images));
        const note = this.content;
        this.isLoading = true;
        const getTypeId = this.getType();
        const userTags = this.getUserTags(note);
        const noteInput = {
          content: note,
          type: [{ important: false }],
          ...getTypeId,
          userTags,
        };

        this.images = [];

        this.getKeyImage(this.content);

        const imagesToDelete = beforeImages.filter(
          ({ key }) => !this.images.some((image) => image.key === key),
        );

        if (imagesToDelete.length > 0) {
          imagesToDelete.forEach(({ key }) => {
            this.deleteFileWhitOutModal(key);
          });
        }

        this.$apollo
          .mutate({
            mutation: CREATE_NOTE,
            variables: {
              noteInput,
            },
          })
          .then(() => {
            this.$emit('updateHistory');
            this.isLoading = false;
            this.close();
          })
          .catch(() => {
            const error =
              'No se pudo guardar la nota, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
    getUserTags(html) {
      const usersTags = [];
      html.replace(
        /<span\s(?:class="mention")\s(?:data-mention-id="(.*?)")>(.*?)<\/span>/gi,
        (element, id) => {
          usersTags.push({ id });
          return `${id}`;
        },
      );

      return usersTags.length ? usersTags : null;
    },
    updateNote(content) {
      this.isLoading = true;
      const { id } = this.modal.item;
      const userTags = this.getUserTags(content);
      const noteInput = {
        id,
        content,
        userTags,
      };

      const images = [];

      content.replace(/<img[^>]*>/gi, (imgTag) => {
        imgTag.replace(
          /\b(alt\s*=\s*(?:['"]?))([^'"> ]+)/i,
          (alt, prefix, url) => {
            images.push({ key: url });
          },
        );
      });

      const imagesToDelete = this.images.filter(({ key }) => {
        return !images.some(({ key: keyImage }) => {
          return key === keyImage;
        });
      });
      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach(({ key }) => {
          this.deleteFileWhitOutModal(key);
        });
      }
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTE,
          variables: {
            noteInput,
          },
        })
        .then(() => {
          this.$emit('updateHistory');
          this.isLoading = false;
          this.close();
        })
        .catch(() => {
          const error =
            'No se pudo actualizar la nota, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
  },
  apollo: {
    userCurrent: {
      query: GET_USER_LOGGED,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .tiptap-vuetify-editor__content  } from ../../../../scss/components/modal.note';
</style>
