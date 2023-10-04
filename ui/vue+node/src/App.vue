 <template>
  <RouterView />
</template>

<script setup>
import { RouterView, useRouter } from "vue-router";
import { ref } from "vue";

const isLogged = ref(false);

const login = () => {
  isLogged.value = true;
};

// if (!isLogged.value) {
//   useRouter().push('/login')
// }

</script>


