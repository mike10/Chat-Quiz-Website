'use client'
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, OAuthCredential } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {auth} from '@/utils/firestore'
import styled from "styled-components";
import {addUserToChat} from '@/utils/firestore'
import { useRouter } from 'next/navigation'
import { setUser } from "@/redux/sliceUsers";
import { useEffect } from "react";


const SignInGoogleAccount = () => {

  const dispatch = useDispatch();

  const router = useRouter()

  const Button = styled.button`
      color: #fff;
      background-color: green;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 1px solid #000;
      border-radius: 10px;
      `;

  const handleGoogle = async () => {
      const provider = await new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        if(!credential) throw 'Can´t get connect with Google'
        let token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user.displayName){
          //addUserToChat(user.displayName)
          localStorage.setItem('user', user.displayName);
          router.push('/main')
          //dispatch(getAllMessages())
          dispatch(setUser(user.displayName))
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

    return (
       <Button onClick={handleGoogle} type="button">Sign In Google Account</Button>     
    )
}

export default SignInGoogleAccount;