<template>
  <DefaultLayout>
    <form @submit.prevent="sendForm()">
      <div class="flex items-center justify-center min-h-screen">
        <div
          class="p-4 flex flex-col bg-gray-100 shadow-md max-w-[600px] gap-4 rounded"
        >
          <input
            v-model="vName"
            type="text"
            placeholder="name"
            class="p-2 rounded"
          />
          <input
            v-model="vNumber"
            type="text"
            placeholder="number"
            class="p-2 rounded"
          />
          <input
            v-model.trim="vImg"
            type="text"
            placeholder="image"
            class="p-2 rounded"
          />
          <label class="switch">
            <input v-model="vLiked" type="checkbox" />
            <span class="slider round ml-2">Liked</span>
          </label>

          <BaseSelect :options="selectOptions" />
          <input type="submit" />
        </div>
      </div>
    </form>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "../components/layouts/default.vue";
import BaseSelect from "../components/base/Select.vue";

import { ref } from "vue";
const API_URL = "http://localhost:5038/";

const vName = ref("");
const vNumber = ref("");
const vLiked = ref(false);
const vImg = ref("");

const sendForm = () => {
  fetch(`${API_URL}api/apitestdb/create`, {
    method: "POST",
    body: JSON.stringify({
      name: vName.value,
      number: vNumber.value,
      liked: vLiked.value,
      image: vImg.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to /songs if the request was successful
        window.location.href = '/products';
      } else {
        // Handle errors here if needed
        console.error('Request failed:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};


const selectOptions = [
  { id: 1, name: "Leslie Alexander" },
  { id: 2, name: "Maciej Gostomski" },
  { id: 3, name: "Jonathan De Amo" },
  { id: 4, name: "Marcin Grabowski" },
  { id: 5, name: "Karol Podliński" },
  { id: 6, name: "Lukas Klemenz" },
];
</script>