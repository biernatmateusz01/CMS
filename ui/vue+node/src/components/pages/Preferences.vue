<template>
  <DefaultLayout>
    <div>Preferences {{response}}</div>
  </DefaultLayout>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import DefaultLayout from "../layouts/default.vue";

const API_URL = "http://localhost:5038/";

const response = ref([]);

const fetchData = async () => {
  try {
    const apiResponse = await fetch(`${API_URL}api/preferences`);
    const data = await apiResponse.json();
    // response.value = data;
    response.value = data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  fetchData();
});
</script>