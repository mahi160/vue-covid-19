import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "./assets/css/autocomplete.css";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VuePageTransition from "vue-page-transition";

Vue.use(VuePageTransition);
Vue.use(Autocomplete);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

Vue.filter("timeAgo", function(time) {
  var date = new Date(Date.parse(time));
  var a = new Date().getTime();
  var b = date.getTime();
  var diff_min = Math.floor((a - b) / 60000);
  var diff_hr = Math.floor(diff_min / 60);
  var diff_day = Math.floor(diff_hr / 24);
  var diff_month = Math.floor(diff_day / 30);
  var diff_year = Math.floor(diff_month / 12);
  return (
    (diff_min < 0 && "In the future!") ||
    (diff_min < 1 && "just now") ||
    (diff_min < 60 && `${diff_min} min ago`) ||
    (diff_hr < 24 && `${diff_hr} hr ${diff_min - diff_hr * 60} min ago`) ||
    (diff_day < 31 && `${diff_day} days ${diff_hr - diff_day * 24} hr ago`) ||
    (diff_month < 12 &&
      `${diff_month} months ${diff_day - diff_month * 30} days ago`) ||
    (diff_year < 10 &&
      `${diff_year} years ${diff_month - diff_year * 12} months ago`) ||
    (diff_year >= 10 && "A Long Time Ago!")
  );
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
