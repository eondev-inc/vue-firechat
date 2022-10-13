<template lang="">
  <div>
    <HeaderComponent />
    <LoginComponent v-if="!user" />
    <ChatComponent v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import LoginComponent from "@/components/LoginComponent";
import ChatComponent from "@/components/ChatComponent";
import HeaderComponent from "@/components/HeaderComponent";
import { useAuth } from "@/composables/firebase";

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
