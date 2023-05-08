export const socialMediaMixin = {
  data() {
    return {
      listSocial: [
        {
          type: 'facebook',
          icon: 'mdi-facebook',
          color: '#4267B2',
        },
        {
          type: 'twitter',
          icon: 'mdi-twitter',
          color: '#1DA1F2',
        },
        {
          type: 'linkedin',
          icon: 'mdi-linkedin',
          color: '#0e76a8',
        },
        {
          type: 'instagram',
          icon: 'mdi-instagram',
          color: '#E1306C',
        },
        {
          type: 'other',
          icon: 'mdi-account-supervisor',
          color: '#0247FF',
        },
      ],
    };
  },
  methods: {
    getSocialMedia({ url, type }) {
      const socialMedia = this.listSocial.find(
        (itemSocial) => itemSocial.type === type || itemSocial.type === 'other',
      );

      return { ...socialMedia, url };
    },
    pushExteriorUrl(url) {
      const validUrl = url.includes('https://');
      if (validUrl) {
        window.open(url, '_blank');
      } else {
        window.open(`https://${url}`, '_blank');
      }
    },
  },
};
