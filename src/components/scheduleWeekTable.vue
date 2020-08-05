<template>
  <div class="schedule-week-table">
    <div
      class="week-day-column"
      v-for="(dayItem, ind) in weekDayEntries"
      :key="ind"
      :class="{disabled:dayItem.disabled}"
    >
      <div class="column-container">
        <div class="label-box">
          <span class="day-label">{{$t(`calendar.${dayItem.dayLabel}`)}}</span>
          <br />
          <span class="date-label">{{dayItem.dateInMonth}}</span>
        </div>

        <TimePeriodSlot :begin-time="dayItem.timeValue" :slot-range="dayItem.relatedSlots" />
      </div>
    </div>
  </div>
</template>

<script>
import { INTEGER_UNIT_PER_DATE } from "../TimeConstant";
import TimePeriodSlot from "./timePeriodSlot";
export default {
  name: "ScheduleWeekTable",
  props: {
    startTimeOfWeek: { type: Number, required: true, default: () => 0 },
    bookingSlot: {
      type: Object,
      required: true,
      default: () => {
        return { available: [], booked: [] };
      }
    }
  },
  components: { TimePeriodSlot },
  computed: {
    dayRangeInWeek() {
      let days = [];
      for (let offset = 0; offset < 7; offset++) {
        days.push(this.startTimeOfWeek + offset * INTEGER_UNIT_PER_DATE);
      }

      return days.map(day => {
        return new Date(day)
          .getDate()
          .toString()
          .padStart(2, "0");
      });
    },
    weekDayEntries() {
      const _this = this;
      const dayEntries = new Array(7).fill(null).map((item, ind) => {
        const startTimeOfDayInWeek =
          _this.startTimeOfWeek + ind * INTEGER_UNIT_PER_DATE;
        const lastTimeBeforeNextDate =
          startTimeOfDayInWeek + INTEGER_UNIT_PER_DATE;

        const relatedFilter = slot => {
          return (
            (slot.start >= startTimeOfDayInWeek &&
              slot.start < lastTimeBeforeNextDate) ||
            (slot.end >= startTimeOfDayInWeek &&
              slot.start <= startTimeOfDayInWeek)
          );
        };

        const relatedSlots = {
          available: _this.bookingSlot.available.filter(slot =>
            relatedFilter(slot)
          ),
          booked: _this.bookingSlot.booked.filter(slot => relatedFilter(slot))
        };

        return {
          dayLabel: _this.dayLabel[ind],
          dateInMonth: _this.dayRangeInWeek[ind],
          timeValue: startTimeOfDayInWeek,
          disabled: _this.currentTime >= lastTimeBeforeNextDate,
          relatedSlots
        };
      });
      return dayEntries;
    }
  },
  data() {
    return {
      currentTime: Date.now(),
      dayLabel: [
        "WEEK_SUN",
        "WEEK_MON",
        "WEEK_TUE",
        "WEEK_WED",
        "WEEK_THU",
        "WEEK_FRI",
        "WEEK_SAT"
      ]
    };
  },

  mounted() {}
};
</script>

<style lang="scss" scoped>
.schedule-week-table {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: row;

  .week-day-column {
    flex: 1;
    padding: 0 5px;
    box-sizing: border-box;

    & .column-container {
      border-top: 4px solid #02cab9;
      .label-box {
        padding: 10px 0;
        text-align: center;
      }
    }
    &.disabled > .column-container {
      border-top: 4px solid #d2d2d2;
      .label-box {
        color: #d2d2d2;
      }
    }
  }
}
</style>