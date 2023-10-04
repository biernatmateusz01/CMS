<template>
  <div
    class="fixed top-0 p-4 xl:p-6 h-full items-center bottom-0 left-0 right-0 bg-black z-[60] overflow-y-auto bg-opacity-40"
    @click.self="$emit('close')"
  >
    <div
      class="w-full flex justify-center items-center overflow-hidden min-h-[calc(100vh-2rem)] xl:min-h-[calc(100vh-3rem)]"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-5xl p-4 py-6 bg-white rounded-md xl:p-6">
        <div v-if="isHeading" class="flex items-start justify-between mb-6">
          <BaseHeading><slot name="heading" /></BaseHeading>
          <button type="button" @click="$emit('close')">
            <BaseIcon name="XMarkIcon" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineEmits<{
  (e: "close"): void;
}>();

defineProps<{
  addPhoto?: boolean;
}>();

const slot = useSlots();
const isHeading = ref(slot.hasOwnProperty("heading"));
const body = ref<HTMLBodyElement | null>(null);

onMounted(() => {
  body.value = document.querySelector("body");
  body.value && body.value.classList.add("overflow-hidden");
});

onUnmounted(() => body.value && body.value.classList.remove("overflow-hidden"));
</script>