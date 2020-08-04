import Vue from "vue";
import Demo from "./Demo.vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import storeModule from "./store";
import i18nModule from "./i18n";
import { Switch } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Switch);
Vue.use(VueI18n);
Vue.use(Vuex);

const i18n = new VueI18n({
  locale: "us-en", // set locale
  messages: i18nModule, // set locale messages
});

const store = new Vuex.Store(storeModule);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Demo),
  store: store,
  i18n,
}).$mount("#app");
