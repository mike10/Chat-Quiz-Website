// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import IInitForChat, {ISendMessage} from '@/utils/constants'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion, onSnapshot, getDoc, query, where, getDocs, arrayRemove } from "firebase/firestore";
import { getMessagesToChat } from '@/redux/sliceChat'
import { getAllUsers } from '@/redux/sliceUsers'
import { getAskQuiz, setAskQuiz } from '@/redux/sliceQuiz'
import {AppDispatch} from '@/redux/store'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8RZZFKAbNx5G1L1kf5dteSTXbBXFgkOs",
  authDomain: "chat-quiz-website-8a483.firebaseapp.com",
  projectId: "chat-quiz-website-8a483",
  storageBucket: "chat-quiz-website-8a483.appspot.com",
  messagingSenderId: "583638170837",
  appId: "1:583638170837:web:cf5d6b36d313a9799b365c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


/* export const getAllMessages = async () => {
  try {
    const q = query(collection(db, "chat"), where("time", ">", Date.now()-30*60*1000));
    console.log('firestore getAllMessage');
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (e) {
    console.error("<getAllUsers> Error adding document: ", e);
  }
} */

/* export const getAllUsers = async () => {
  try {
    const docRef = doc(db, "users", "default");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    console.error("<getAllUsers> Error adding document: ", e);
  }
} */



export const addNewMessage = async ({user, message}:ISendMessage) => {
  try {
    const time:number = Date.now()
    const docData = {
      user,
      message,
      time
    }
    await setDoc(doc(db, "chat", `id${time}`), docData);
    //console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const  getMessagesFromChat = (dispatch:AppDispatch)=>{
  const q = query(collection(db, "chat"), where("time", ">", Date.now()-30*60*1000));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New message: ", change.doc.data());
        dispatch(getMessagesToChat(change.doc.data()))
      }
    });
  });
  return unsubscribe
}

export const getUsers = (dispatch:AppDispatch) => {
  const unsubscribe = onSnapshot(doc(db, "users", "default"), (doc) => {
    console.log("firestore-getUsers: ", doc.data());
    if(doc.data()?.users) dispatch(getAllUsers(doc.data()?.users))
  });
  return ()=>{
    unsubscribe()
  }
}

export const quitUser = async(quitUser:string) => {
  try {
    const roomRef = doc(db, "users", "default");
    await updateDoc(roomRef, {
      users: arrayRemove(quitUser)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addUserToChat = async (newUser:string) => {
  try {
    const roomRef = doc(db, "users", "default");
    await updateDoc(roomRef, {
      users: arrayUnion(newUser)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getQuiz = (dispatch:AppDispatch) => {
  const q = query(collection(db, "quiz"), where("time", ">", Date.now()));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log("New quiz: ", change.doc.data());
      dispatch(getAskQuiz(change.doc.data()))
    });
  });
  return  unsubscribe;
}

export const setQuiz = async () => {
  const time:number = Date.now()
  await setDoc(doc(db, "quiz", "start"), {
    name: "quiz",
    time,
    user: ""
  });
}
