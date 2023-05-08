<template>
  <v-sheet class="box-calendar">
    <v-calendar
      ref="calendar"
      v-model="dateSelected"
      type="day"
      locale="mx"
      :events="listEvents"
      interval-height="44"
      :interval-minutes="60"
    >
      <template #day-label-header="{date}">
        <div>
          <strong>
            {{ date | dateHuman }}
          </strong>
        </div>
      </template>
      <template #day-body="{ date, week }">
        <div
          class="v-current-time"
          :class="{ first: date === week[0].date }"
          :style="{ top: nowY }"
        >
          <span v-if="cal">
            {{ cal.times.now.time }}
          </span>
        </div>
      </template>
      <template #event="{event, timeSummary}">
        <div class="pl-1">
          <strong class="d-block">
            {{ event.name }}
          </strong>
          {{ timeSummary() }}
        </div>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script>
import moment from 'moment';
import { GET_ACTIVITIES } from '@/graphql/querys/activitiesQuery';

export default {
  name: 'CalendarDayRight',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    eventEditId: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activities: [],
      dateSelected: '',
      ready: false,
      events: [],
    };
  },
  mounted() {
    this.ready = true;
    if (this.eventEditId.length > 0 && this.event && this.event.start) {
      this.setScrollToTime(this.event.start);
    } else {
      this.scrollToTime();
    }
    this.updateTime();
  },
  watch: {
    date: {
      handler(newValue) {
        this.dateSelected = newValue;
      },
      immediate: true,
    },
    isShow: {
      handler(newValue) {
        if (newValue) {
          this.$apollo.queries.activities.refetch();
          this.$nextTick(() => {
            if (this.eventEditId.length > 0 && this.event && this.event.start) {
              this.setScrollToTime(this.event.start);
            } else {
              this.scrollToTime();
            }
          });
        }
      },
    },
    cal: {
      handler(newValue) {
        if (newValue !== null) {
          this.$nextTick(() => {
            if (this.eventEditId.length > 0 && this.event && this.event.start) {
              this.setScrollToTime(this.event.start);
            } else {
              this.scrollToTime();
            }
          });
        }
      },
      immediate: true,
    },
    event: {
      handler({ start }) {
        this.setScrollToTime(start);
      },
    },
  },
  computed: {
    activitiesToday() {
      if (this.activities.list && this.activities.list.length > 0) {
        return this.activities.list
          .filter((activity) => {
            if (!this.isEdit) {
              return (
                activity.start.split(' ')[0] === this.dateSelected &&
                activity.end.split(' ')[0] === this.dateSelected
              );
            }
            return (
              activity.start.split(' ')[0] === this.dateSelected &&
              activity.end.split(' ')[0] === this.dateSelected &&
              activity.id !== this.eventEditId
            );
          })
          .map(({ id, title, start, end }) => {
            return { id, name: title, start, end };
          });
      }
      return [];
    },
    listEvents() {
      if (this.event) {
        if (this.isEdit && this.isShow) {
          const list = [
            ...this.events,
            ...this.activitiesToday,
            { id: this.eventEditId, ...this.event },
          ];

          return list.reduce(
            (newTemp, el) =>
              newTemp.some((item) => item.id === el.id)
                ? newTemp
                : [...newTemp, el],
            [],
          );
        }
        if (this.isShow) {
          return [
            ...this.activitiesToday,
            { id: this.eventEditId, ...this.event },
          ];
        }
        return this.activitiesToday;
      }

      return this.events;
    },
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      // eslint-disable-next-line
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px';
    },
  },
  filters: {
    dateHuman: (value) => {
      if (!value) return '';
      const newDate = moment(value);
      return newDate.format('ll');
    },
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    setScrollToTime(timer) {
      const hour = moment(timer).format('HH:MM');
      const time = moment.duration(hour).asMinutes();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
  },
  apollo: {
    activities: {
      query: GET_ACTIVITIES,
      fetchPolicy: 'no-cache',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '{ .box-calendar .v-current-time .v-calendar-daily_head-weekday .v-calendar-daily__scroll-area  } from ../../scss/components/calendar.day.right';
</style>
