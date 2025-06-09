<template>
  <!-- Layout principal del chat moderno -->
  <div class="h-[calc(100vh-4rem)] bg-gray-50 flex">
    <!-- Estado de carga inicial -->
    <div
      v-if="isLoading && user"
      class="w-full flex items-center justify-center"
    >
      <div class="flex items-center space-x-2">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
        ></div>
        <span class="text-lg text-gray-500">Cargando chat...</span>
      </div>
    </div>

    <!-- Mensaje cuando no hay usuario -->
    <div v-else-if="!user" class="w-full flex items-center justify-center">
      <div class="text-center">
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
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
        <p class="text-gray-500 text-lg mb-2">Bienvenido a Vue FireChat</p>
        <p class="text-gray-400">
          Por favor, inicia sesión para comenzar a chatear
        </p>
      </div>
    </div>

    <!-- Chat principal cuando el usuario está logueado y no hay carga -->
    <template v-else>
      <!-- Sidebar de contactos/chats -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <!-- Header del sidebar -->
        <div
          class="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">Chats</h2>
            <button
              @click="showNewChatModal = true"
              class="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Barra de búsqueda -->
          <div class="mt-3 relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar chats..."
              class="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 rounded-lg focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 transition-colors"
            />
            <svg
              class="absolute left-3 top-2.5 w-4 h-4 text-white opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Pestañas de filtrado -->
        <div class="p-4 border-b border-gray-200">
          <div class="flex space-x-1">
            <button
              @click="currentFilter = 'all'"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                currentFilter === 'all'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              Todos
            </button>
            <button
              @click="currentFilter = 'general'"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                currentFilter === 'general'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              General
            </button>
            <button
              @click="currentFilter = 'private'"
              :class="[
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                currentFilter === 'private'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              Privados
            </button>
          </div>
        </div>

        <!-- Lista de chats -->
        <div class="flex-1 overflow-y-auto">
          <!-- Chat General (siempre visible) -->
          <div
            @click="selectChat('general')"
            :class="[
              'p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
              selectedChatId === 'general'
                ? 'bg-indigo-50 border-indigo-200'
                : '',
            ]"
          >
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center"
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div
                  class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    Chat General
                  </p>
                  <span class="text-xs text-gray-500">Activo</span>
                </div>
                <p class="text-sm text-gray-500 truncate">
                  {{ lastGeneralMessage || "Únete a la conversación general" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Separador si hay contactos -->
          <div v-if="filteredContacts.length > 0" class="px-4 py-2 bg-gray-100">
            <p
              class="text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              Chats Privados
            </p>
          </div>

          <!-- Lista de contactos/chats privados -->
          <div v-if="filteredContacts.length > 0">
            <div v-for="contact in filteredContacts" :key="contact.uid">
              <div
                @click="selectChat(contact.uid)"
                :class="[
                  'p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
                  selectedChatId === contact.uid
                    ? 'bg-indigo-50 border-indigo-200'
                    : '',
                ]"
              >
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <img
                      v-if="contact.photoURL"
                      :src="contact.photoURL"
                      :alt="contact.displayName"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      v-else
                      class="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white text-sm font-semibold">
                        {{ contact.displayName.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div
                      :class="[
                        'absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full',
                        contact.isOnline ? 'bg-green-500' : 'bg-gray-400',
                      ]"
                    ></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ contact.displayName }}
                      </p>
                      <span class="text-xs text-gray-500">
                        {{ contact.isOnline ? "En línea" : "Desconectado" }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-500 truncate">
                      {{
                        contact.isOnline
                          ? "Disponible para chatear"
                          : "Última vez visto hace un momento"
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje cuando no hay contactos -->
          <div v-else class="p-8 text-center">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                ></path>
              </svg>
            </div>
            <p class="text-gray-500 text-sm mb-2">
              No hay contactos disponibles
            </p>
            <p class="text-gray-400 text-xs">
              Haz clic en + para buscar usuarios
            </p>
          </div>
        </div>
      </div>

      <!-- Área principal del chat -->
      <div class="flex-1 flex flex-col">
        <!-- Header del chat activo -->
        <div class="bg-white border-b border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div v-if="selectedChatId === 'general'">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div v-else-if="selectedContact">
                <img
                  v-if="selectedContact.photoURL"
                  :src="selectedContact.photoURL"
                  :alt="selectedContact.displayName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-sm font-semibold">
                    {{ selectedContact.displayName.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  {{
                    selectedChatId === "general"
                      ? "Chat General"
                      : selectedContact?.displayName
                  }}
                </h3>
                <p class="text-xs text-gray-500">
                  {{
                    selectedChatId === "general"
                      ? "Conversación grupal"
                      : "En línea hace 5 min"
                  }}
                </p>
              </div>
            </div>

            <!-- Acciones del chat -->
            <div class="flex items-center space-x-2">
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </button>
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
              <button
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Área de mensajes -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 bg-gray-50 messages-container"
        >
          <!-- Mensaje de bienvenida si no hay mensajes -->
          <div
            v-if="currentMessages.length === 0"
            class="flex items-center justify-center h-full"
          >
            <div class="text-center">
              <div
                class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-indigo-500"
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
              <p class="text-gray-500 text-lg mb-2">
                {{
                  selectedChatId === "general"
                    ? "¡Inicia la conversación!"
                    : "¡Envía tu primer mensaje!"
                }}
              </p>
              <p class="text-gray-400 text-sm">
                {{
                  selectedChatId === "general"
                    ? "Sé el primero en escribir en el chat general"
                    : `Comienza tu conversación con ${selectedContact?.displayName}`
                }}
              </p>
            </div>
          </div>

          <!-- Lista de mensajes -->
          <div v-else class="space-y-4">
            <div
              v-for="(msg, index) in currentMessages"
              :key="'msg-' + msg.id + index"
              :class="[
                'flex chat-message-transition',
                sameUser(msg) ? 'justify-end' : 'justify-start',
              ]"
            >
              <!-- Mensaje de otros usuarios -->
              <div
                v-if="!sameUser(msg)"
                class="flex items-end space-x-2 max-w-xs lg:max-w-md"
              >
                <img
                  :src="msg.userPhotoUrl"
                  :alt="msg.userName"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div
                    class="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm"
                  >
                    <p class="text-sm text-gray-900">{{ msg.text }}</p>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 ml-2">
                    {{ formatTime(msg.createdAt) }}
                  </p>
                </div>
              </div>

              <!-- Mensaje del usuario actual -->
              <div v-else class="flex items-end space-x-2 max-w-xs lg:max-w-md">
                <div>
                  <div
                    class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md px-4 py-2 shadow-sm"
                  >
                    <p class="text-sm">{{ msg.text }}</p>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 mr-2 text-right">
                    {{ formatTime(msg.createdAt) }}
                  </p>
                </div>
                <img
                  :src="msg.userPhotoUrl"
                  :alt="msg.userName"
                  class="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>

            <!-- Indicador de "escribiendo" -->
            <div v-if="isTypingIndicatorVisible" class="flex justify-start">
              <div class="flex items-end space-x-2 max-w-xs lg:max-w-md">
                <div
                  class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs text-gray-600">...</span>
                </div>
                <div>
                  <div class="bg-gray-200 rounded-2xl rounded-bl-md px-4 py-2">
                    <div class="flex items-center space-x-1">
                      <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span class="text-sm text-gray-600 ml-2"
                        >escribiendo...</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Área de escritura -->
        <div class="bg-white border-t border-gray-200 p-4">
          <div class="flex items-center space-x-3">
            <!-- Botón de adjuntos -->
            <button
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>

            <!-- Input de mensaje -->
            <div class="flex-1 relative">
              <input
                v-model="message"
                @keyup.enter="sendMessageHere"
                @input="handleTyping"
                type="text"
                placeholder="Escribe un mensaje..."
                class="w-full px-4 py-2 pr-12 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
              <!-- Botón de emojis -->
              <button
                class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Botón de envío -->
            <button
              @click="sendMessageHere"
              :disabled="!message.trim()"
              :class="[
                'p-2 rounded-lg transition-colors',
                message.trim()
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed',
              ]"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Modal para nuevo chat -->
    <div
      v-if="showNewChatModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showNewChatModal = false"
    >
      <div class="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Nuevo Chat</h3>
          <button
            @click="showNewChatModal = false"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar usuarios..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div class="max-h-64 overflow-y-auto">
          <div
            v-if="contacts.length === 0"
            class="text-center py-8 text-gray-500"
          >
            <svg
              class="w-12 h-12 mx-auto mb-2 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p>No hay usuarios disponibles</p>
          </div>

          <div
            v-for="contact in filteredContacts"
            :key="contact.uid"
            class="mb-2"
          >
            <div
              @click="startPrivateChat(contact.uid)"
              class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div class="relative mr-3">
                <img
                  v-if="contact.photoURL"
                  :src="contact.photoURL"
                  :alt="contact.displayName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-sm font-semibold">
                    {{ contact.displayName.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div
                  :class="[
                    'absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full',
                    contact.isOnline ? 'bg-green-500' : 'bg-gray-400',
                  ]"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ contact.displayName }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ contact.email }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useAuth, useChat } from "@/composables/firebase";
import { MessageInterface } from "@/composables/messages.interface";
import { ContactInterface } from "@/composables/chat.interface";
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
} from "vue";

export default defineComponent({
  name: "ChatComponent",
  setup() {
    const message = ref("");
    const {
      messages,
      sendMessage,
      getMessagesByChatRoom,
      chatRooms,
      contacts: firebaseContacts,
      getContacts,
      createPrivateChat,
      getUserChatRooms,
      setTypingStatus,
    } = useChat();
    const { user } = useAuth();

    // Estados del chat moderno
    const selectedChatId = ref<string>("general");
    const searchQuery = ref("");
    const currentFilter = ref<"all" | "general" | "private">("all");
    const showNewChatModal = ref(false);
    const isLoading = ref(false);
    const isTyping = ref(false);
    const typingTimeout = ref<number | null>(null);
    const messagesContainer = ref<HTMLElement | null>(null);

    // Datos mock para contactos (se irán reemplazando por datos reales)
    const mockContacts = ref<ContactInterface[]>([
      {
        uid: "user1",
        displayName: "Nika Jerrardo",
        email: "nika@example.com",
        photoURL: "",
        lastSeen: new Date(),
        isOnline: true,
      },
      {
        uid: "user2",
        displayName: "Jared Sunn",
        email: "jared@example.com",
        photoURL: "",
        lastSeen: new Date(),
        isOnline: false,
      },
      {
        uid: "user3",
        displayName: "David Arrestas",
        email: "david@example.com",
        photoURL: "",
        lastSeen: new Date(),
        isOnline: true,
      },
    ]);

    // Computed properties
    const contacts = computed(() => {
      // Combinar contactos mock con contactos reales de Firebase
      const realContacts = firebaseContacts.value || [];
      if (realContacts.length > 0) {
        return realContacts;
      }
      return mockContacts.value;
    });

    const filteredContacts = computed(() => {
      let filtered = contacts.value;

      // Filtrar por tipo
      if (currentFilter.value === "private") {
        // Solo mostrar contactos privados
      } else if (currentFilter.value === "general") {
        filtered = [];
      }

      // Filtrar por búsqueda
      if (searchQuery.value.trim()) {
        filtered = filtered.filter(
          (contact) =>
            contact.displayName
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            contact.email
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        );
      }

      return filtered;
    });

    const selectedContact = computed(() => {
      if (selectedChatId.value === "general") return null;
      return contacts.value.find(
        (contact) => contact.uid === selectedChatId.value
      );
    });

    const currentMessages = computed(() => {
      // Filtrar mensajes por chat seleccionado
      return getMessagesByChatRoom(selectedChatId.value) || [];
    });

    const lastGeneralMessage = computed(() => {
      const generalMessages = getMessagesByChatRoom("general");
      const lastMsg = generalMessages?.[generalMessages.length - 1];
      return lastMsg ? `${lastMsg.userName}: ${lastMsg.text}` : null;
    });

    // Computed para mostrar indicador de "escribiendo"
    const isTypingIndicatorVisible = computed(() => {
      if (selectedChatId.value === "general") return false;

      const currentChatRoom = chatRooms.value.find(
        (room) => room.id === selectedChatId.value
      );
      if (!currentChatRoom?.typingUsers) return false;

      // Filtrar usuarios escribiendo (que no sea el usuario actual)
      const otherUsersTyping = currentChatRoom.typingUsers.filter(
        (uid) => uid !== user.value?.uid
      );
      return otherUsersTyping.length > 0;
    });

    // Métodos
    const selectChat = async (chatId: string) => {
      selectedChatId.value = chatId;
      console.log("Chat seleccionado:", chatId);

      // Si es un chat privado y no existe, crearlo
      if (
        chatId !== "general" &&
        !chatRooms.value.find((room) => room.id === chatId)
      ) {
        try {
          await createPrivateChat(chatId);
          console.log("Chat privado creado:", chatId);
        } catch (error) {
          console.error("Error creando chat privado:", error);
        }
      }
    };

    const sendMessageHere = async () => {
      if (message.value.trim() !== "" && user.value) {
        try {
          await sendMessage(message.value, selectedChatId.value);
          message.value = "";
        } catch (error) {
          console.error("Error enviando mensaje:", error);
        }
      }
    };

    const startPrivateChat = async (contactUid: string) => {
      try {
        const chatRoomId = await createPrivateChat(contactUid);
        selectedChatId.value = chatRoomId;
        showNewChatModal.value = false;
        console.log("Chat privado iniciado:", chatRoomId);
      } catch (error) {
        console.error("Error iniciando chat privado:", error);
      }
    };

    // Función para manejar el estado de "escribiendo"
    const handleTyping = async () => {
      if (selectedChatId.value === "general") return; // No mostrar en chat general

      // Indicar que está escribiendo
      if (!isTyping.value) {
        isTyping.value = true;
        await setTypingStatus(selectedChatId.value, true);
      }

      // Limpiar timeout anterior
      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value);
      }

      // Establecer nuevo timeout para dejar de escribir
      typingTimeout.value = setTimeout(async () => {
        isTyping.value = false;
        await setTypingStatus(selectedChatId.value, false);
      }, 1000);
    };

    // Función para scroll automático hacia abajo
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    };

    const sameUser = (item: MessageInterface) => {
      if (user.value !== null) {
        return user.value.uid === item.userUID;
      }
      return false;
    };

    const formatTime = (timestamp: any): string => {
      try {
        if (!timestamp) {
          return "Ahora";
        }

        let date: Date;

        // Si es un Timestamp de Firestore
        if (timestamp && typeof timestamp.toDate === "function") {
          date = timestamp.toDate();
        }
        // Si es un string
        else if (typeof timestamp === "string") {
          date = new Date(timestamp);
        }
        // Si ya es un Date
        else if (timestamp instanceof Date) {
          date = timestamp;
        }
        // Si es un número (unix timestamp)
        else if (typeof timestamp === "number") {
          date = new Date(timestamp);
        }
        // Fallback
        else {
          return "Ahora";
        }

        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
          return "Ahora";
        }

        return date.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        console.error("Error formateando timestamp:", error, timestamp);
        return "Ahora";
      }
    };

    // Inicialización
    onMounted(async () => {
      if (user.value) {
        isLoading.value = true;
        try {
          // Cargar contactos y chat rooms del usuario
          await Promise.all([getContacts(), getUserChatRooms()]);
        } catch (error) {
          console.error("Error cargando datos del chat:", error);
        } finally {
          isLoading.value = false;
        }
      }
    });

    // Watcher para manejar cambios en el estado del usuario
    watch(user, async (newUser) => {
      if (newUser && !isLoading.value) {
        isLoading.value = true;
        try {
          // Cargar contactos y chat rooms cuando el usuario se loguea
          await Promise.all([getContacts(), getUserChatRooms()]);
        } catch (error) {
          console.error("Error cargando datos del chat:", error);
        } finally {
          isLoading.value = false;
        }
      }
    });

    // Watcher para auto-scroll cuando llegan nuevos mensajes
    watch(
      currentMessages,
      () => {
        nextTick(() => {
          scrollToBottom();
        });
      },
      { flush: "post" }
    );

    // Watcher para scroll cuando cambia el chat seleccionado
    watch(selectedChatId, () => {
      nextTick(() => {
        scrollToBottom();
      });
    });

    return {
      // Estado básico
      user,
      message,
      messages,
      isLoading,

      // Estado del chat moderno
      selectedChatId,
      searchQuery,
      currentFilter,
      showNewChatModal,
      contacts,
      chatRooms,

      // Referencias
      messagesContainer,

      // Computed
      filteredContacts,
      selectedContact,
      currentMessages,
      lastGeneralMessage,
      isTypingIndicatorVisible,

      // Métodos
      selectChat,
      sendMessageHere,
      startPrivateChat,
      handleTyping,
      scrollToBottom,
      sameUser,
      formatTime,
    };
  },
});
</script>
<style scoped>
/* Animación para el indicador de escritura */
.typing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.typing-indicator span {
  height: 4px;
  width: 4px;
  margin: 0 1px;
  background-color: #9ca3af;
  border-radius: 50%;
  display: inline-block;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Mejoras visuales adicionales */
.chat-message-transition {
  transition: all 0.3s ease;
}

.chat-message-transition:hover {
  transform: translateY(-1px);
}

/* Scroll suave para el área de mensajes */
.messages-container {
  scroll-behavior: smooth;
}

/* Estilo para el scroll personalizado */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
