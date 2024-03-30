'use client'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from '@/utils/firestore'
import styled from "styled-components";

const SignInGoogleAccount = () => {

    const Button = styled.button`
        color: #fff;
        background-color: green;
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 1px solid #000;
        border-radius: 10px;
        `;
    
    // Get auth instance
    

    /* signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }); */

    const handleGoogle = async () => {
        const provider = await new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    return (
       <Button onClick={handleGoogle} type="button">Sign In Google Account</Button>     
    )
}

export default SignInGoogleAccount;