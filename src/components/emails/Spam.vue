<template>
  <EmailList :labelId="labelId" :query="query"></EmailList>
</template>

<script>
import EmailList from '@/components/emails/EmailList.vue';

export default {
  name: 'Spam',
  components: {
    EmailList,
  },
  data() {
    return {
      labelId: 'SPAM',
      query: 'is:spam',
    };
  },
};
</script>

<style lang="scss" scoped></style>
