<template>
  <component
    :is="dynamicComponent"
    :item="item"
    :typeItem="typeItem"
    :itemId="itemId"
    :ownerId="ownerId"
    :targets="targets"
    :isImport="isImport"
    :users="users"
    @updateHistory="updateHistory"
  ></component>
</template>

<script>
export default {
  name: 'AllHistory',
  props: {
    item: {
      object: {
        type: Object,
        required: true,
      },
    },
    itemId: {
      type: String,
      default: '',
      required: true,
    },
    ownerId: {
      type: String,
      default: '',
    },
    typeItem: {
      type: String,
      required: true,
      default: 'CONTACT',
    },
    users: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    isImport: {
      isRequired: true,
      type: Boolean,
    },
    targets: {
      type: Object,
      default: () => {
        return {
          contacts: [],
          companies: [],
          deals: [],
        };
      },
    },
  },
  components: {
    Change: () => import('@/components/profile/Change.vue'),
    Note: () => import('@/components/notes/Note.vue'),
    File: () => import('@/components/profile/File.vue'),
    Action: () => import('@/components/activities/Action.vue'),
    Email: () => import('@/components/emails/Email.vue'),
  },
  computed: {
    dynamicComponent() {
      switch (this.item.template) {
        case 'NOTE':
          return 'Note';
        case 'FILE':
          return 'File';
        case 'ACTIVITY':
          return 'Action';
        case 'CHANGE':
          return 'Change';
        case 'EMAIL':
          return 'Email';
        default:
          return '';
      }
    },
  },
  methods: {
    updateHistory() {
      this.$emit('updateHistory');
    },
  },
};
</script>
