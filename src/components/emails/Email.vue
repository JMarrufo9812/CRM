<template>
  <v-row>
    <v-card outlined class="my-4" width="95%">
      <v-card-title>Re: {{ item.subject }}</v-card-title>
      <v-card-subtitle>
        enviado {{ item.createdAt | timeZoneFromNow }} por
        {{ getUser(item.createdBy.id) }} a {{ item.sendTo }}
      </v-card-subtitle>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'Email',
  props: {
    item: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    getUser(id) {
      const isExist = this.users.some((item) => item.id === id);
      if (isExist) {
        const { user } = this.users.find((item) => item.id === id);
        return `${user.name} ${user.lastName}`;
      }
      return 'Usuario eliminado';
    },
  },
};
</script>
