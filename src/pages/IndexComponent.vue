<template lang="">
  <div class="min-h-screen">
    <HeaderComponent />
    <div class="pt-16">
      <LoginComponent v-if="!isLogin" />
      <ChatComponent v-else-if="isLogin && user" />
      <div v-else class="flex items-center justify-center h-64">
        <div class="flex items-center space-x-2">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
          ></div>
          <span class="text-lg text-gray-500">Cargando chat...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { useAuth } from "@/composables/firebase";
import LoginComponent from "@/components/LoginComponent.vue";
import ChatComponent from "@/components/ChatComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "index-component",
  components: { LoginComponent, ChatComponent, HeaderComponent },
  setup() {
    const { user, isLogin } = useAuth();

    return {
      user,
      isLogin,
    };
  },
});
</script>
