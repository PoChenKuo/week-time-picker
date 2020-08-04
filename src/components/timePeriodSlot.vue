<template>
  <div class="time-period-slot">
    <div
      class="time-slot"
      v-for="(slot, ind) in timeSlots"
      :key="ind"
      :class="{available:slot.available}"
    >{{slot.timeValue|moment('HH:mm') }}</div>
  </div>
</template>

<script>
import {
  INTEGER_UNIT_PER_30_MIN
  // INTEGER_UNIT_PER_DATE
} from "../TimeConstant";
export default {
  name: "TimePeriodSlot",
  props: {
    beginTime: {
      require: true,
      default: () => Date.now().setHours(0, 0, 0, 0)
    },
    slotRange: {
      type: Object,
      required: true,
      default: () => {
        return { available: [], booked: [] };
      }
    }
  },
  computed: {
    timeSlots() {
      const slots = [...this.parseSlotRanges(this.slotRange)];
      return slots
        .sort((a, b) => a.timeValue - b.timeValue)
        .filter(slot => slot.timeValue > Date.now());
    }
  },
  data() {
    return {
      currentTime: Date.now()
    };
  },
  methods: {
    splitSlotRange(slotRanges) {
      const slots = [];
      for (let ind = 0; ind < slotRanges.length; ind++) {
        const slotEntry = slotRanges[ind];
        for (
          let timeStamp = slotEntry.start;
          timeStamp < slotEntry.end;
          timeStamp += INTEGER_UNIT_PER_30_MIN
        ) {
          slots.push({
            timeValue: timeStamp
          });
        }
      }

      return slots;
    },
    parseSlotRanges({ available, booked }) {
      if (!(available.length || booked.length)) return [];
      const slotAvailbleSet = (slot, isAvailable) => {
        return {
          timeValue: slot.timeValue,
          available: isAvailable
        };
      };
      const parsedAvailable = this.splitSlotRange(available).map(slot =>
        slotAvailbleSet(slot, true)
      );
      const parsedBooked = this.splitSlotRange(booked).map(slot =>
        slotAvailbleSet(slot, false)
      );
      const slots = [...parsedAvailable, ...parsedBooked].sort(
        (a, b) => a.start - b.start
      );
      return slots;
    }
  }
};
</script>

<style lang="scss" scoped>
.time-period-slot {
  .time-slot {
    display: block;
    text-align: center;
    padding: 3px 0;
    border: 1px solid transparent;
    color: #b6b6b6;
    font-size: 0.75rem;

    &.available {
      color: #02cab9;
      font-weight: 700;
    }
  }
}
</style>