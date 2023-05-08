<template>
  <v-card class="mx-4" flat>
    <v-list three-line>
      <template>
        <v-list-item dense>
          <v-list-item-avatar color="secondary" class="justify-center">
            <span class="white--text">
              {{
                nameAccount({
                  name: this.userCurrent.user.name || '',
                  lastName: this.userCurrent.user.lastName || '',
                }) || ''
              }}
            </span>
          </v-list-item-avatar>
          <v-list-item-content>
            <NoteEditor
              typeItem="COMMENT"
              :reset="!isLoading"
              @updateMessage="updateMessage"
            ></NoteEditor>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="success"
              @click="createComment"
              :loading="isLoading"
              :disabled="!isValidMessage"
            >
              Comentar
              <v-icon class="ml-2" color="white">mdi-send</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-card>
</template>

<script>
import NoteEditor from '@/components/notes/NoteEditor.vue';
import { CREATE_COMMENT_NOTE } from '@/graphql/mutations/notesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';

export default {
  name: 'NoteAddComment',
  mixins: [modalsAlertsMixin],
  components: {
    NoteEditor,
  },
  props: {
    note: {
      type: Object,
      defult: () => {
        return {};
      },
    },
    userCurrent: {
      type: Object,
      defult: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isLoading: false,
      comment: '',
      isValidMessage: false,
    };
  },
  computed: {
    filters() {
      return { filters: { noteId: this.note.id } };
    },
  },
  watch: {
    comment(value) {
      this.validMessage(value);
    },
  },
  methods: {
    validMessage(message) {
      this.isValidMessage = !this.isEmptyEditor(message);
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
    getToday() {
      const today = new Date();
      const date = `${today.getDate()}/${today.getMonth() +
        1}/${today.getFullYear()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      return `${date} ${time}`;
    },
    nameAccount({ name, lastName }) {
      if (!name && lastName) return 'SN';
      return `${name.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
    },
    updateMessage(message) {
      this.comment = message;
    },
    createComment() {
      this.validMessage(this.comment);
      if (this.isValidMessage) {
        const { note, comment } = this;
        const userTags = this.getUserTags(comment);
        this.isLoading = true;
        this.$apollo
          .mutate({
            // Query
            mutation: CREATE_COMMENT_NOTE,
            // Parameters
            variables: {
              noteCommentInput: {
                note: { id: note.id },
                comment,
                userTags,
              },
            },
          })
          .then(() => {
            this.$emit('updateHistory');
            // Result
            this.isLoading = false;
            this.isValidMessage = false;
          })
          .catch(() => {
            // Error
            this.isLoading = false;
            const error =
              'No se pudo comentar la nota, intente de nuevo o contacte a soporte';
            this.modalHandlerError({ isOpen: true, error });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
