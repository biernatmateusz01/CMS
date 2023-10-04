<template>
  <div>lOGIN</div>
  <span @click="login">send</span>
</template>


<script setup>
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";


const isLogged = ref(false);

const login = () => {
  isLogged.value = true;
  useRouter().push('/')

};
</script>