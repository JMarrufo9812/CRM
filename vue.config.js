module.exports = {
  // transpileDependencies: ['vuetify'],
  css: {
    extract: { ignoreOrder: true },
  },
  pluginOptions: {
    // Apollo-related options
    apollo: {
      lintGQL: true,
    },
  },
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(50000000).maxAssetSize(50000000);
    config.plugin('html').tap((args) => {
      args[0].title = 'Cervus CRM'; // eslint-disable-line no-param-reassign
      return args;
    });
  },
};
