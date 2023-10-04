<template>
  <Combobox as="div" v-model="selectedPerson">
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Assigned to</ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @change="query = $event.target.value" :display-value="(person) => person?.name" />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <span>I</span>
      </ComboboxButton>

      <ComboboxOptions v-if="filteredPeople.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="option in props.options" :key="option.id" :value="option" as="template" v-slot="{ active, selected }" class="cursor-pointer">
          <li :class="['relative cursor-default select-none py-2 pl-8 pr-4', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ option.name }}
            </span>

            <span v-if="selected" :class="['absolute inset-y-0 left-0 flex items-center pl-1.5', active ? 'text-white' : 'text-indigo-600']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'


const props = defineProps({
  options: Object,
  likes: Number
})

const query = ref('')
const selectedPerson = ref(null)
const filteredPeople = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter((option) => {
        return option.name.toLowerCase().includes(query.value.toLowerCase())
      })
)
</script>