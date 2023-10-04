<template>
  <div>
    <DefaultLayout>
      <BaseHeading>Payments</BaseHeading>

      <div class="flex flex-wrap gap-4 mt-6">
        <div
          v-for="item in response"
          :key="item"
          class="p-8 w-[200px] relative border rounded shadow-md flex flex-col hover:bg-gray-100"
        >
          <img
            :src="item.logo"
            alt=""
            class="w-[80px] block mx-auto rounded"
          />
          <div class="flex flex-col gap-2 mt-6 items-center justify-center">
            <span>{{ item.name }}</span>
            <!-- <span>{{ item.iso_code }}</span> -->
          </div>
          <div class="absolute top-1 right-1">
            <!-- <div class="flex gap-1">
              <button @click="deleteItem(item)" class="text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <router-link to="/carriers/1">edit</router-link>
            </div> -->
          </div>
        </div>
      </div>
      <router-link to="/">
        <span
          class="h-24 text-3xl w-24 rounded-full bg-red-400 absolute bottom-4 right-4 flex items-center justify-center"
          >+</span
        >
      </router-link>
    </DefaultLayout>
  </div>
</template>
<script setup>
import DefaultLayout from "../layouts/default.vue";


const response = [
    {
        id: 1,
        name: 'BLIK',
        logo: 'data:image/jpeg;base64,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'
    },
        {
        id: 2,
        name: 'APPLE Pay',
        logo: 'https://www.kontomaniak.pl/artykuly/309/image-thumb__309__body-primary/apple-pay-logo.png'
    }
]
</script>