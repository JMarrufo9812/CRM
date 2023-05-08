import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import { Ripple } from 'vuetify/lib/directives';
// import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  lang: {
    locales: { es },
    current: 'es',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2E2E2F',
        secondary: '#881414',
        error: '#881414',
        success: '#396A5D',
        accent: '#121271',
        info: '#12657E',
        warning: '#F08931',
      },
    },
  },
});
