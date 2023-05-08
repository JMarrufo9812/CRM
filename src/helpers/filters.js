import Vue from 'vue';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

Vue.filter('formatPrice', (price) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(price);
});

Vue.filter('formatDate', (date) => {
  if (date) {
    const newDate = moment(new Date(date));
    return newDate.format('DD/MM/YYYY hh:mma');
  }
  return '';
});

Vue.filter('dateNow', (date) => {
  const [dateCreated, timeCreated] = date.split(' ');
  const [year, month, day] = dateCreated.split('-');
  const [hour, minute, seconds] = timeCreated.split(':');
  const dateTransform = new Date(year, month - 1, day, hour, minute, seconds);

  return moment(dateTransform).fromNow();
});

Vue.filter('timeZone', (date, dateFormat) => {
  momentTimezone.tz.setDefault('America/Merida');
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const timeZoneConvert = momentTimezone(date)
    .tz(timeZone)
    .format(dateFormat);
  return timeZoneConvert;
});

Vue.filter('timeZoneFromNow', (date) => {
  momentTimezone.tz.setDefault('America/Merida');
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const timeZoneConvert = momentTimezone(date)
    .tz(timeZone)
    .calendar();
  return timeZoneConvert;
});
