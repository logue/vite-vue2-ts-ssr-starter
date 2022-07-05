<template>
  <div class="home">
    <img
      alt="Vue logo"
      :src="require('@/assets/logo.svg')"
      height="200"
      width="200"
    />
    <hello-world msg="Vite SSR App with vue-server-renderer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type Ref, type SetupContext } from 'vue';
// import { useStore } from '@logue/vue2-helpers/dist/vuex';
import { useRoute } from '@logue/vue2-helpers/vue-router';

import HelloWorld from '@/components/HelloWorld.vue';

/** Home Component */
export default defineComponent({
  /** Components */
  components: {
    HelloWorld,
  },
  /** Props */
  props: {
    prop: { type: String, default: 'prop' },
  },
  /**
   * Setup
   *
   * @param _props - Props
   * @param _context - Context
   */
  setup(_props, _context: SetupContext) {
    /** Route */
    const route = useRoute();
    /** Vuex */
    // const store = useStore();

    const data: Ref<string | undefined> = ref();

    /* *
     * Computed
     * /
    const computedValue: Ref<string> = computed({
      get: () => store.getters.computedValue,
      set: v => store.dispatch('setComputedValue', v)
    }
     */

    // Watch
    watch(
      () => route?.name,
      name => console.log('route is changed:', name)
    );

    return {
      data,
    };
  },
});
</script>
