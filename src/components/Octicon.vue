<template>
  <svg class="octicon" :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size" v-html="path"></svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Octicon",
  props: {
    octicon: {
      type: String as PropType<"paper-airplane" | "square" | "chevron-right">,
      default: "pencil",
      required: true,
    },
    size: {
      type: Number as PropType<16 | 24>,
      default: 16,
    },
  },
  setup(props) {
    let path = "";

    // This may no look very nice, but it's actually pretty smart.
    // This effectively removes the ability to swith the icon on the fly, but also solves the issue where you'd need one component for each single icon
    if (props.octicon == "paper-airplane" && props.size == 24)
      path =
        '<path fill-rule="evenodd" d="M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.146 1.146 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.374 1.374 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5H3.888z"></path>';
    else if (props.octicon == "paper-airplane" && props.size == 16)
      path =
        '<path fill-rule="evenodd" d="M1.592 2.712L2.38 7.25h4.87a.75.75 0 110 1.5H2.38l-.788 4.538L13.929 8 1.592 2.712zM.989 8L.064 2.68a1.341 1.341 0 011.85-1.462l13.402 5.744a1.13 1.13 0 010 2.076L1.913 14.782a1.341 1.341 0 01-1.85-1.463L.99 8z"></path>';
    else if (props.octicon == "square" && props.size == 24)
      path =
        '<path fill-rule="evenodd" d="M6 7.75C6 6.784 6.784 6 7.75 6h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 18h-8.5A1.75 1.75 0 016 16.25v-8.5zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-8.5z"></path>';
    else if (props.octicon == "square" && props.size == 16)
      path =
        '<path fill-rule="evenodd" d="M4 5.75C4 4.784 4.784 4 5.75 4h4.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0110.25 12h-4.5A1.75 1.75 0 014 10.25v-4.5zm1.75-.25a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h4.5a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-4.5z"></path>';
    else if (props.octicon == "chevron-right" && props.size == 24)
      path =
        '<path fill-rule="evenodd" d="M8.72 18.78a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06L9.78 5.22a.75.75 0 00-1.06 1.06L14.44 12l-5.72 5.72a.75.75 0 000 1.06z"></path>';
    else if (props.octicon == "chevron-right" && props.size == 16)
      path =
        '<path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path>';
    return {
      path,
    };
  },
});
</script>