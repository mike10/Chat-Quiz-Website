// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, OAuthCredential, User, UserCredential, getAuth, getRedirectResult, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import IInitForChat, {ISendMessage, ISendResult} from '@/utils/constants'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion, onSnapshot, getDoc, query, where, getDocs, arrayRemove, deleteField, limit, deleteDoc } from "firebase/firestore";
import { getMessagesToChat } from '@/redux/sliceChat'
import { addUser, getAllUsers, removeUser } from '@/redux/sliceUsers'
import { getAskQuiz, setPlayToQuiz, setQuizResult } from '@/redux/sliceQuiz'
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
const auth = getAuth(app);
const db = getFirestore(app);

export const userSign = async (dispatch:AppDispatch) => {
  const provider = await new GoogleAuthProvider();
  console.log(auth);
  
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    if (user.displayName){
      dispatch({type: 'AUTH_USER', payload:user.displayName})
    }
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

}

export const userAuth = async (dispatch:AppDispatch) => {
  console.log(auth);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({ type: 'AUTH_USER', payload: user.displayName })
    } else {
      console.log('connecting was lost');
    }
  }); 
}

export const getMessagesFromChat = (dispatch:AppDispatch)=>{
  const q = query(collection(db, "chat"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        dispatch(getMessagesToChat(change.doc.data()))
      }
    });
  });
  return unsubscribe
}

export const getUsers = (dispatch:AppDispatch) => {
  const unsubscribe = onSnapshot(
    collection(db, "users"), 
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New user: ", change.doc.id, change.doc.data());
          dispatch(addUser(change.doc.id))
        }
        if (change.type === "modified") {
          console.log("Modified user: ", change.doc.id, change.doc.data());
          dispatch(setQuizResult(
            {
              rightAnswer: change.doc.data().quizResult,
              user: change.doc.id
            }))
        }
        if (change.type === "removed") {
          console.log("Removed user: ", change.doc.id, change.doc.data());
          dispatch(removeUser(change.doc.id))
        }
      });
    },
    (error) => {
      console.log(error);
    });
  return ()=>{
    unsubscribe()
  }
}

export const getQuiz = (dispatch:AppDispatch) => {
  const q = query(collection(db, "quiz" ),  where("time", ">", Date.now()-30*1000));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      dispatch(getAskQuiz(doc.data()))
    });
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
    console.log('delete user', quitUser);
    if(quitUser) await deleteDoc(doc(db, "users", quitUser ));
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const addUserToChat = async (newUser:string) => {
  await setDoc(doc(db, "users", newUser), {quiz:''});
  
}

export const sendResult = async (data:ISendResult) => {
  console.log('sendResult', data);
  await setDoc(doc(db, "users", data.user), { quizResult: data.rightAnswer });
}

export const setQuiz = async (user:string) => {
  const time:number = Date.now()
  await setDoc(doc(db, "quiz", "start"), {
    name: "quiz",
    time,
    user,
    questions: [
      {q:'Question 1', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 2},
      {q:'Question 2', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 1},
      {q:'Question 3', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 4},
      {q:'Question 4', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 3},
      {q:'Question 5', a1:'Answer 1', a2: 'Answer 2', a3: 'Answer 3', a4:'Answer 4', r: 1}  
    ]
  });

  /* const quizRef = doc(db, "quiz", "start");
  await updateDoc(quizRef, {
    quizResult: deleteField()
  }); */
}


