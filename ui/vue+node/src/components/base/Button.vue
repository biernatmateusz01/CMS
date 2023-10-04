<template>
  <button
    :type="type"
    class="flex items-center justify-center gap-2 text-sm font-medium text-center align-middle transition-colors duration-500 rounded"
    :class="[
      bigger ? 'px-4 py-2.5 leading-6' : 'px-3 py-2 leading-[18px]',
      color === 'accent'
        ? 'bg-accent hover:bg-accent-dark text-white'
        : color === 'green'
        ? 'bg-green-700 hover:bg-green-800 text-white'
        : color === 'gray'
        ? 'bg-gray-400 hover:bg-gray-500 text-white'
        : color === 'transparent'
        ? 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-500'
        : '',
    ]"
    @click="$emit('click-btn')"
  >
    <BaseIcon v-if="icon" :name="icon" smaller />
    <slot />
  </button>
</template>

<script setup lang="ts">
type buttonType = "submit" | "button" | "reset";
type buttonColor = "accent" | "green" | "gray" | "transparent";

defineEmits<{
  (e: "click-btn"): void;
}>();

withDefaults(
  defineProps<{
    type?: buttonType;
    icon?: Icon;
    color?: buttonColor;
    bigger?: boolean;
  }>(),
  {
    type: "button",
    color: "accent",
  }
);
</script>