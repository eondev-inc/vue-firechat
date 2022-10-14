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
} from "firebase/firestore";
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
  const user: Ref<UserInfo | undefined> = ref();
  const router = useRouter();

  const unsuscribed = auth.onAuthStateChanged((_user) => {
    if (_user !== null) {
      user.value = _user;
    }
  });

  onUnmounted(unsuscribed);

  const isLogin = computed(() => user.value !== null);

  const singIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };

  const singOut = () => {
    try {
      auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLogin,
    singIn,
    singOut,
    user,
  };
}

const db: Firestore = getFirestore(app);
const messagesRef: CollectionReference = collection(db, "messages");

const filter = new Filter();
export function useChat() {
  const messages = ref();
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
  const sendMessage = async (text: string) => {
    if (!isLogin.value) return;
    if (user.value !== undefined) {
      const { displayName, uid, photoURL }: UserInfo = user.value;

      const docRef = await addDoc(messagesRef, {
        userName: displayName,
        userUID: uid,
        userPhotoUrl: photoURL,
        text: filter.clean(text),
        createdAt: serverTimestamp(),
      });

      console.log("Los dosc" + docRef.id);
    }
  };
  return {
    messages,
    sendMessage,
  };
}
