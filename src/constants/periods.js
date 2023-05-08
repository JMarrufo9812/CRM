import moment from 'moment';

const periods = [
  {
    id: 'TODAY',
    text: 'Hoy',
    textCompare: 'Ayer',
    get: () => {
      const startToday = moment()
        .startOf('day')
        .format();
      const endToday = moment()
        .endOf('day')
        .format();
      return [startToday, endToday];
    },
    getV2: () => {
      const startToday = moment()
        .startOf('day')
        .format();
      const endToday = moment()
        .endOf('day')
        .format();
      return {
        start: startToday,
        end: endToday,
      };
    },
  },
  {
    id: 'YESTERDAY',
    text: 'Ayer',
    textCompare: 'Antes de ayer',
    get: () => {
      const yesterdayStart = moment()
        .subtract(1, 'days')
        .startOf('day')
        .format();
      const yesterdayEnd = moment()
        .subtract(1, 'days')
        .endOf('day')
        .format();
      return [yesterdayStart, yesterdayEnd];
    },
    getV2: () => {
      const yesterdayStart = moment()
        .subtract(1, 'days')
        .startOf('day')
        .format();
      const yesterdayEnd = moment()
        .subtract(1, 'days')
        .endOf('day')
        .format();
      return {
        start: yesterdayStart,
        end: yesterdayEnd,
      };
    },
  },
  {
    id: 'THIS_WEEK',
    text: 'Esta semana',
    textCompare: 'La semana pasada',
    get: () => {
      return [
        moment()
          .startOf('week')
          .format(),
        moment()
          .endOf('week')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .startOf('week')
          .format(),
        end: moment()
          .endOf('week')
          .format(),
      };
    },
  },
  {
    id: 'LAST_WEEK',
    text: 'La semana pasada',
    textCompare: 'Hace 2 semanas',
    get: () => {
      return [
        moment()
          .subtract(1, 'weeks')
          .startOf('week')
          .format(),
        moment()
          .subtract(1, 'weeks')
          .endOf('week')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .subtract(1, 'weeks')
          .startOf('week')
          .format(),
        end: moment()
          .subtract(1, 'weeks')
          .endOf('week')
          .format(),
      };
    },
  },
  {
    id: 'THIS_MONTH',
    text: 'Este mes',
    textCompare: 'El mes anterior',
    get: () => {
      return [
        moment()
          .startOf('month')
          .format(),
        moment()
          .endOf('month')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .startOf('month')
          .format(),
        end: moment()
          .endOf('month')
          .format(),
      };
    },
  },
  {
    id: 'LAST_MONTH',
    text: 'El mes pasado',
    textCompare: 'Hace 2 meses',
    get: () => {
      return [
        moment()
          .subtract(1, 'months')
          .startOf('month')
          .format(),
        moment()
          .subtract(1, 'months')
          .endOf('month')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .subtract(1, 'months')
          .startOf('month')
          .format(),
        end: moment()
          .subtract(1, 'months')
          .endOf('month')
          .format(),
      };
    },
  },
  {
    id: 'THIS_QUARTER',
    text: 'Este trimestre',
    textCompare: 'El trimestre pasado',
    get: () => {
      return [
        moment()
          .startOf('quarter')
          .format(),
        moment()
          .endOf('quarter')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .startOf('quarter')
          .format(),
        end: moment()
          .endOf('quarter')
          .format(),
      };
    },
  },
  {
    id: 'LAST_QUARTER',
    text: 'El trimestre pasado',
    textCompare: 'Hace 2 trimestres',
    get: () => {
      return [
        moment()
          .subtract(1, 'quarters')
          .startOf('quarter')
          .format(),
        moment()
          .subtract(1, 'quarters')
          .endOf('quarter')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .subtract(1, 'quarters')
          .startOf('quarter')
          .format(),
        end: moment()
          .subtract(1, 'quarters')
          .endOf('quarter')
          .format(),
      };
    },
  },
  {
    id: 'THIS_YEAR',
    text: 'Este año',
    textCompare: 'El año pasado',
    get: () => {
      return [
        moment()
          .startOf('year')
          .format(),
        moment()
          .endOf('year')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .startOf('year')
          .format(),
        end: moment()
          .endOf('year')
          .format(),
      };
    },
  },
  {
    id: 'LAST_YEAR',
    text: 'El año pasado',
    textCompare: 'Hace 2 años',
    get: () => {
      return [
        moment()
          .subtract(1, 'years')
          .startOf('year')
          .format(),
        moment()
          .subtract(1, 'years')
          .endOf('year')
          .format(),
      ];
    },
    getV2: () => {
      return {
        start: moment()
          .subtract(1, 'years')
          .startOf('year')
          .format(),
        end: moment()
          .subtract(1, 'years')
          .endOf('year')
          .format(),
      };
    },
  },
  {
    id: 'CUSTOM',
    text: 'Personalizado',
    textCompare: 'Personalizado',
  },
];

