'use client'
import { useSelector, useDispatch } from "react-redux";
import { getUseSelectorQuiz } from  "@/redux/sliceQuiz"
import { Button, Divider, Flex } from "antd";
import { Input } from 'antd';
import {getMessagesFromChat, getUsers, getQuiz, quitUser, reloadToken} from '@/utils/firestore'
import { LegacyRef, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import IInitForChat, { IQuestions } from '@/utils/constants'
import ReadyForQuiz from "./ReadyForQuiz";
import Message from "./Message";
import { getUser, setUser } from "@/redux/sliceUsers";
import { getChat } from "@/redux/sliceChat";
import { GoogleAuthProvider, OAuthCredential, User, UserInfo, getAuth, getRedirectResult, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithRedirect } from "firebase/auth";
const { TextArea } = Input;

const Chat: React.FC = () => {
  const messages = useSelector(getChat);
  const user = useSelector(getUser);
  const quiz:IQuestions[] | undefined = useSelector(getUseSelectorQuiz);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [isQuiz, setIsQuiz] = useState<boolean>(false)
  const ref= useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const unscribe1 = getMessagesFromChat(dispatch)
    const unscribe2 = getUsers(dispatch)
    const unscribe3 = getQuiz(dispatch)
    return () => {
      unscribe1()
      //unscribe2()
      unscribe3()
      quitUser(user)
    };
  }, [])
  
  useEffect(() => {
    if (!user) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user.displayName))
        } else {
          throw 'connecting was lost'
        }
      });
      
    }
      //dispatch({type:'RELOAD'}) 
  }, [user]);
  
  useEffect(()=>{
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages])
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleMessage = () => {
    if(message) dispatch({type:'SEND_MESSAGE_TO_CHAT', payload:{user, message}})
  }

  const handleQuiz = () => {
    //dispatch(setAskQuiz({user}))
    dispatch({type: 'ASK_ABOUT_QUIZ', payload: user})
  }

  return (
    <Flex align="center" justify="center" vertical>
      <Flex
        align="center"
        justify="center"
        style={{ width: "50%", borderRadius: 6, border: "1px solid #40a9ff" }}
        vertical
      >
        <Divider>Main Chat</Divider>
        
        <div
          ref={ref}
          style={{ width: "100%", height: "500px", overflow: "scroll" }}
        >
          
          {messages.map((item: IInitForChat, index: number) => <Message {...item} />)}
          {quiz ? <ReadyForQuiz/> : ''}
        </div>
        
        <TextArea
          placeholder="input your message"
          allowClear
          onChange={onChange}
        />
        <Flex justify='space-around' style={{width:'100%'}}>
          <Button type="primary" onClick={handleQuiz}>Quiz</Button>
          <Button type="primary" onClick={handleMessage}>Message</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Chat;