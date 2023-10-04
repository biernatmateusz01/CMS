<template>
  <div>
    <DefaultLayout>
      <div v-if="isLoader" class="bg-red-400 h-full w-full absolute top-0 right-0 z-40"></div>
      <BaseHeading>Carriers</BaseHeading>

      <div class="flex flex-wrap gap-4 mt-6">
        <div
          v-for="item in response"
          :key="item"
          class="p-8 w-[200px] relative border rounded shadow-md flex flex-col hover:bg-gray-100"
        >
          <img
            :src="item.logo"
            alt=""
            class="w-[80px] block mx-auto rounded border border-gray-100"
          />
          <div class="flex flex-col gap-2 mt-6 items-center justify-center">
            <span>{{ item.name }}</span>
            <span>{{ item.iso_code }}</span>
          </div>
          <div class="absolute top-1 right-1">
            <div class="flex gap-1">
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
            </div>
          </div>
        </div>
      </div>
      <router-link to="/carriers/add">
        <span
          class="h-24 text-3xl w-24 rounded-full bg-red-400 absolute bottom-4 right-4 flex items-center justify-center"
          >+</span
        >
      </router-link>
    </DefaultLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DefaultLayout from "../layouts/default.vue";
import BaseHeading from "../base/Heading.vue";

const API_URL = "http://localhost:5038/";

const isLoader = ref(false)
const response = ref();

const fetchData = async () => {
try {
  const apiResponse = await fetch(`${API_URL}api/carriers`);
  if (!apiResponse.ok) {
    throw new Error(`HTTP error! Status: ${apiResponse.status}`);
  }
  isLoader.value = true; // Set isLoader to false regardless of success or failure.

  const data = await apiResponse.json();
  response.value = data.data;
} catch (error) {
  console.error("Error fetching data:", error);
  // Handle the error here, e.g., set response.value to a default value or show an error message.
} finally {
  isLoader.value = false; // Set isLoader to false regardless of success or failure.
}

};

// async function deleteItem(item) {
//   await fetch(`${API_URL}api/lang/delete/${item._id}`, {
//     method: "DELETE",
//   });
//   fetchData();
// }

fetchData();
</script>