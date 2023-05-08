<template>
  <EmailList :labelId="labelId" :query="query"></EmailList>
</template>

<script>
import EmailList from '@/components/emails/EmailList.vue';

export default {
  name: 'Inbox',
  components: {
    EmailList,
  },
  data() {
    return {
      labelId: 'INBOX',
      query: 'is:inbox',
    };
  },
};
</script>

<style lang="scss" scoped></style>
