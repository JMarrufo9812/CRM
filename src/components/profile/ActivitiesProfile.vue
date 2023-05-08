<template>
  <div>
    <MenuPlus
      :disabled="!((canEdit || canEditOthers) && !itemComplete.isDelete)"
    >
      <v-list-item @click="openCreateNote">
        <v-list-item-title>Crear nota</v-list-item-title>
      </v-list-item>
      <v-list-item @click="openCreateActivity">
        <v-list-item-title>Crear actividad</v-list-item-title>
      </v-list-item>
      <v-list-item @click="dialogFile = true">
        <v-list-item-title>Subir archivo</v-list-item-title>
      </v-list-item>
    </MenuPlus>
    <ModalNote
      :itemId="item.id"
      :typeItem="typeItem"
      @updateHistory="updateHistory"
    ></ModalNote>
    <ModalActivity
      :item="item"
      :typeItem="typeItem"
      @updateHistory="updateHistory"
    ></ModalActivity>
    <ModalFile
      :dialog.sync="dialogFile"
      :itemId="item.id"
      :typeItem="typeItem"
      @updateHistory="updateHistory"
    ></ModalFile>
  </div>
</template>

<script>
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import MenuPlus from '@/components/profile/MenuPlus.vue';
import ModalNote from '@/components/profile/ModalNote.vue';
import ModalActivity from '@/components/activities/ModalActivity.vue';
import ModalFile from '@/components/profile/ModalFile.vue';
import { modalMethodsMixin } from '@/mixins/modalsMixin';
// Permissions
import {
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
} from '@/constants/permissions';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';

export default {
  name: 'ActivitiesProfile',
  components: {
    MenuPlus,
    ModalNote,
    ModalActivity,
    ModalFile,
  },
  mixins: [modalMethodsMixin],
  props: {
    itemComplete: {
      type: Object,
      default: () => {},
      required: true,
    },
    item: {
      type: Object,
      default: () => {},
    },
    ownerId: {
      type: String,
      default: '',
    },
    typeItem: {
      type: String,
      default: 'CONTACT',
    },
  },
  data() {
    return {
      dialogNote: false,
      dialogAction: false,
      dialogFile: false,
      subject,
      UPDATE,
      UPDATE_OTHERS,
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_DEALS,
    };
  },
  computed: {
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
    updateHistory() {
      this.$emit('updateHistory');
    },
    openCreateNote() {
      this.changeModal({
        id: 'createNote',
        status: true,
        isEdit: false,
        item: null,
      });
    },
    openCreateActivity() {
      this.changeModal({
        id: 'createActivity',
        status: true,
        isEdit: false,
        item: null,
      });
    },
  },
};
</script>
