<template>
  <div class="flex flex-col items-start">
    <label v-if="isLabel" :for="`base-switch-${id}`" class="mb-1 text-sm font-medium text-gray-700">
      <slot></slot>
    </label>
    <div class="flex items-center">
      <button
        type="button"
        :id="`base-switch-${id}`"
        class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11"
        :class="modelValue ? 'bg-accent' : 'bg-gray-200'"
        @click="toggleModelValue"
        :disabled="disabled"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none ring-0"
          :class="[modelValue ? 'translate-x-5' : 'translate-x-0']"
        ></span>
      </button>
      <template v-if="options">
        <span v-if="modelValue" class="ml-4 text-sm text-black">{{ options.textTrue }}</span>
        <span v-else class="ml-4 text-sm text-black">{{ options.textFalse }}</span>
      </template>
    </div>
    <p v-if="validation?.passed === false" class="mt-2 text-xs text-red-500 lg:text-sm">{{ validation.message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const id = props.id;
const modelValue = ref(props.modelValue || true);
const disabled = props.disabled || false;
const options = props.options || { textTrue: 'Yes', textFalse: 'No' };
const validation = props.validation || null;
const slot = $slots.default;
const isLabel = ref(!!slot);

const toggleModelValue = () => {
  modelValue.value = !modelValue.value;
  $emit('update:modelValue', modelValue.value);
};
</script>
