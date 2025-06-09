<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo y título -->
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="hidden md:block">
            <h1 class="text-xl font-bold text-gray-900">Vue FireChat</h1>
          </div>
        </div>

        <!-- Usuario y logout -->
        <div v-if="isLogin && user" class="flex items-center space-x-4">
          <!-- Navegación para usuarios logueados -->
          <div class="hidden md:flex items-center space-x-3">
            <router-link
              to="/chat"
              class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-indigo-600 bg-indigo-50"
            >
              Chat
            </router-link>
            <router-link
              to="/profile"
              class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="text-indigo-600 bg-indigo-50"
            >
              Perfil
            </router-link>
          </div>

          <!-- Información del usuario -->
          <div class="hidden md:flex items-center space-x-3">
            <div class="flex flex-col items-end">
              <span class="text-sm font-medium text-gray-900">{{
                user.displayName || "Usuario"
              }}</span>
              <span class="text-xs text-gray-500">{{ user.email }}</span>
            </div>
            <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              <img
                v-if="user.photoURL"
                :src="user.photoURL"
                :alt="user.displayName || 'Usuario'"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center"
              >
                <span class="text-white text-sm font-semibold">
                  {{
                    (user.displayName || user.email || "U")
                      .charAt(0)
                      .toUpperCase()
                  }}
                </span>
              </div>
            </div>
          </div>

          <!-- Botón logout -->
          <button
            @click="handleSignOut"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <span class="hidden sm:inline">Cerrar Sesión</span>
            <span class="sm:hidden">Salir</span>
          </button>

          <!-- Menú móvil toggle -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Placeholder cuando no hay usuario logueado -->
        <div v-else-if="!isLogin" class="flex items-center">
          <span class="text-sm text-gray-500">Bienvenido a Vue FireChat</span>
        </div>

        <!-- Loading state cuando user aún no está disponible -->
        <div v-else class="flex items-center">
          <div class="flex items-center space-x-2">
            <div
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"
            ></div>
            <span class="text-sm text-gray-500">Cargando...</span>
          </div>
        </div>
      </div>

      <!-- Menú móvil -->
      <div
        v-if="isLogin && user"
        :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
        class="md:hidden"
      >
        <div
          class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 mt-4"
        >
          <router-link
            to="/chat"
            @click="mobileMenuOpen = false"
            class="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            active-class="text-indigo-600 bg-indigo-50"
          >
            Chat
          </router-link>
          <router-link
            to="/profile"
            @click="mobileMenuOpen = false"
            class="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            active-class="text-indigo-600 bg-indigo-50"
          >
            Perfil
          </router-link>

          <!-- Usuario en móvil -->
          <div class="border-t border-gray-200 pt-4 mt-4">
            <div class="flex items-center px-3 py-2">
              <div
                class="w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-3"
              >
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  :alt="user.displayName || 'Usuario'"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center"
                >
                  <span class="text-white text-sm font-semibold">
                    {{
                      (user.displayName || user.email || "U")
                        .charAt(0)
                        .toUpperCase()
                    }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-900">{{
                  user.displayName || "Usuario"
                }}</span>
                <span class="text-xs text-gray-500">{{ user.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { useAuth } from "@/composables/firebase";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const { signOut, isLogin, user } = useAuth();
    const mobileMenuOpen = ref(false);

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const handleSignOut = async () => {
      try {
        await signOut();
        mobileMenuOpen.value = false;
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    onMounted(() => {
      // Aquí podrías agregar lógica adicional al montar el componente
      console.log("HeaderComponent montado");
      console.log("Estado de login:", isLogin.value);
      console.log("Usuario:", user.value);
    });

    return {
      isLogin,
      user,
      mobileMenuOpen,
      toggleMobileMenu,
      handleSignOut,
    };
  },
});
</script>
<style lang=""></style>
