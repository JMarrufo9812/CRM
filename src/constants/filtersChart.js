const FILTER_TYPE_PERIOD = [
  {
    id: 'DAYS',
    text: 'Días',
  },
  {
    id: 'WEEKS',
    text: 'Semanas',
  },
  {
    id: 'MONTHS',
    text: 'Meses',
  },
  {
    id: 'QUARTERS',
    text: 'Trimestres',
  },
];
const FILTER_TYPE_VALUE = [
  { id: 'count', text: 'Cantidad' },
  { id: 'sum', text: 'Valor' },
];

const FILTER_STATUS_ACTIVITY = [
  { id: 'ALL', text: 'Todos' },
  { id: 'COMPLETED', text: 'Completados' },
  { id: 'EFFECTIVE', text: 'Efectivos' },
  { id: 'INEFFECTIVE', text: 'Inefectivos' },
];

const FILTER_STATUS_DEAL = [
  { id: 'ALL', text: 'Todos' },
  { id: 'WON', text: 'Ganados' },
  { id: 'LOST', text: 'Perdidos' },
  { id: 'OPEN', text: 'Abiertos' },
  { id: 'DELETED', text: 'Eliminados' },
];

const FILTERS = [
  {
    id: 'filterBy',
    name: 'Mostrar por',
    optionSelected: '',
  },
  {
    id: 'TIME',
    name: 'Filtrar por',
    optionSelected: '',
  },
  {
    id: 'users',
    name: 'Usuarios',
    optionSelected: [],
  },
  {
    id: 'user',
    name: 'Usuario',
    optionSelected: '',
  },
  {
    id: 'pipelines',
    name: 'Embudos',
    optionSelected: [],
  },
  {
    id: 'pipeline',
    name: 'Embudo',
    optionSelected: '',
    stages: [],
  },
  {
    id: 'period',
    name: 'Período',
    optionSelected: {},
  },
  {
    id: 'periodCompare',
    name: 'Comparar',
    optionSelected: {},
  },
  {
    id: 'periodRange',
    name: 'Rango',
    optionSelected: {},
  },
  {
    id: 'STATUS_DEAL',
    name: 'Estado del trato',
    optionSelected: '',
  },
  {
    id: 'STATUS_ACTIVITY',
    name: 'Estado de la actividad',
    optionSelected: '',
  },
  {
    id: 'ACTIVITIES',
    name: 'Actividades',
    optionSelected: [],
  },
];

export {
  FILTER_TYPE_PERIOD,
  FILTER_TYPE_VALUE,
  FILTER_STATUS_ACTIVITY,
  FILTER_STATUS_DEAL,
  FILTERS,
};
