<template lang="">
  <header>
    <!-- Navbar -->
    <nav
      class="navbar navbar-expand-md shadow-md py-2 bg-lime-100 relative flex items-center w-full justify-between"
    >
      <div class="px-6 w-full flex flex-wrap items-center justify-between">
        <div class="flex items-center">
          <button
            class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContentY"
            aria-controls="navbarSupportedContentY"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              class="w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="navbar-collapse collapse grow items-center"
          id="navbarSupportedContentY"
        >
          <ul class="navbar-nav mr-auto md:flex md:flex-row">
            <li class="nav-item">
              <button
                @click="singOut"
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out bg-orange-200 rounded-md"
                href="#!"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
  </header>
</template>
<script lang="ts">
import { useAuth } from "@/composables/firebase";
import { defineComponent } from "vue";

export default defineComponent({
  name: "header-component",
  setup() {
    const { singOut, isLogin, user } = useAuth();

    return {
      isLogin,
      singOut,
      user,
    };
  },
});
</script>
<style lang=""></style>
