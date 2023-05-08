import VuetifyMoney from '@/components/VuetifyMoney.vue';

export const vuetifyMoneyMixin = {
  components: { VuetifyMoney },
  data() {
    return {
      inputMoneyOptions: {
        locale: 'en-US',
        prefix: '$',
        suffix: 'MXN',
        length: 9,
        precision: 2,
      },
    };
  },
};
