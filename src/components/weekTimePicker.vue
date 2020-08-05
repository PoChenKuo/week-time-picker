<template>
  <div class="week-time-picker">
    <div class="schedule-title"></div>
    <div class="schedule-body">
      <WeekTimePickerControl
        :week-time-stamp="localWeekStartTimeStamp"
        @callChangeWeek="changeDisplayWeek"
      />

      <ScheduleWeekTable
        :booking-slot="{available,booked}"
        :class="['week-table-entry']"
        :start-time-of-week="localWeekStartTimeStamp"
      ></ScheduleWeekTable>
    </div>
  </div>
</template>
<script>
import mockData from "../mockData";
import ScheduleWeekTable from "./scheduleWeekTable";
import WeekTimePickerControl from "./weekTimePickerControl";
import { API_BookingUrl } from "../API_config";
import { INTEGER_UNIT_PER_WEEK } from "../TimeConstant";

export default {
  name: "WeekTimePicker",
  components: { ScheduleWeekTable, WeekTimePickerControl },
  data() {
    return {
      available: [],
      booked: [],
      localWeekStartTimeStamp: 0,
      cityName: Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.replace(/^.*\//, "")
        .toLowerCase()
    };
  },

  mounted() {
    this.initialLocalTimeValue();
    this.setupBookingData();
  },
  computed: {
    timezoneLabel() {
      const dt = new Date().toString().substring(25, 33);
      return `${dt.slice(0, 6)}:${dt.slice(6, 8)}`;
    }
  },
  methods: {
    initialLocalTimeValue() {
      const dt = new Date();
      dt.setHours(0, 0, 0, 0);

      this.localWeekStartTimeStamp =
        dt.getTime() - dt.getDay() * 24 * 60 * 60 * 1000;
    },
    setupBookingData() {
      const _this = this;
      new Promise(resolve => {
        if (API_BookingUrl.length > 0 && API_BookingUrl) {
          _this.fetchBookingData().then(bookingData => {
            resolve(bookingData);
          });
        } else {
          resolve(mockData);
        }
      }).then(bookingData => {
        _this.convertParsedDataIntoLocal(bookingData);
      });
    },

    convertParsedDataIntoLocal(bookingData) {
      const _this = this;
      const convertFunc = item => {
        return {
          start: _this.convertUTCStringToValue(item.start),
          end: _this.convertUTCStringToValue(item.end)
        };
      };
      _this.available = bookingData.available.map(item => convertFunc(item));
      _this.booked = bookingData.booked.map(item => convertFunc(item));
    },

    fetchBookingData() {
      return new Promise(resolve => {
        fetch(API_BookingUrl)
          .then(bookingData => {
            resolve(this.parseBookingData(bookingData));
          })
          .catch(() => {
            resolve(mockData);
          });
      });
    },

    parseBookingData(bookingData) {
      return Object.assign(
        {
          available: {},
          booked: {}
        },
        bookingData
      );
    },
    changeDisplayWeek(multiplyOffset) {
      this.localWeekStartTimeStamp += multiplyOffset * INTEGER_UNIT_PER_WEEK;
    },
    convertUTCStringToValue(UTCDate) {
      const itemSplitArray = UTCDate.split(/-|:|T|Z/)
        .filter(str => str.length > 0)
        .map(val => parseInt(val));
      const UTC_value = Date.UTC(
        itemSplitArray[0],
        itemSplitArray[1] - 1,
        itemSplitArray[2],
        itemSplitArray[3],
        itemSplitArray[4],
        itemSplitArray[5]
      );
      return UTC_value;
    }
  }
};
</script>

<style lang="scss" scoped>
.week-time-picker {
  width: 100%;
  .schedule-body {
    width: 100%;
  }

  .week-table-entry {
    padding: 15px 0;
  }
}
</style>