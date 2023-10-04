<template>
  <DefaultLayout>
    <BaseHeading>Shop Details</BaseHeading>
    <div class="grid grid-cols-2 mt-6">
      <BaseBox>
        <div class="flex gap-4 flex-col">
          <div class="flex flex-col">
            <label for="name" class="text-xs mb-1">Name</label>

            <input
              v-model="vName"
              type="text"
              id="1"
              name="name"
              required
              minlength="4"
              maxlength="8"
              size="10"
              class="p-1 rounded shadow"
            />
          </div>
          <div class="flex flex-col">
            <label for="address" class="text-xs mb-1">Adress</label>

            <input
              v-model="vAdress"
              type="text"
              id="2"
              name="address"
              required
              minlength="4"
              maxlength="8"
              size="10"
              class="p-1 rounded shadow"
            />
          </div>
          <div class="flex flex-col">
            <label for="country" class="text-xs mb-1">Country</label>

            <input
              v-model="vCountry"
              type="text"
              id="3"
              name="country"
              required
              minlength="4"
              maxlength="8"
              size="10"
              class="p-1 rounded shadow"
            />
          </div>
          <div class="flex flex-col">
            <label for="code" class="text-xs mb-1">Post Code</label>

            <input
              v-model="vCode"
              type="text"
              id="4"
              name="code"
              required
              minlength="4"
              maxlength="8"
              size="10"
              class="p-1 rounded shadow"
            />
          </div>
          <div class="flex flex-col">
            <label for="phone" class="text-xs mb-1">Phone</label>

            <input
              v-model="vPhone"
              type="text"
              id="5"
              name="phone"
              required
              minlength="4"
              maxlength="8"
              size="10"
              class="p-1 rounded shadow"
            />
          </div>
          <div class="flex flex-col">
            <label for="email" class="text-xs mb-1">Email</label>

            <input
              v-model="vEmail"
              type="text"
              id="6"
              name="email"
              required
              minlength="4"
              maxlength="8"
              size="10"
              class="p-1 rounded shadow"
            />
          </div>
        </div>
      </BaseBox>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseBox from "../base/Box.vue";
import DefaultLayout from "../layouts/default.vue";
import BaseHeading from "../base/Heading.vue";

const API_URL = "http://localhost:5038/";

const response = ref([]);

const vName = ref("");
const vAdress = ref("");
const vCountry = ref("");
const vCode = ref("");
const vPhone = ref("");
const vEmail = ref("");

const fetchData = async () => {
  try {
    const apiResponse = await fetch(`${API_URL}api/details`);
    const data = await apiResponse.json();
    vName.value = data.data[0].name;
    vAdress.value = data.data[0].adres;
    vCountry.value = data.data[0].country;
    vCode.value = data.data[0].post_code;
    vPhone.value = data.data[0].phone;
    vEmail.value = data.data[0].email;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  fetchData();
});
</script>