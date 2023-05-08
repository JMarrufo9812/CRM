<template>
  <EmailList :labelId="labelId" :query="query"></EmailList>
</template>

<script>
import EmailList from '@/components/emails/EmailList.vue';

export default {
  name: 'Sent',
  components: {
    EmailList,
  },
  data() {
    return {
      labelId: 'SENT',
      query: 'in:sent',
    };
  },
};
</script>

<style lang="scss" scoped></style>
