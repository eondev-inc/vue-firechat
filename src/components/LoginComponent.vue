<template>
  <div class="w-full h-screen flex items-center justify-center bg-indigo-100">
    <button
      @click="signIn"
      class="w-full md:w-1/3 py-2 mt-8 rounded-full bg-blue-400 text-gray-100 focus:outline-none cursor-pointer"
    >
      Login
    </button>
  </div>
</template>
<script lang="ts">
import { useAuth } from "@/composables/firebase";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const { signIn } = useAuth();

    return {
      signIn,
    };
  },
});
</script>
<style lang=""></style>
