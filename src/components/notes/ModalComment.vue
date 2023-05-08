<template>
  <v-dialog v-model="modal.status" scrollable max-width="500px" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Editar comentario
        <v-spacer />
        <v-btn icon color="white" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-2">
        <NoteEditor
          :isEdit="modal.isEdit"
          :message="messageDefault"
          @updateMessage="updateMessage"
          :reset="modal.status"
          typeItem="COMMENT"
        ></NoteEditor>
        <p v-if="!isValidMessage" class="red--text">
          El mensaje es requerido
        </p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" outlined @click="close">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="updateComment" :loading="isLoading">
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NoteEditor from '@/components/notes/NoteEditor.vue';
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { UPDATE_COMMENT_NOTE } from '@/graphql/mutations/notesMutations';

export default {
  name: 'ModalComment',
  mixins: [modalMethodsMixin, modalApolloMixin],
  components: {
    NoteEditor,
  },
  data() {
    return {
      messageDefault: '',
      modalId: 'createComment',
      modal: {},
      isLoading: false,
      comment: '',
      isValidMessage: true,
    };
  },
  watch: {
    modal(modalItem) {
      if (modalItem.isEdit) this.getNote();
      if (!modalItem.status) this.reset();
    },
    comment(value) {
      this.validMessage(value);
    },
  },
  computed: {
    filters() {
      return { filters: { noteId: this.modal.item.note.id } };
    },
  },
  methods: {
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
    reset() {
      setTimeout(() => {
        this.messageDefault = '';
      }, 1);
    },
    getNote() {
      this.messageDefault = this.modal.item.comment;
    },
    updateMessage(message) {
      this.comment = message;
    },
    close() {
      this.changeModal({
        id: 'createComment',
        status: false,
        isEdit: false,
        item: null,
      });
      setTimeout(() => {
        this.reset();
      }, 1);
    },
    updateComment() {
      this.validMessage(this.comment);
      if (this.isValidMessage) {
        this.isLoading = true;
        const { comment } = this;
        const { id } = this.modal.item;
        const userTags = this.getUserTags(comment);
        this.$apollo
          .mutate({
            // Query
            mutation: UPDATE_COMMENT_NOTE,
            // Parameters
            variables: {
              noteCommentInput: {
                id,
                comment,
                userTags,
              },
            },
          })
          .then(() => {
            this.$emit('updateHistory');
            // Result
            this.isLoading = false;
            this.close();
          })
          .catch(() => {
            const error =
              'No se pudo actualizar el comentario, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
            // Error
            this.isLoading = false;
            this.close();
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
