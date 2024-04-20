// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, OAuthCredential, User, UserCredential, getAuth, getRedirectResult } from "firebase/auth";
import IInitForChat, {ISendMessage, ISendResult} from '@/utils/constants'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion, onSnapshot, getDoc, query, where, getDocs, arrayRemove, deleteField } from "firebase/firestore";
import { getMessagesToChat } from '@/redux/sliceChat'
import { getAllUsers } from '@/redux/sliceUsers'
import { getAskQuiz } from '@/redux/sliceQuiz'
import {AppDispatch} from '@/redux/store'



// let url = 'firebaseConfig.json';
// let response = await fetch(url);
// let firebaseConfig = await response.json(); 

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
const db = getFirestore(app);

export const reloadToken = async () => {
  
  console.log(auth);
  
  const res:User | null = await getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    console.log('reloadToken',result);
    if(!result) throw 'Can´t get token of Google'
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
    if(!credential || !result) throw 'Can´t get token of Google'
    // const token = credential.accessToken;
    // const user = result.user;
    console.log(result.user);
    
    return result.user
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return null
  });
  
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

export const getQuiz = (dispatch:AppDispatch) => {
  //const q = query(collection(db, "quiz"), where("time", ">", Date.now()));
  const unsubscribe = onSnapshot(doc(db, "quiz", "start"), (doc) => {
    console.log(doc.data());
    if (!doc.exists()) throw new Error('No data available');
    else {
      if (doc.data().time < Date.now()-60*1000) {
        const { user, time, name } = doc.data();
        dispatch(getAskQuiz({ user, time, name }))
      }else {
        dispatch(getAskQuiz(doc.data()))
      }
    }
  });
  return  unsubscribe;
}

export const addNewMessage = async ({user, message}:ISendMessage) => {
  try {
    const time:number = Date.now()
    const docData:IInitForChat = {
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

export const sendResult = async (data:ISendResult) => {
  try {
    const quizRef = doc(db, "quiz", "start");
    //await setDoc(doc(db, "quiz", "start"), quizRef);
    //setDoc(quizRef, { quizResult: arrayUnion(data) });
    await updateDoc(quizRef, {
      quizResult: arrayUnion(data)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const setQuiz = async (user:string) => {
  const time:number = Date.now()
  await setDoc(doc(db, "quiz", "start"), {
    name: "quiz",
    time,
    user,
    quiz: [
      {q:'Question 1', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 2},
      {q:'Question 2', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 1},
      {q:'Question 3', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 4},
      {q:'Question 4', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 3},
      {q:'Question 5', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 1}  
    ]
  });

  const quizRef = doc(db, "quiz", "start");
  await updateDoc(quizRef, {
    quizResult: deleteField()
  });
}


