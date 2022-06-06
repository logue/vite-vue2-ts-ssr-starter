/** Vue main script */
import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

import App from './App.vue';
import router from './router';
import store from './store';

const app = new Vue({
  router,
  store,
  render: h => h(App),
});

export { app, router, store };
