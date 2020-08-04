<template>
  <div class="schedule-week-table">
    <!-- v-for -->
    <div class="week-day-column" v-for="(dayItem, ind) in dayLable" :key="ind">
      <div class="column-container">
        <div class="label-box">
          <span class="day-label">{{$t(`calendar.${dayItem}`)}}</span>
          <br />
          <span class="date-label"></span>
        </div>

        <!-- v-for -->
        <div class="time-slot-list">
          <div class="time-entry"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleWeekTable",
  data() {
    return {
      dayLable: [
        "WEEK_SUN",
        "WEEK_MON",
        "WEEK_TUE",
        "WEEK_WED",
        "WEEK_THU",
        "WEEK_FRI",
        "WEEK_SAT"
      ]
    };
  }
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
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #484848;
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