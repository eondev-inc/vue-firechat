<template>
  <div
    class="w-full h-[calc(100vh-4rem)] flex bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <!-- Lado izquierdo - Formulario -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Formulario -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form @submit.prevent class="space-y-6">
            <!-- Campo Username/Email -->
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Username or email"
                class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
            </div>

            <!-- Campo Password -->
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
            </div>

            <!-- Opciones adicionales -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  disabled
                />
                <span class="ml-2">Remember me</span>
              </label>
              <a href="#" class="text-blue-500 hover:text-blue-600"
                >Forgot password?</a
              >
            </div>

            <!-- Botón Login -->
            <button
              type="button"
              class="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              LOGIN
            </button>

            <!-- Separador -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <!-- Botón Google -->
            <button
              @click="signIn"
              type="button"
              class="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              LOGIN WITH GOOGLE
            </button>

            <!-- Enlaces adicionales -->
            <div class="text-center text-sm text-gray-600">
              <span>Don't have an account? </span>
              <a href="#" class="text-blue-500 hover:text-blue-600 font-medium"
                >Register now</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Lado derecho - Imagen decorativa -->
    <div class="hidden lg:flex lg:flex-1 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
      >
        <div class="flex items-center justify-center h-full">
          <!-- Ilustración del teléfono con chat -->
          <div class="relative">
            <!-- Teléfono móvil -->
            <div class="relative z-10">
              <svg class="w-48 h-72" viewBox="0 0 200 320" fill="none">
                <!-- Marco del teléfono -->
                <rect
                  x="20"
                  y="20"
                  width="160"
                  height="280"
                  rx="25"
                  fill="#4F46E5"
                  stroke="#3730A3"
                  stroke-width="3"
                />
                <!-- Pantalla -->
                <rect
                  x="30"
                  y="40"
                  width="140"
                  height="240"
                  rx="15"
                  fill="#F8FAFC"
                />
                <!-- Notch -->
                <rect
                  x="80"
                  y="25"
                  width="40"
                  height="8"
                  rx="4"
                  fill="#374151"
                />
                <!-- Botón home -->
                <circle cx="100" cy="295" r="8" fill="#374151" />
              </svg>
            </div>

            <!-- Burbuja de chat verde (arriba derecha) -->
            <div class="absolute -top-8 -right-12 z-20">
              <svg class="w-32 h-20" viewBox="0 0 120 80" fill="none">
                <path
                  d="M10 15 Q10 5 20 5 L90 5 Q100 5 100 15 L100 45 Q100 55 90 55 L30 55 L15 70 L20 55 Q10 55 10 45 Z"
                  fill="#86EFAC"
                  stroke="#22C55E"
                  stroke-width="2"
                />
                <!-- Líneas de texto -->
                <rect
                  x="20"
                  y="18"
                  width="60"
                  height="3"
                  rx="1.5"
                  fill="#059669"
                />
                <rect
                  x="20"
                  y="28"
                  width="45"
                  height="3"
                  rx="1.5"
                  fill="#059669"
                />
                <rect
                  x="20"
                  y="38"
                  width="55"
                  height="3"
                  rx="1.5"
                  fill="#059669"
                />
              </svg>
            </div>

            <!-- Burbuja de chat beige (izquierda) -->
            <div class="absolute top-12 -left-16 z-20">
              <svg class="w-28 h-18" viewBox="0 0 110 72" fill="none">
                <path
                  d="M90 10 Q100 10 100 20 L100 40 Q100 50 90 50 L60 50 L75 65 L70 50 Q20 50 10 50 Q10 40 10 20 Q10 10 20 10 Z"
                  fill="#F3F4F6"
                  stroke="#D1D5DB"
                  stroke-width="2"
                />
                <!-- Líneas de texto -->
                <rect
                  x="20"
                  y="22"
                  width="50"
                  height="3"
                  rx="1.5"
                  fill="#6B7280"
                />
                <rect
                  x="20"
                  y="32"
                  width="35"
                  height="3"
                  rx="1.5"
                  fill="#6B7280"
                />
              </svg>
            </div>

            <!-- Burbuja de chat beige (abajo izquierda) -->
            <div class="absolute top-32 -left-8 z-20">
              <svg class="w-24 h-16" viewBox="0 0 100 64" fill="none">
                <path
                  d="M80 8 Q90 8 90 18 L90 35 Q90 45 80 45 L50 45 L65 58 L60 45 Q18 45 8 45 Q8 35 8 18 Q8 8 18 8 Z"
                  fill="#FEF3C7"
                  stroke="#F59E0B"
                  stroke-width="2"
                />
                <!-- Líneas de texto -->
                <rect
                  x="15"
                  y="20"
                  width="40"
                  height="2.5"
                  rx="1.25"
                  fill="#D97706"
                />
                <rect
                  x="15"
                  y="28"
                  width="25"
                  height="2.5"
                  rx="1.25"
                  fill="#D97706"
                />
                <!-- Corazón -->
                <path
                  d="M65 25 C65 20 55 20 55 25 C55 20 45 20 45 25 C45 35 55 40 55 40 C55 40 65 35 65 25 Z"
                  fill="#EF4444"
                />
              </svg>
            </div>

            <!-- Burbuja de chat verde (abajo derecha) -->
            <div class="absolute top-40 -right-4 z-20">
              <svg class="w-30 h-20" viewBox="0 0 125 80" fill="none">
                <path
                  d="M10 12 Q10 2 20 2 L95 2 Q105 2 105 12 L105 42 Q105 52 95 52 L35 52 L20 67 L25 52 Q10 52 10 42 Z"
                  fill="#BBF7D0"
                  stroke="#16A34A"
                  stroke-width="2"
                />
                <!-- Corazones múltiples -->
                <path
                  d="M25 20 C25 16 20 16 20 20 C20 16 15 16 15 20 C15 26 20 30 20 30 C20 30 25 26 25 20 Z"
                  fill="#EF4444"
                />
                <path
                  d="M40 20 C40 16 35 16 35 20 C35 16 30 16 30 20 C30 26 35 30 35 30 C35 30 40 26 40 20 Z"
                  fill="#EF4444"
                />
                <path
                  d="M55 20 C55 16 50 16 50 20 C50 16 45 16 45 20 C45 26 50 30 50 30 C50 30 55 26 55 20 Z"
                  fill="#EF4444"
                />
              </svg>
            </div>

            <!-- Corazones flotantes decorativos -->
            <div class="absolute -top-16 left-8 z-10">
              <svg
                class="w-8 h-8 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  fill="#EF4444"
                />
              </svg>
            </div>

            <div class="absolute top-4 right-12 z-10">
              <svg
                class="w-6 h-6 animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  fill="#F97316"
                />
              </svg>
            </div>

            <div class="absolute bottom-8 left-4 z-10">
              <svg
                class="w-5 h-5 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  fill="#EF4444"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
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
