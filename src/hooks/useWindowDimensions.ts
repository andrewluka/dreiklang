import { onBeforeMount, onBeforeUnmount, ref } from "vue";

const useWindowDimensions = () => {
  const dimensions = ref({
    innerWidth: window.innerWidth,
    outerWidth: window.outerWidth,
    innerHeight: window.innerHeight,
    outerHeight: window.outerHeight,
  });

  function onResize() {
    dimensions.value = {
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
      innerHeight: window.innerHeight,
      outerHeight: window.outerHeight,
    };
    // dimensions.value.innerWidth = window.innerWidth;
    // dimensions.value.innerHeight = window.innerHeight;
    // dimensions.value.outerWidth = window.outerWidth;
    // dimensions.value.outerHeight = window.outerHeight;
  }

  onBeforeMount(() => window.addEventListener("resize", onResize));
  onBeforeUnmount(() => window.removeEventListener("resize", onResize));

  return Object.freeze(dimensions.value);
};

export { useWindowDimensions };
