<template>
  <DefaultLayout>
    <div class="grid grid-cols-2">
      <BaseBox>
        <div class="flex flex-col gap-2">
          <InputText type="text" v-model="vName"  size="small" placeholder="Small"/>
          <InputText type="password" v-model="vPassword" />
        </div>
      </BaseBox>
    </div>
  </DefaultLayout>
</template>


<script setup>
import { ref } from "vue";
import DefaultLayout from "../layouts/default.vue";
import BaseInput from "../base/Input.vue";
import BaseBox from "../base/Box.vue";
import InputText from "primevue/inputtext";

const vName = ref("Admin");
const vPassword = ref("12345678");
</script>