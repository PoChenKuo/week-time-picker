/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import timePeriodSlot from "../components/timePeriodSlot";

describe("timePeriodSlot", () => {
  const wrapper = shallowMount(timePeriodSlot);

  it('timePeriodSlot class default as "time-period-slot"', () => {
    expect(wrapper.classes()).toContain("time-period-slot");
  });

  it("convertSlotRangesIntoDayPeriod => let start/end attr of each range in dayPeriod", () => {
    wrapper.setProps({ beginTime: 1596778200001 });
    const slotRange = {
      available: [{ start: 1596778200000, end: 1596783600000 }],
      booked: [{ start: 1596785400000, end: 1596787200000 }],
    };
    const result = wrapper.vm.convertSlotRangesIntoDayPeriod(slotRange);
    expect(wrapper.vm.beginTime).toBe(1596778200001);
    expect(result.available[0].start).toBe(1596778200001);
  });
});
