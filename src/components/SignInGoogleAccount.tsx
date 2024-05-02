'use client'
import { signInWithPopup, GoogleAuthProvider, OAuthCredential, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userAuth, userSign} from '@/utils/firestore'
import styled from "styled-components";
import { useRouter } from 'next/navigation'
import { getSelectorUser, setUser } from "@/redux/sliceUsers";
import { useEffect } from "react";


const SignInGoogleAccount = () => {

  const user = useSelector(getSelectorUser);
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

  useEffect(() => {
    const auth = getAuth()
    if (!user && auth) {
      userAuth(dispatch)
    } else if(user) router.push('/main')
  }, [user]);

  const handleGoogle = async () => {
    userSign(dispatch)
  }

    return (
       <Button onClick={handleGoogle} type="button">Sign In Google Account</Button>     
    )
}

export default SignInGoogleAccount;