<template>
  <div class="week-time-picker">
    <div class="schedule-title"></div>
    <div class="schedule-body">
      <div class="control-box"></div>
      <ScheduleWeekTable 
      :begin-time="currentUTC" 
      :week-start-time="localWeekStartValue"
      ></ScheduleWeekTable>
    </div>
  </div>
</template>
<script>
import mockData from "../mockData";
import { API_BookingUrl } from "../API_config";
import ScheduleWeekTable from "./scheduleWeekTable";
export default {
  name: "WeekTimePicker",
  components: { ScheduleWeekTable },
  data() {
    return {
      available: [],
      booked: [],
      localWeekStartValue: 0,
      currentUTC: 0
    };
  },
  async created() {
    this.setupBookingData();
  },
  mounted() {
    this.initialLocalTimeValue();
  },
  computed: {},
  methods: {
    initialLocalTimeValue() {
      const dt = new Date();
      dt.setHours(0, 0, 0, 0);

      this.currentUTC = Date.now();
      this.localWeekStartValue =
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
        _this.convertFetchedBookingDataIntoLocal(bookingData);
      });
    },

    convertFetchedBookingDataIntoLocal(bookingData) {
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
}
</style>