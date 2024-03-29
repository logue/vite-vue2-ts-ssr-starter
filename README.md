# Vite + Vue 2 + TypeScript, SSR Vesion

<p align="center">
<img src="https://user-images.githubusercontent.com/480173/157433672-3d896453-9689-45e2-bbef-d91b29d72c4b.png" alt="logo" width="300" height="300" />
</p>

for Experimental.

## Description

This template is for using Vue2 with TypeScript in Vite for SSR (Server side Rendering). Includes [vue-router](https://router.vuejs.org/) and [Vuex](https://vuex.vuejs.org/), [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator).

In addition, [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/), and [Prettier](https://prettier.io/) are also included and are set to be executed automatically at runtime and commit. (Since these settings are set strictly, please relax yourself.)

Also, when the development server is executed, it is checked in real time by [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker).

### Composition API

The installed VueRouter and Vuex are for Vue2, but you can use the functions (such as `useRouter()`, `useRoute()` and `useStore()`) for the composition API for Vue3.

It is possible to mix code written in composition-api and code written in vue-property-decolator, but it is not recommended to use them together in the same component. [^1]

As a limitation, Vue2's composition api cannot monitor the router with the watch function. In that case, monitor it by the following normal method:

```js
watch: {
  $route: {
    handler(to) {
      //
    },
    immediate: true,
  },
},
```

### Vue i18n

If you want to use [vue-i18n](https://kazupon.github.io/vue-i18n/), please install [vue-i18n-composable](https://github.com/intlify/vue-i18n-composable) and call the instance with `useI18n()`.

In addition, the conventional method using `$t()` written in non composition-api can be used as it is.

## Teleport

In this project, `teleport` cannot be used because SSR cannot access the `document` object.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=vue.volar) (and disable Vetur).

## Commands

| Command       | Description                                        |
| ------------- | -------------------------------------------------- |
| dev           | Start devserver.                                   |
| clean         | Clear devserver cache.                             |
| lint          | Run ESLint and prettier.                           |
| lint:style    | Run Stylelint.                                     |
| lint:markup   | Check vue markup.                                  |
| build         | Build for production.                              |
| build:client  | Build client side                                  |
| build:server  | Build server side                                  |
| build:analyze | Execute Bundle Analyzer                            |
| build:clean   | Clear production build files.                      |
| preview       | Run the program generated by the production build. |

## Migrate from VueCli

It also works when migrating from VueCLI.

However, when importing a stylesheet with `@import`, it cannot be specified from the library directory. Must be specified from `~node_modules/`.

Also, if you used the .env file in the previous environment, you need to change the calling part from `process.env` to `import.meta.env` after installing [vite-plugin-env-compatible](https://github.com/IndexXuan/vite-plugin-env-compatible) separately.

## Troubleshooting

When adding or deleting files, an error may occur and even if the error is corrected, it may not be reflected in devserver. In that case, stop devserver and delete all the files in the `node_modules/.vite` directory. You can also run it with the `clean` command.

Due to [yarn issues](https://github.com/yarnpkg/berry/issues/4448), it may not work properly if the path contains non-ASCII characters (such as 日本語 or 한국어, 中文 etc.).

[^1]: <https://github.com/vuejs/composition-api/issues/136>

## See also

- [vite-vue2-ts-starter](https://github.com/logue/vite-vue2-ts-starter)
- [vite-vue2-vuetify-ts-starter](https://github.com/logue/vite-vue2-vuetify-ts-starter) - Vuetify version.
- [laravel9-vite-vue2-starter](https://github.com/logue/laravel9-vite-vue2-starter) - For Laravel + Breeze.
- [@logue/vue2-helpers](https://github.com/logue/vue2-helpers) - Composition API Wrapper library for Vue2.7.0 or later.
