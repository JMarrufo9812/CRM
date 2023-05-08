<template>
  <v-card color="#FDE584" class="mr-11 pb-2">
    <NoteTemplate
      @edit="edit"
      @remove="removeConfirm"
      :note="item"
      :ownerId="ownerId"
      :typeItem="typeItem"
    ></NoteTemplate>
    <NoteListComments
      v-if="comments"
      :note="item"
      :ownerId="ownerId"
      :typeItem="typeItem"
      @updateHistory="updateHistory"
    ></NoteListComments>
    <NoteAddComment
      v-if="(canEdit || canEditOthers) && !item.isDelete"
      :note="item"
      :userCurrent="userCurrent"
      @updateHistory="updateHistory"
    ></NoteAddComment>
    <BaseModalDelete
      :modalHandler="modalDelete"
      @cancel="modalHandlerDelete"
      @confirm="remove"
    />
    <BaseModalError :modalHandler="modalError" @close="modalHandlerError" />
  </v-card>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
// graphql
import { DELETE_NOTE } from '@/graphql/mutations/notesMutations';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';
// mixins
import { modalMethodsMixin, modalApolloMixin } from '@/mixins/modalsMixin';
import { modalsAlertsMixin } from '@/mixins/alerts/modalsAlertsMixin';
import { filesMixin } from '@/mixins/filesMixin';
// Permissions
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
  PERMISSIONS_NOTES,
} from '@/constants/permissions';

export default {
  name: 'Note',
  components: {
    NoteTemplate: () => import('@/components/notes/NoteTemplate.vue'),
    NoteAddComment: () => import('@/components/notes/NoteAddComment.vue'),
    NoteListComments: () => import('@/components/notes/NoteListComments.vue'),
  },
  mixins: [modalsAlertsMixin, modalMethodsMixin, modalApolloMixin, filesMixin],
  props: {
    item: {
      type: Object,
      required: true,
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
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    comments: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      userCurrent: {},
      UPDATE,
      UPDATE_OTHERS,
      subject,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_DEALS,
      PERMISSIONS_NOTES,
    };
  },
  computed: {
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
    isMe() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_NOTES, {
          authorId: this.item.createdBy.id || '',
        }),
      );
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
        return ability.can(UPDATE_OTHERS, PERMISSIONS_CONTACTS);
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
        return ability.can(UPDATE_OTHERS, PERMISSIONS_COMPANIES);
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
        return ability.can(UPDATE_OTHERS, PERMISSIONS_DEALS);
      }
      return false;
    },
  },
  methods: {
    removeConfirm() {
      this.modalHandlerDelete({
        isOpen: true,
        isLoading: false,
        message: { nameItem: 'La Nota', text: 'será eliminada' },
        infoDelete: {},
      });
    },
    remove({ isOpen, isLoading, message, infoDelete }) {
      this.modalHandlerDelete({ isOpen, isLoading, message, infoDelete });

      const { id: noteId, content } = this.item;

      const imagesToDelete = [];

      content.replace(/<img[^>]*>/gi, (imgTag) => {
        imgTag.replace(
          /\b(alt\s*=\s*(?:['"]?))([^'"> ]+)/i,
          (alt, prefix, url) => {
            imagesToDelete.push({ key: url });
          },
        );
      });

      this.$apollo
        .mutate({
          mutation: DELETE_NOTE,
          variables: {
            noteInput: {
              noteId,
            },
          },
        })
        .then(() => {
          this.updateHistory();
          imagesToDelete.forEach(({ key }) => {
            this.deleteFileWhitOutModal(key);
          });
          this.modalHandlerDelete({
            isOpen: false,
            isLoading,
            message,
            infoDelete,
          });
        })
        .catch(() => {
          const error =
            'No se pudo eliminar la nota, intente de nuevo o contacte a soporte';
          this.modalHandlerError({ isOpen: true, error });
        });
    },
    edit() {
      this.changeModal({
        id: 'createNote',
        status: true,
        isEdit: true,
        item: this.item,
      });
    },
    updateHistory() {
      this.$emit('updateHistory');
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
@import '{ img .v-card__text } from ../../../../scss/components/note';
</style>
