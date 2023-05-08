<template>
  <v-card flat>
    <v-card-title class="pt-1 pb-2 action-title">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="primary"
        :size="20"
        class="mr-2"
      ></v-progress-circular>
      <template v-else>
        <v-tooltip
          top
          color="primary"
          v-if="(canEdit || canEditOthers) && !action.isDelete && isMe"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-simple-checkbox
              v-bind="attrs"
              v-on="on"
              :color="isComplete(action.status) ? 'success' : 'primary'"
              on-icon="mdi-checkbox-marked-circle"
              off-icon="mdi-checkbox-blank-circle-outline"
              :value="isComplete(action.status)"
              @click="changeStatus(action.id, action.status)"
            ></v-simple-checkbox>
          </template>
          <span>
            {{ isComplete(action.status) ? 'Desmarcar' : 'Completar' }}
          </span>
        </v-tooltip>
        <span v-else class="mr-1">
          <v-icon
            :disabled="
              !((canEdit || canEditOthers) && !action.isDelete) || !isMe
            "
          >
            {{
              isComplete(action.status)
                ? 'mdi-checkbox-marked-circle'
                : 'mdi-checkbox-blank-circle-outline'
            }}
          </v-icon>
        </span>
      </template>
      <span
        :style="
          isComplete(action.status) ? 'text-decoration-line: line-through;' : ''
        "
      >
        {{ action.title }}
      </span>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        offset-y
        left
        v-if="(canEdit || canEditOthers) && !action.isDelete && isMe"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            :disabled="
              !((canEdit || canEditOthers) && !action.isDelete) || !isMe
            "
          >
            <v-icon color="primary">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="edit">
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeStatus(action.id, action.status)">
            <v-list-item-title>
              {{
                isComplete(action.status)
                  ? 'Marcar como incompleta'
                  : 'Marcar como completada'
              }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="remove()">
            <v-list-item-title>Eliminar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text
      class="pb-0 mb-0"
      v-html="action.description"
      v-if="
        action.description &&
          action.description.length > 0 &&
          action.description !== '<p></p>'
      "
    ></v-card-text>
    <v-card-subtitle class="d-flex py-0">
      <template v-if="action.status !== 'PENDING'">
        <span class="mr-1">
          completada como
        </span>
        <span
          class="font-weight-bold mr-1"
          :class="
            action.status === 'EFFECTIVE' ? 'success--text' : 'error--text'
          "
        >
          {{ getStatus(action.status) }}
        </span>
        <span class="font-weight-bold">
          {{ action.completedDate | timeZoneFromNow }}
        </span>
      </template>
      <template v-else>
        <div class="mt-3" :class="{ 'mr-1': canEdit || canEditOthers }">
          <span>
            Programada para
          </span>
          <span v-if="action.isAllDay" class="font-weight-bold">
            {{ `el ${formatDate(action.start.split(' ')[0])}` }}
          </span>
          <span v-else class="font-weight-bold">
            {{ action.start | timeZoneFromNow }}
          </span>
        </div>
      </template>
    </v-card-subtitle>
    <v-card-subtitle class="py-0">
      <span
        :class="{ 'mr-4': (canEdit || canEditOthers) && !action.isDelete }"
        v-if="action.contacts.length === 1"
      >
        <v-icon small class="mb-1">mdi-account</v-icon>
        {{ action.contacts[0].name }}
      </span>
      <v-menu allow-overflow v-if="action.contacts.length > 1">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top color="white">
            <template v-slot:activator="{ on: tooltip }">
              <v-chip
                outlined
                class="ml-1 pa-1"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
                small
              >
                <v-icon x-small>mdi-account</v-icon>
                + {{ action.contacts.length }}
              </v-chip>
            </template>
            <span class="black--text">
              Esta actividad cuenta con más de un contacto has click para ver
            </span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(contact, index) in action.contacts"
            :key="index"
            dense
          >
            <v-icon class="mr-2" small>mdi-account</v-icon>
            <v-list-item-title>{{ contact.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="ml-4" v-if="action.companies.length === 1">
        <v-icon small class="mb-1">mdi-domain</v-icon>
        {{ action.companies[0].name }}
      </span>
      <v-menu allow-overflow v-if="action.companies.length > 1">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top color="white">
            <template v-slot:activator="{ on: tooltip }">
              <v-chip
                outlined
                class="ml-1 pa-1"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
                small
              >
                <v-icon x-small>mdi-domain</v-icon>
                + {{ action.companies.length }}
              </v-chip>
            </template>
            <span class="black--text">
              Esta actividad cuenta con más de un contacto has click para ver
            </span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(company, index) in action.companies"
            :key="index"
            dense
          >
            <v-icon class="mr-2" small>mdi-domain</v-icon>
            <v-list-item-title>{{ company.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="ml-4" v-if="action.deal">
        <v-icon small class="mb-1">mdi-handshake</v-icon>
        {{ action.deal.title }}
      </span>
    </v-card-subtitle>
    <v-card-subtitle class="pt-0 pb-2 pl-4">
      Creado por {{ action.owner.user.name }}
      {{ action.owner.user.lastName }}
      {{ action.createdAt | timeZoneFromNow }}
    </v-card-subtitle>
    <v-card-text v-if="action.notes.length > 0">
      <Note
        :item="action.notes[0]"
        :typeItem="'ACTION'"
        :itemId="action.id"
        :comments="false"
        @updateHistory="updateHistory"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';
// Permissions
import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { UPDATE, UPDATE_OTHERS } from '@/constants/methods';
import {
  PERMISSIONS_ACTIVITIES,
  PERMISSIONS_CONTACTS,
  PERMISSIONS_COMPANIES,
  PERMISSIONS_DEALS,
} from '@/constants/permissions';

export default {
  name: 'ActionTemplate',
  props: {
    action: {
      type: Object,
      required: true,
      default: () => {
        return {
          notes: [],
        };
      },
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    ownerId: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
    },
  },
  components: { Note: () => import('@/components/notes/Note.vue') },
  data() {
    return {
      PERMISSIONS_CONTACTS,
      PERMISSIONS_COMPANIES,
      PERMISSIONS_DEALS,
      PERMISSIONS_ACTIVITIES,
      UPDATE,
      subject,
    };
  },
  computed: {
    isMe() {
      return ability.can(
        UPDATE,
        subject(PERMISSIONS_ACTIVITIES, {
          authorId: this.action.owner.id || '',
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
    formatDate(date) {
      return moment(date).format('LL');
    },
    updateHistory() {
      this.$emit('updateHistory');
    },
    isComplete(status) {
      return status !== 'PENDING';
    },
    getStatus(status) {
      if (status !== 'PENDING') {
        if (status === 'EFFECTIVE') return 'efectiva';
        if (status === 'INEFFECTIVE') return 'inefectiva';
      }
      return '';
    },
    // Active the mode edit
    edit() {
      this.$emit('edit');
    },
    remove() {
      this.$emit('remove');
    },
    changeStatus(id, status) {
      this.$emit('done', id, this.isComplete(status));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .action-title } from ../../../../scss/components/action.scss';
::v-deep p {
  margin-bottom: 0.7em;
}
</style>
