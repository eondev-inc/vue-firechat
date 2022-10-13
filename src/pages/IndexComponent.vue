<template lang="">
  <div>
    <HeaderComponent />
    <LoginComponent v-if="!user" />
    <ChatComponent v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { useAuth } from "@/composables/firebase";
import LoginComponent from "../components/LoginComponent.vue";
import ChatComponent from "../components/ChatComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";

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
