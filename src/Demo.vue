<template>
  <div id="app">
    <div class="title">
      <span>{{$t("demo.welcome")}}</span>
      <LangSwitch />
    </div>

    <WeekTimePicker :class="['demo-app-entry']"></WeekTimePicker>
  </div>
</template>

<script>
import WeekTimePicker from "./components/weekTimePicker";
import LangSwitch from "./components/langSwitch";
export default {
  name: "Demo",
  components: { WeekTimePicker, LangSwitch },
  data() {
    return {};
  },
  async created() {},
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
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
 