<template>
  <EmailList :labelId="labelId" :query="query"></EmailList>
</template>

<script>
import EmailList from '@/components/emails/EmailList.vue';

export default {
  name: 'Trash',
  components: {
    EmailList,
  },
  data() {
    return {
      labelId: 'TRASH',
      query: 'is:trash',
    };
  },
};
</script>

<style lang="scss" scoped></style>
