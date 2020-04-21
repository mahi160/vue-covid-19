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

Vue.use(Autocomplete);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
