<template>
  <v-card class="note" flat color="#FDE584">
    <v-card-title class="d-flex justify-space-between mr-1 title-note">
      Nota
      <v-menu
        bottom
        offset-y
        left
        v-if="(canEdit || canEditOthers) && !note.isDelete && isMe"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="edit">
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="typeItem !== 'ACTION'" @click="remove">
            <v-list-item-title>Eliminar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-subtitle>
      {{ note.createdAt | dateNow }} - {{ note.createdBy.user.name }}
      {{ note.createdBy.user.lastName }}
    </v-card-subtitle>
    <v-card-text>
      <div v-html="note.content"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
// Permissions
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
  PERMISSIONS_NOTES,
} from '@/constants/permissions';

export default {
  name: 'NoteTemplate',
  props: {
    note: {
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
  },
  data() {
    return {
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
    isMe() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_NOTES, {
          authorId: this.note.createdBy.id || '',
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
    edit() {
      this.$emit('edit');
    },
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .note .mention } from ../../../../scss/components/note.template';
</style>
