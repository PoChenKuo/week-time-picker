<template>
  <el-switch
    v-model="langSwitch"
    v-if="switchEnabled"
    class="lang-switch"
    active-text="EN"
    inactive-text="中"
    active-color="#8ca5d2"
    inactive-color="#6de4a8"
  ></el-switch>
</template>

<script>
export default {
  name: "LangSwitch",
  data() {
    return {
      langSwitch: null
    };
  },
  computed: {
    switchEnabled() {
      return this.langSwitch !== null;
    }
  },
  watch: {
    langSwitch(nv, ov) {
      if (ov !== null) {
        this.$i18n.locale = nv ? "us-en" : "zh-tw";
      }
    }
  },
  mounted() {
    this.initLang();
  },
  methods: {
    initLang() {
      this.langSwitch = this.$i18n.locale === "us-en";
    }
  }
};
</script>

<style lang="scss" scoped>
.lang-switch {
  justify-content: flex-end;
}
</style>