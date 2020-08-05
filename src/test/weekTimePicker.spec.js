/* eslint-disable no-undef */
import { shallowMount } from "@vue/test-utils";
import weekTimePicker from "../components/weekTimePicker";

describe("weekTimePicker", () => {
  const wrapper = shallowMount(weekTimePicker);
  it('weekTimePicker class default as "week-time-picker"', () => {
    expect(wrapper.classes()).toContain("week-time-picker");
  });

  it("initialLocalTimeValue => localWeekStartTimeStamp be timestamp of week-start-day in local timezone", () => {
    wrapper.vm.initialLocalTimeValue();
    expect(wrapper.vm.localWeekStartTimeStamp).toBe(
      new Date().setHours(0, 0, 0, 0) -
        new Date().getDay() * 24 * 60 * 60 * 1000
    );
  });

  it("convertParsedDataIntoLocal => vm available and booked should be contains start and end as timestamp", () => {
    const mock = {
      available: [
        {
          start: "2020-08-07T08:30:00Z",
          end: "2020-08-07T09:30:00Z",
        },
      ],
      booked: [
        {
          start: "2020-07-17T11:00:00Z",
          end: "2020-07-17T13:00:00Z",
        },
      ],
    };
    wrapper.vm.convertParsedDataIntoLocal(mock);
    expect(wrapper.vm.available[0].start).toBe(Date.UTC(2020, 7, 7, 8, 30, 0));
    expect(wrapper.vm.available[0].end).toBe(Date.UTC(2020, 7, 7, 9, 30, 0));
    expect(wrapper.vm.booked[0].start).toBe(Date.UTC(2020, 6, 17, 11, 0, 0));
    expect(wrapper.vm.booked[0].end).toBe(Date.UTC(2020, 6, 17, 13, 0, 0));
  });

  it("parseBookingData => generate object contains {available, booked} with inherite", () => {
    expect(wrapper.vm.parseBookingData({ page: 0 })).toEqual({
      page: 0,
      available: {},
      booked: {},
    });
    expect(wrapper.vm.parseBookingData({ booked: 1 })).toEqual({
      available: {},
      booked: 1,
    });
  });

  it("changeDisplayWeek => add/sub localWeekStartTimeStamp by mutiply value with 24*60*60*1000*7", () => {
    wrapper.setData({ localWeekStartTimeStamp: 0 });
    wrapper.vm.changeDisplayWeek(2);
    expect(wrapper.vm.localWeekStartTimeStamp).toBe(
      24 * 60 * 60 * 1000 * 2 * 7
    );
    wrapper.vm.changeDisplayWeek(-1);
    expect(wrapper.vm.localWeekStartTimeStamp).toBe(
      24 * 60 * 60 * 1000 * 1 * 7
    );
  });

  it("convertUTCStringToValue => Convert UTC String format into timestamp", () => {
    expect(wrapper.vm.convertUTCStringToValue("2020-08-07T08:30:00Z")).toBe(
      1596789000000
    );
    expect(wrapper.vm.convertUTCStringToValue("2020-08-07T08:20:00Z")).toBe(
      1596788400000
    );
  });
});
