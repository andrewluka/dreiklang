import { nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";

const useChildDimensions = <T extends HTMLElement>() => {
  const childRef = ref<T>();

  const dimensions = ref({
    clientWidth: childRef.value?.clientWidth,
    offsetWidth: childRef.value?.offsetWidth,
    scrollWidth: childRef.value?.scrollWidth,

    clientHeight: childRef.value?.clientHeight,
    offsetHeight: childRef.value?.offsetHeight,
    scrollHeight: childRef.value?.scrollHeight,
  });

  function onResize() {
    nextTick(() => {
      dimensions.value = {
        clientWidth: childRef.value?.clientWidth,
        offsetWidth: childRef.value?.offsetWidth,
        scrollWidth: childRef.value?.scrollWidth,

        clientHeight: childRef.value?.clientHeight,
        offsetHeight: childRef.value?.offsetHeight,
        scrollHeight: childRef.value?.scrollHeight,
      };
    });
  }

  onBeforeMount(() => window.addEventListener("resize", onResize));
  onMounted(onResize);
  onBeforeUnmount(() => window.removeEventListener("resize", onResize));

  return { childRef, dimensions };
};

export { useChildDimensions as useWindowDimensions };
