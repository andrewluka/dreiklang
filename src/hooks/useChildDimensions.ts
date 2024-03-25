import { onBeforeMount, onBeforeUnmount, onMounted, ref, type Ref } from "vue";

const useChildDimensions = <T extends HTMLElement>(childRef: Ref<T | undefined>) => {
  const dimensions = ref({
    clientWidth: childRef.value?.clientWidth,
    offsetWidth: childRef.value?.offsetWidth,
    scrollWidth: childRef.value?.scrollWidth,

    clientHeight: childRef.value?.clientHeight,
    offsetHeight: childRef.value?.offsetHeight,
    scrollHeight: childRef.value?.scrollHeight,
  });

  function onResize() {
    dimensions.value = {
      clientWidth: childRef.value?.clientWidth,
      offsetWidth: childRef.value?.offsetWidth,
      scrollWidth: childRef.value?.scrollWidth,

      clientHeight: childRef.value?.clientHeight,
      offsetHeight: childRef.value?.offsetHeight,
      scrollHeight: childRef.value?.scrollHeight,
    };
  }

  onBeforeMount(() => window.addEventListener("resize", onResize));
  onMounted(onResize);
  onBeforeUnmount(() => window.removeEventListener("resize", onResize));

  return dimensions;
};

export { useChildDimensions };
