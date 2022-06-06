import { app, router, store } from './main';

// @ts-ignore
if (window.__INITIAL_STATE__) {
  // @ts-ignore
  store.replaceState(window.__INITIAL_STATE__);
}
// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // actually mount to DOM
  app.$mount('#app');
});
