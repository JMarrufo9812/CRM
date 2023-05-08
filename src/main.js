import Vue from 'vue';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import { abilitiesPlugin } from '@casl/vue';
import InputFacade from 'vue-input-facade';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { createProvider } from './vue-apollo';
import './helpers/filters';
import './plugins/tiptap-vuetify';
import ability from './services/ability';
import './plugins/vuetify-money';
// moment
const moment = require('moment');
require('moment/locale/es-mx');

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
const months = 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
  '_',
);
const weekdays = 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split(
  '_',
);
moment.updateLocale('es-mx', {
  months,
  weekdays,
  week: {
    dow: 1,
  },
  longDateFormat: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY LT',
    LLLL: 'dddd, D [de] MMMM [de] YYYY LT',
  },
  calendar: {
    /* eslint-disable */
    sameDay: function() {
      return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    nextDay: function() {
      return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    nextWeek: function() {
      return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    lastDay: function() {
      return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    lastWeek: function() {
      return (
        '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT'
      );
    },
    sameElse: 'LLL',
  },
});
Vue.use(abilitiesPlugin, ability);
Vue.use(VuetifyGoogleAutocomplete, {
  version: 'weekly',
  apiKey: process.env.VUE_APP_API_KEY_MAPS,
});

Vue.use(InputFacade, {
  name: 'mask',
  tokens: {
    '#': { pattern: /\d/ },
  },
});

Vue.mixin({
  methods: {
    noReactive: (element) => {
      return JSON.parse(JSON.stringify(element));
    },
    formatDate(date) {
      const newDate = moment(date);
      return newDate.format('DD/MM/YYYY');
    },
    formatDateAndHour(date) {
      const newDate = moment(date);
      return newDate.format('DD/MM/YYYY hh:mma');
    },
    formatPrice(price) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(price);
    },
  },
});

Vue.use(require('vue-moment'), { moment });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
