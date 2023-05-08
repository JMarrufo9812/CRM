import moment from 'moment';

export const dateMixin = {
  data() {
    return {
      maxDate: moment()
        .add(5, 'years')
        .format('YYYY-MM-DD'),
      minDate: moment()
        .add(-5, 'years')
        .format('YYYY-MM-DD'),
    };
  },
};
