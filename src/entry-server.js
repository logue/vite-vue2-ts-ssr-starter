import { createRenderer } from 'vue-server-renderer';
import { app, router, store } from './main';

/**
 * Render by Server
 *
 * @param {RawLocation} url - URL
 * @param {*} manifest -
 * @param {string} template - Template file.
 */
export function render(url, manifest, template) {
  return new Promise((resolve, reject) => {
    router.push(url).catch(err => reject(err));

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      const renderer = createRenderer({
        manifest,
        template,
      });
      const context = {
        title: 'Test',
        meta: `<meta name="description" content="TEST"/>`,
      };
      const state = JSON.stringify(store.state);

      return renderer
        .renderToString(app, context)
        .then(vueHtml => {
          const html = vueHtml.replace(`<!--vuex-state-->`, state);
          return resolve(html);
        })
        .catch(err => {
          console.error(err);
        });
    }, reject);
  });
}
