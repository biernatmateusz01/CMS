<template>
  <div>
    <DefaultLayout>
      <BaseHeading>Languages</BaseHeading>

      <div class="flex flex-wrap gap-4 mt-6">
        <LangItem v-for="item in response" :key="item" :item="item" />
      </div>
            <router-link to="/lang/add">
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
import LangItem from "../the/LangItem.vue";
import BaseHeading from '../base/Heading.vue'
const API_URL = "http://localhost:5038/";

const response = ref();

const fetchData = async () => {
  try {
    const apiResponse = await fetch(`${API_URL}api/langs`);
    const data = await apiResponse.json();
    // response.value = data;
    response.value = data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

async function deleteItem(item) {
  await fetch(`${API_URL}api/lang/delete/${item._id}`, {
    method: "DELETE",
  });
  fetchData();
}

fetchData();
</script>