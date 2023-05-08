<template>
  <div>
    <div class="d-flex justify-end">
      <div>
        <v-btn
          small
          plain
          @click="showAllComments = !showAllComments"
          class="mr-4"
        >
          {{ textComments }}
          <v-icon>
            {{ showAllComments ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-expand-transition v-if="!showAllComments">
      <div class="mx-4">
        <v-list three-line dense v-if="note.comments && note.comments.length">
          <template v-for="noteComment in comments">
            <v-list-item :key="noteComment.id" class="comment">
              <v-list-item-avatar
                size="25"
                color="secondary"
                class="justify-center"
              >
                <span class="white--text">
                  {{
                    nameAccount({
                      name: noteComment.createdBy.user.name,
                      lastName: noteComment.createdBy.user.lastName,
                    }) || ''
                  }}
                </span>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ noteComment.createdBy.user.name }}
                  {{ noteComment.createdBy.user.lastName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ noteComment.createdAt | dateNow }}
                </v-list-item-subtitle>
                <div
                  class="comment__content"
                  v-html="noteComment.comment"
                ></div>
              </v-list-item-content>
              <v-list-item-action
                class="comment__actions"
                v-if="
                  (canEdit || canEditOthers) &&
                    !note.isDelete &&
                    isMe(noteComment.createdBy.id)
                "
              >
                <v-menu bottom offset-y left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon color="secondary">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item dense @click="editComment(noteComment)">
                      <v-list-item-title>Editar</v-list-item-title>
                    </v-list-item>
                    <v-list-item dense @click="removeComment(noteComment.id)">
                      <v-list-item-title>Eliminar</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-expand-transition>
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
    <ModalComment @updateHistory="updateHistory" />
  </div>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { modalMethodsMixin } from '@/mixins/modalsMixin';
import { DELETE_COMMENT_NOTE } from '@/graphql/mutations/notesMutations';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
  PERMISSIONS_NOTES,
} from '@/constants/permissions';

export default {
  name: 'NoteListComments',
  mixins: [modalMethodsMixin, modalsAlertsMixin],
  components: {
    ModalComment: () => import('@/components/notes/ModalComment.vue'),
  },
  props: {
    note: {
      type: Object,
      default: () => {
        return {};
      },
    },
    typeItem: {
      type: String,
      required: true,
      default: '',
    },
    ownerId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      MAX_COMMENTS: 2,
      showAllComments: false,
      PERMISSIONS_NOTES,
      UPDATE,
      UPDATE_OTHERS,
      subject,
    };
  },
  computed: {
    textComments() {
      if (this.note?.comments?.length === 1)
        return `${this.note?.comments?.length} comentario`;
      return `${this.note?.comments?.length || 0} comentarios`;
    },
    filters() {
      return { filters: { noteId: this.note.id } };
    },
    comments() {
      return this.note.comments
        .slice(0)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    },
    canEdit() {
      if (this.typeItem === 'CONTACT') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'DEAL') {
        return ability.can(
          UPDATE,
          subject(PERMISSIONS_DEALS, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },
    canEditOthers() {
      if (this.typeItem === 'CONTACT') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_CONTACTS, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(
          UPDATE_OTHERS,
          subject(PERMISSIONS_CONTACTS, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'COMPANY') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_COMPANIES, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(
          UPDATE_OTHERS,
          subject(PERMISSIONS_COMPANIES, { authorId: this.ownerId || '' }),
        );
      }
      if (this.typeItem === 'DEAL') {
        if (!this.canEdit) {
          return (
            ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS) &&
            !ability.can(
              UPDATE_OTHERS,
              subject(PERMISSIONS_DEALS, {
                authorId: this.ownerId || '',
              }),
            )
          );
        }
        return ability.can(
          UPDATE_OTHERS,
          subject(PERMISSIONS_DEALS, { authorId: this.ownerId || '' }),
        );
      }
      return false;
    },
  },
  methods: {
    isMe(authorId) {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_NOTES, {
          authorId: authorId || '',
        }),
      );
    },
    nameAccount({ name, lastName }) {
      if (!name && lastName) return 'SN';
      return `${name.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
    },
    editComment(comment) {
      this.changeModal({
        id: 'createComment',
        status: true,
        isEdit: true,
        item: comment,
      });
    },
    removeComment(noteCommentId) {
      this.$apollo
        .mutate({
          // Query
          mutation: DELETE_COMMENT_NOTE,
          // Parameters
          variables: {
            noteCommentId,
          },
        })
        .then(() => {
          this.updateHistory();
        })
        .catch(() => {
          // Error
          const error =
            'No se pudo eliminar el comentario, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    updateHistory() {
      this.$emit('updateHistory');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .comment .mention} from ../../../../scss/components/note.list.comments';
</style>