function findPeriod(idPeriod) {
  return periods.find((period) => period.id === idPeriod);
}

const periodsToCompare = [
  {
    id: 'PREVIOUS_PERIOD',
    text: 'Período anterior',
    get: (periodCurrent) => {
      switch (periodCurrent) {
        case 'TODAY':
          return findPeriod('YESTERDAY').get();

        case 'YESTERDAY':
          return [
            moment()
              .subtract(2, 'days')
              .format(),
            moment()
              .subtract(2, 'days')
              .format(),
          ];

        case 'THIS_WEEK':
          return findPeriod('LAST_WEEK').get();

        case 'LAST_WEEK':
          return [
            moment()
              .subtract(2, 'weeks')
              .startOf('week')
              .format(),
            moment()
              .subtract(2, 'weeks')
              .endOf('week')
              .format(),
          ];

        case 'THIS_MONTH':
          return findPeriod('LAST_MONTH').get();

        case 'LAST_MONTH':
          return [
            moment()
              .subtract(2, 'months')
              .startOf('month')
              .format(),
            moment()
              .subtract(2, 'months')
              .endOf('month')
              .format(),
          ];

        case 'THIS_QUARTER':
          return findPeriod('LAST_QUARTER').get();

        case 'LAST_QUARTER': {
          const start = moment()
            .subtract(2, 'quarters')
            .startOf('quarter')
            .format();

          const end = moment()
            .subtract(2, 'quarters')
            .endOf('quarter')
            .format();

          return [start, end];
        }

        case 'THIS_YEAR':
          return findPeriod('LAST_YEAR').get();

        case 'LAST_YEAR':
          return [
            moment()
              .subtract(1, 'years')
              .startOf('year')
              .format(),
            moment()
              .subtract(1, 'years')
              .endOf('year')
              .format(),
          ];

        default:
          return '';
      }
    },
  },
  {
    id: 'PREVIOUS_YEAR',
    text: 'Año anterior',
    get: (periodCurrent) => {
      switch (periodCurrent) {
        case 'TODAY':
          return [
            moment()
              .subtract(1, 'years')
              .format(),
            moment()
              .subtract(1, 'years')
              .format(),
          ];

        case 'YESTERDAY':
          return [
            moment()
              .subtract(1, 'days')
              .subtract(1, 'years')
              .format(),
            moment()
              .subtract(1, 'days')
              .subtract(1, 'years')
              .format(),
          ];

        case 'THIS_WEEK':
          return [
            moment()
              .subtract(1, 'years')
              .startOf('week')
              .format(),
            moment()
              .subtract(1, 'years')
              .endOf('week')
              .format(),
          ];

        case 'LAST_WEEK':
          return [
            moment()
              .subtract(1, 'weeks')
              .subtract(1, 'years')
              .startOf('week')
              .format(),
            moment()
              .subtract(1, 'weeks')
              .subtract(1, 'years')
              .endOf('week')
              .format(),
          ];

        case 'THIS_MONTH':
          return [
            moment()
              .subtract(1, 'years')
              .startOf('month')
              .format(),
            moment()
              .subtract(1, 'months')
              .endOf('month')
              .format(),
          ];

        case 'LAST_MONTH':
          return [
            moment()
              .subtract(1, 'months')
              .subtract(1, 'years')
              .startOf('month')
              .format(),
            moment()
              .subtract(1, 'months')
              .subtract(1, 'years')
              .endOf('month')
              .format(),
          ];

        case 'THIS_QUARTER': {
          const start = moment()
            .subtract(1, 'years')
            .startOf('quarter')
            .format();

          const end = moment()
            .subtract(1, 'years')
            .endOf('quarter')
            .format();

          return [start, end];
        }
        case 'LAST_QUARTER': {
          const start = moment()
            .subtract(1, 'quarters')
            .subtract(1, 'years')
            .startOf('quarter')
            .format();

          const end = moment()
            .subtract(1, 'quarters')
            .subtract(1, 'years')
            .endOf('quarter')
            .format();

          return [start, end];
        }

        case 'THIS_YEAR':
          return [
            moment()
              .subtract(1, 'years')
              .startOf('year')
              .format(),
            moment()
              .subtract(1, 'years')
              .endOf('year')
              .format(),
          ];

        case 'LAST_YEAR':
          return [
            moment()
              .subtract(2, 'years')
              .startOf('year')
              .format(),
            moment()
              .subtract(2, 'years')
              .endOf('year')
              .format(),
          ];

        default:
          return '';
      }
    },
  },
  {
    id: 'CUSTOM',
    text: 'Personalizado',
  },
];

export { periods, periodsToCompare };
