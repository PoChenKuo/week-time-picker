<template>
  <div id="app">
    <div class="title">
      <span>{{$t("demo.welcome") }}</span>
      <LangSwitch />
    </div>

    <WeekTimePicker :class="['demo-app-entry']" :demo-input="demoData"></WeekTimePicker>
    <div class="editor">
      <el-form
        :model="demoString"
        ref="demo-string-form"
        :rules="rules"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="Available" prop="available">
          <el-input
            type="textarea"
            :rows="8"
            :placeholder="getSampleObjectForDemoData().available"
            resize="none"
            v-model="demoString.available"
          ></el-input>
        </el-form-item>
        <el-form-item label="Booked" prop="booked">
          <el-input
            type="textarea"
            :rows="8"
            :placeholder="getSampleObjectForDemoData().booked"
            resize="none"
            v-model="demoString.booked"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import WeekTimePicker from "./components/weekTimePicker";
import LangSwitch from "./components/langSwitch";
import {
  Form as ElForm,
  Input as ElInput,
  FormItem as ElFormItem
} from "element-ui";

export default {
  name: "Demo",
  components: { WeekTimePicker, LangSwitch, ElForm, ElInput, ElFormItem },
  computed: {},
  data() {
    // eslint-disable-next-line no-unused-vars
    const dateInputTypeCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Textare couldn't be empty"));
      } else {
        // let errorCheck = false;
        const jsonObject = JSON.parse(value);
        for (let ind = 0; ind < jsonObject.length; ind++) {
          const currentEntry = jsonObject[ind];
          const formatRegexString = /^20[2-9][0-9]-((0[1-9])|(1[0-2]))-(([0-2][0-9])|(3[0-1]))T(([0-1][0-9])|(2[0-3])):(0|3)0:00Z/;
          if (!currentEntry["start"] || !currentEntry["end"]) {
            callback(
              new Error(
                "Must contains 'start' and 'end' as attributes in each entry"
              )
            );
          } else if (
            !currentEntry.start.match(formatRegexString) ||
            !currentEntry.end.match(formatRegexString)
          ) {
            const errorMsg =
              "Please check the date format. (example:2020-08-17T15:30:00Z)\n" +
              "The min should '00' or '30' and the sec should always be '00'";
            callback(new Error(errorMsg));
          } else {
            callback();
          }
        }
      }
    };
    return {
      rules: {
        available: [{ validator: dateInputTypeCheck, trigger: "blur" }],
        booked: [{ validator: dateInputTypeCheck, trigger: "blur" }]
      },
      demoString: {
        available: "",
        booked: ""
      },
      demoData: null,
      sampleString: ""
    };
  },
  created() {},
  mounted() {
    this.initDemoDate();
  },
  methods: {
    submitForm() {
      this.$refs["demo-string-form"].validate(valid => {
        if (valid) {
          this.applyNewDataforDemoSetting();
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    applyNewDataforDemoSetting() {
      this.demoData = {
        available: JSON.parse(this.demoString.available),
        booked: JSON.parse(this.demoString.booked)
      };
    },
    initDemoDate() {
      const sample = this.getSampleObjectForDemoData();
      Object.assign(this.demoString, sample);
    },
    getSampleObjectForDemoData() {
      const dt = new Date().setMinutes(0, 0, 0) + 60 * 60 * 1000;
      return {
        available:
          `[\n\t{\n\t\t"start":"${this.getUTCString(
            this.UTCTimeWithOffsetForThirtyMin(dt, 1)
          )}",\n` +
          `\t\t"end":"${this.getUTCString(
            this.UTCTimeWithOffsetForThirtyMin(dt, 3)
          )}"\n\t},\n` +
          `\t{\n\t\t"start":"${this.getUTCString(
            this.UTCTimeWithOffsetForThirtyMin(dt, 5)
          )}",\n` +
          `\t\t"end":"${this.getUTCString(
            this.UTCTimeWithOffsetForThirtyMin(dt, 6)
          )}"\n\t}\n]`,
        booked:
          `[\n\t{\n\t\t"start":"${this.getUTCString(
            this.UTCTimeWithOffsetForThirtyMin(dt, 3)
          )}",\n` +
          `\t\t"end":"${this.getUTCString(
            this.UTCTimeWithOffsetForThirtyMin(dt, 5)
          )}"\n\t}\n]`
      };
    },
    UTCTimeWithOffsetForThirtyMin(ts, offset) {
      return ts + 1000 * 60 * offset * 30;
    },
    getUTCString(ts) {
      let dt = new Date(ts);
      const padStartForDateTime = intValue => String(intValue).padStart(2, "0");
      dt = {
        year: dt.getUTCFullYear(),
        month: padStartForDateTime(dt.getUTCMonth() + 1),
        date: padStartForDateTime(dt.getUTCDate()),
        hour: padStartForDateTime(dt.getUTCHours()),
        min: padStartForDateTime(dt.getUTCMinutes()),
        sec: padStartForDateTime(dt.getUTCSeconds())
      };
      return `${dt.year}-${dt.month}-${dt.date}T${dt.hour}:${dt.min}:${dt.sec}Z`;
    }
  }
};
</script>

<style lang="scss">
html {
  font-size: 16px;
}
body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #484848;
}
#app {
  padding: 80px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .demo-app-entry {
    margin-top: 40px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;

    span {
    }

    .lang-switch {
      min-width: 150px;
    }
  }
}

.editor,
.editor > .el-form {
  width: 100%;
}

@media screen and (min-width: 1024px) {
  #app {
    max-width: 620px;
    margin: 0 auto;
    font-family: Helvetica Neue, Helvetica, Arial, PingFang HK,
      \.PingFang-SC-Regular, PingFang, Hiragino Sans GB, STHeiti,
      Microsoft JhengHei, sans-serif;
  }
}
</style>
 