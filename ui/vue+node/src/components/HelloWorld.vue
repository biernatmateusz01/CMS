<template>
  <DefaultLayout>
    <div
      v-if="modalDelete"
      class="fixed top-0 left-0 bg-blue-500 bg-opacity-100 h-screen w-screen flex items-center justify-center z-50"
    >
      <button @click="modalDelete = false" class="bg-red-400 p-4">back</button>
      <button @click="deleteItem" class="p-4 text-red-400 bg-white">
        delete
      </button>
    </div>
    <div>
      <div
        class="mt-6 list-none grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <li
          @click="fetchData(item)"
          v-for="item in response"
          :key="item.id"
          class="relative"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
          >
            <img
              v-if="item.img"
              :src="item.img"
              :alt="item.name"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
            <img v-else src="https://static.thenounproject.com/png/4110381-200.png" alt="" 
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            >
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a>
                  <span aria-hidden="true" />
                  {{ item.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ item.price }} zł</p>
            </div>
            <!-- <p class="text-sm font-medium text-gray-900">{{ item.liked }}</p> -->
          </div>
          <button
            @click="getDataForDelete(item)"
            class="text-red-400 absolute top-1 right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </li>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import DefaultLayout from "../components/layouts/default.vue";
// import DeleteIcon from '../../src/assets/delete.svg'

const API_URL = "http://localhost:5038/";

const modalDelete = ref(false);
const idForDelete = ref(0);

const response = ref([]);

const checked = ref([]);

const fetchData = async () => {
  try {
    const apiResponse = await fetch(`${API_URL}api/apitestdb/getnotes`);
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

const selected = reactive([]);
const route = window.location;

const fullData = reactive([]);

function pushLink(item) {
  console.log(item.name);
  fullData.push(`${item.name} ${item.id}`);
  selected.push(item.name);
  console.log(fullData);
  window.history.pushState(null, "", `?name=${fullData}`), [fullData];
  console.log(route);

  const response = fetch(`${API_URL}api/apitestdb/getnotes/${item.id}`);
  console.log(response);
}

async function deleteItem() {
  await fetch(`${API_URL}api/apitestdb/deletenote/${idForDelete.value}`, {
    method: "DELETE",
  });
  modalDelete.value = false;
  idForDelete.value = 0;
  fetchData();
}

const getDataForDelete = (item) => {
  console.log(item._id);
  modalDelete.value = true;
  idForDelete.value = item._id;
  // alert('dfsf')
};
// Access the current route using useRoute
</script>