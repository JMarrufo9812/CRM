module.exports = {
  client: {
    service: {
      name: 'back-cervus',
      url: 'https://master-prod.escalacrm.com/graphql',
      skipSSLValidation: true,
    },
    includes: ['src/*/*.{js,jsx,ts,tsx,vue,gql}'],
  },
};
