'use client'
import { useSelector, useDispatch } from "react-redux";
import {setMessageToChat} from '@/redux/sliceChat'
import { setAskQuiz } from  "@/redux/sliceQuiz"
import { Button, Divider, Flex } from "antd";
import { Input } from 'antd';
import {getMessagesFromChat, getUsers, getQuiz, quitUser} from '@/utils/firestore'
import { FunctionComponent, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import IInitForChat from '@/utils/constants'
import ReadyForQuiz from "./ReadyForQuiz";
import Message from "./Message";
import styled from "styled-components";
import { setUser } from "@/redux/sliceUsers";
const { TextArea } = Input;

const Chat: React.FC = () => {
  const messages = useSelector(store => store?.chat);
  const user = useSelector(store => store?.users?.user);
  const quiz = useSelector(store => store?.quiz);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [isQuiz, setIsQuiz] = useState()
  const ref = useRef(null);

  useMemo(() => {
    console.log('useMemo quiz', quiz, isQuiz);
  }, [quiz]);

  useEffect(()=>{
    if(!user){
      const user = localStorage.getItem('user')
      dispatch(setUser(user))
    }
    
    const unscribe1 = getMessagesFromChat(dispatch)
    const unscribe2 = getUsers(dispatch)
    const unscribe3 = getQuiz(dispatch)
    return () => {
      unscribe1()
      unscribe2()
      //unscribe3()
      quitUser(user)
    };
  }, []) 
  
  useEffect(()=>{
    ref.current.scrollTop = ref.current.scrollHeight
  }, [messages])   

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleMessage = () => {
    if(message) dispatch(setMessageToChat({user, message}))
  }

  const handleQuiz = () => {
    dispatch(setAskQuiz())
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
          {quiz ? <ReadyForQuiz/> : null}
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