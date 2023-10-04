<template>
  <div class="block w-full max-w-[1200px] mx-auto bg-black">fds</div>
  <button
    @click="like"
    :style="{ background: response.liked ? 'rgb(243, 92, 92)' : 'blue' }"
  >
    <svg
      class="svg"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    >
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
      />
    </svg>
  </button>


</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const API_URL = "http://localhost:5038/";

const id = useRoute().params.id;

// function getItem(item) {
//   const data = fetch(`${API_URL}api/apitestdb/getnotes/${id}`);
//   console.log(data.data)
// }

// getItem()
const response = ref([]);

const _id = ref(0);

const fetchData = async () => {
  try {
    const apiResponse = await fetch(`${API_URL}api/apitestdb/getnotes/${id}`);
    const data = await apiResponse.json();
    // response.value = data;
    console.log(data);
    response.value = data;
    _id.value = data._id;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function like() {
  fetch(`${API_URL}api/apitestdb/update/${_id.value}`, {
    method: "PATCH",
    body: JSON.stringify({
      liked: !response.value.liked,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Request was successful, handle the success case here
        fetchData(); // Call fetchData() or update your UI as needed
      } else {
        // Request had an error, handle the error case here
        console.error("Error:", response.status, response.statusText);
      }
    })
    .catch((error) => {
      // Handle network or other errors here
      console.error("Network Error:", error);
    });
}

onMounted(async () => {
  fetchData();
});



</script>


<style scoped>
button {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: absolute;
  bottom: 12px;
  right: 12px;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
}
button:hover {
  background-color: rgb(243, 92, 92);
}
</style>