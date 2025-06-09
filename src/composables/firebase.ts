import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserInfo,
} from "firebase/auth";
import { ref, onUnmounted, computed, Ref } from "vue";
import Filter from "bad-words";
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  serverTimestamp,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { MessageInterface } from "./messages.interface";
import { ContactInterface, ChatRoomInterface } from "./chat.interface";
import { useRouter } from "vue-router";
console.log(process.env.VUE_APP_FIREBASE_APIKEY);
const app = initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
});
const auth: Auth = getAuth();

export function useAuth() {
  const user: Ref<UserInfo | null> = ref(null);
  const router = useRouter();

  const unsuscribed = auth.onAuthStateChanged((_user) => {
    user.value = _user;
  });

  onUnmounted(unsuscribed);

  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);

    // Registrar el usuario en la colección users si es nuevo
    if (result.user) {
      await registerUserInFirestore(result.user);
    }
  };

  // Función para registrar usuario en Firestore
  const registerUserInFirestore = async (user: any) => {
    try {
      const userDoc = doc(usersRef, user.uid);
      await setDoc(
        userDoc,
        {
          uid: user.uid,
          displayName: user.displayName || "Usuario sin nombre",
          email: user.email || "",
          photoURL: user.photoURL || "",
          lastSeen: serverTimestamp(),
          isOnline: true,
        },
        { merge: true }
      ); // merge: true para no sobrescribir datos existentes

      console.log("Usuario registrado en Firestore:", user.uid);
    } catch (error) {
      console.error("Error registrando usuario en Firestore:", error);
    }
  };

  const signOut = () => {
    try {
      auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLogin,
    signIn,
    signOut,
    user,
  };
}

const db: Firestore = getFirestore(app);
const messagesRef: CollectionReference = collection(db, "messages");
const chatRoomsRef: CollectionReference = collection(db, "chatRooms");
const usersRef: CollectionReference = collection(db, "users");

const filter = new Filter();
export function useChat() {
  const messages = ref();
  const chatRooms = ref<ChatRoomInterface[]>([]);
  const contacts = ref<ContactInterface[]>([]);
  const currentChatId = ref<string>("general");

  const messageQuery: Query = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    limit(100)
  );

  const unsuscribed = onSnapshot(messageQuery, (snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .reverse();
  });

  onUnmounted(unsuscribed);

  const { user, isLogin } = useAuth();

  // Función para obtener mensajes por chat room
  const getMessagesByChatRoom = (chatRoomId: string) => {
    if (chatRoomId === "general") {
      return messages.value || [];
    }

    // Para chats privados, filtrar mensajes por chatRoomId
    return (messages.value || []).filter(
      (msg: any) => msg.chatRoomId === chatRoomId
    );
  };

  // Función para enviar mensaje
  const sendMessage = async (text: string, chatRoomId = "general") => {
    if (!isLogin.value) return;
    if (user.value !== null) {
      const { displayName, uid, photoURL }: UserInfo = user.value;

      const messageData: any = {
        userName: displayName,
        userUID: uid,
        userPhotoUrl: photoURL,
        text: filter.clean(text),
        createdAt: serverTimestamp(),
      };

      // Si es un chat privado, agregar el chatRoomId
      if (chatRoomId !== "general") {
        messageData.chatRoomId = chatRoomId;
      }

      const docRef = await addDoc(messagesRef, messageData);

      // Actualizar el último mensaje en el chat room
      if (chatRoomId !== "general") {
        await updateChatRoomLastMessage(
          chatRoomId,
          text,
          uid,
          displayName || "Usuario sin nombre"
        );
      }

      console.log("Message sent with ID: " + docRef.id);
    }
  };

  // Función para obtener contactos disponibles
  const getContacts = async () => {
    if (!user.value) return;

    try {
      const usersSnapshot = await getDocs(usersRef);
      const allUsers = usersSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as ContactInterface[];

      // Filtrar el usuario actual
      contacts.value = allUsers.filter(
        (contact) => contact.uid !== user.value?.uid
      );
    } catch (error) {
      console.error("Error obteniendo contactos:", error);
    }
  };

  // Función para crear un chat privado
  const createPrivateChat = async (participantUid: string): Promise<string> => {
    if (!user.value) throw new Error("Usuario no autenticado");

    const chatRoomId = [user.value.uid, participantUid].sort().join("_");

    try {
      // Verificar si el chat ya existe
      const chatRoomDoc = doc(chatRoomsRef, chatRoomId);

      // Crear o actualizar el chat room
      await setDoc(
        chatRoomDoc,
        {
          id: chatRoomId,
          type: "private",
          participants: [user.value.uid, participantUid],
          unreadCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      return chatRoomId;
    } catch (error) {
      console.error("Error creando chat privado:", error);
      throw error;
    }
  };

  // Función para actualizar último mensaje del chat room
  const updateChatRoomLastMessage = async (
    chatRoomId: string,
    text: string,
    senderUid: string,
    senderName: string
  ) => {
    try {
      const chatRoomDoc = doc(chatRoomsRef, chatRoomId);
      await updateDoc(chatRoomDoc, {
        lastMessage: {
          text,
          timestamp: serverTimestamp(),
          senderUid,
          senderName,
        },
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error actualizando último mensaje:", error);
    }
  };

  // Función para obtener chats del usuario
  const getUserChatRooms = async () => {
    if (!user.value) return;

    try {
      const chatRoomsQuery = query(
        chatRoomsRef,
        where("participants", "array-contains", user.value.uid)
      );

      const snapshot = await getDocs(chatRoomsQuery);
      chatRooms.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatRoomInterface[];
    } catch (error) {
      console.error("Error obteniendo chat rooms:", error);
    }
  };

  // Función para indicar que el usuario está escribiendo
  const setTypingStatus = async (chatRoomId: string, isTyping: boolean) => {
    if (!user.value) return;

    try {
      const chatRoomDoc = doc(chatRoomsRef, chatRoomId);
      const typingUsers = isTyping ? arrayUnion(user.value.uid) : arrayUnion(); // Remover usuario de la lista

      await updateDoc(chatRoomDoc, {
        typingUsers: typingUsers,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error actualizando estado de escritura:", error);
    }
  };

  // Función para actualizar estado online del usuario
  const updateUserOnlineStatus = async (isOnline: boolean) => {
    if (!user.value) return;

    try {
      const userDoc = doc(usersRef, user.value.uid);
      await updateDoc(userDoc, {
        isOnline,
        lastSeen: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error actualizando estado online:", error);
    }
  };

  // Función para obtener el nombre de un contacto por UID
  const getContactName = (uid: string): string => {
    const contact = contacts.value.find((c) => c.uid === uid);
    return contact?.displayName || "Usuario desconocido";
  };

  return {
    messages,
    chatRooms,
    contacts,
    currentChatId,
    sendMessage,
    getMessagesByChatRoom,
    getContacts,
    createPrivateChat,
    getUserChatRooms,
    setTypingStatus,
    updateUserOnlineStatus,
    getContactName,
  };
}
