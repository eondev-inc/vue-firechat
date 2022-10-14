<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center bg-slate-100"
  >
    <h3>Hola y bienvenido</h3>
    <form @submit.prevent="singIn" class="w-full md:w-1/3 rounded-lg">
      <button
        type="submit"
        class="w-1/2 py-2 mt-8 rounded-full bg-red-600 text-gray-50 focus:outline-none"
      >
        Login with Google
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { useAuth } from "@/composables/firebase";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const { singIn } = useAuth();

    return {
      singIn,
    };
  },
});
</script>
<style lang=""></style>
