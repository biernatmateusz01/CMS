<template>
<div class="bg-red-400 h-screen flex items-center justify-center">
  <form @submit.prevent="sendForm">
    <div
      class="flex flex-col gap-2 block m-auto max-w-[300px]  p-4 text-red shadow-md"
    >
      <input type="text" placeholder="name" v-model="vName" />
      <input type="text" placeholder="img" v-model="vImg" />
      <input type="text" placeholder="link" v-model="vLink" />
      <button type="submit">sendForm</button>
    </div>
  </form>
</div>

</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const API_URL = "http://localhost:5038/";
const vName = ref("");
const vImg = ref("");
const vLink = ref("");

const sendForm = () => {
    fetch(`${API_URL}api/carrier/create`, {
      method: "POST",
      body: JSON.stringify({
        name: vName.value,
        link: vLink.value,
        logo: vImg.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to /songs if the request was successful
          window.location.href = "/songs";
        } else {
          // Handle errors here if needed
          console.error("Request failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
};

const getData = async () => {
  try {
    const apiResponse = await fetch(
      `${API_URL}api/carrier/${useRoute().params.id}`
    );
    const data = await apiResponse.json();
    // response.value = data;
    vName.value = data.name;
    vImg.value = data.logo;
    vLink.value = data.link;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

if (useRoute().params.id != "add") {
  getData();
}
</script>