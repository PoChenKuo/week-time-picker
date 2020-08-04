<template>
  <div class="control-box">
    <div class="week-selector">
      <el-button-group>
        <el-button
          icon="el-icon-arrow-left"
          @click="changeDisplayWeek(-1)"
          :disabled="weekTimeStamp<Date.now()"
          plain
          size="mini"
        ></el-button>
        <el-button icon="el-icon-arrow-right" @click="changeDisplayWeek(1)" plain size="mini"></el-button>
      </el-button-group>
    </div>
    <div
      class="week-range-display"
    >{{weekTimeStamp|moment('YYYY/MM/DD')}} - {{weekTimeStamp| moment("add", "7 days",'DD')}}</div>
    <div
      class="timezone-display"
    >{{$t('calendar.TZ_HINT',{timezone:timezoneLabel, city:$t(`city.${cityName}`)})}}</div>
  </div>
</template>
<script>
export default {
  name: "WeekTimePickerControl",
  props: {
    weekTimeStamp: {
      require: true,
      type: Number,
      default: () => Date.now()
    }
  },
  data() {
    return {
      cityName: Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.replace(/^.*\//, "")
        .toLowerCase()
    };
  },
  computed: {
    timezoneLabel() {
      const dt = new Date().toString().substring(25, 33);
      return `${dt.slice(0, 6)}:${dt.slice(6, 8)}`;
    }
  },
  methods: {
    changeDisplayWeek(multiplyOffset) {
      this.$emit("callChangeWeek", multiplyOffset);
    }
  }
};
</script>
<style lang="scss" scoped>
.week-selector {
  width: 90px;
  display: inline-block;

  .el-button.is-plain:not(.is-disabled):hover {
    color: #02cab9;
    border-color: rgba(2, 202, 185, 0.95);
  }

  .el-button.is-plain:focus {
    color: #5a5e66;
    border-color: #d8dce5;
  }
}
.week-range-display {
  padding-left: 15px;
  display: inline-block;
  width: 150px;
}
.timezone-display {
  display: block;
  text-align: right;
  font-size: 12px;
  line-height: 25px;
  float: right;
}
</style>