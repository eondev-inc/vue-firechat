import firebase from "firebase/app";
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
  collection,
  CollectionReference,
  doc,
  Firestore,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
});
const auth: Auth = getAuth();

export function useAuth() {
  const user: Ref<UserInfo | null> = ref(null);

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

  const singOut = () => auth.signOut();

  return {
    isLogin,
    singIn,
    singOut,
    user,
  };
}

const db: Firestore = getFirestore(app);
const messagesCollection: CollectionReference = collection(db, "message");
const messagesDocument = doc(db, "messages", "message");

const messageQuery: Query = query(
  messagesCollection,
  orderBy("createdAt", "desc"),
  limit(100)
);

const filter = new Filter();
export function useChat() {
  const messages = ref();

  const unsuscribed = onSnapshot(messageQuery, (snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .reverse();
  });

  onUnmounted(unsuscribed);

  const { user, isLogin } = useAuth();
  const sendMessage = (text) => {
    if (!isLogin.value) return;

    const { photoUrl, uid, displayName } = user.value;

    setDoc(messagesDocument, {
      userName: displayName,
      userId: uid,
      userPhotoUrl: photoUrl,
      text: filter.clean(text),
      createdAt: serverTimestamp(),
    });
  };
  return {
    messages,
    sendMessage,
  };
}
