'use client'
import { useSelector, useDispatch } from "react-redux";
import {setMessageToChat} from '@/redux/sliceChat'
import { setAskQuiz } from  "@/redux/sliceQuiz"
import { Button, Divider, Flex } from "antd";
import { Input } from 'antd';
import {getMessagesFromChat, getUsers, getQuiz, quitUser} from '@/utils/firestore'
import { useEffect, useMemo, useRef, useState } from "react";
import IInitForChat from '@/utils/constants'
import ReadyForQuiz from "./ReadyForQuiz";
import styled from "styled-components";
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
    
    //setIsQuiz(quiz)
  }, [quiz]);


  /* const Display = styled.div`
    width: 100%;
    height: 500px;
    overflow: scroll;
  `; */

  useEffect(()=>{
    const unscribe1 = getMessagesFromChat(dispatch)
    const unscribe2 = getUsers(dispatch)
    const unscribe3 = getQuiz(dispatch)
    return () => {
      unscribe1()
      unscribe2()
      unscribe3()
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
          
          
          {messages.map((item: IInitForChat, index: number) => {
            const time = new Date(item.time);
            return (
              <div key={index}>
                <p>
                  
                  <span className="text-xs bg-lime-700 rounded px-1">{item.user}</span>
                  <span style={{fontSize: '8px', backgroundColor: '#EDAAC0', color: '#fff', borderRadius: '4px', padding: '1px 5px', lineHeight: '100%'}}>
                    {time.getHours() < 10 ? '0'+time.getHours():time.getHours()}{':'}
                    {time.getMinutes() < 10 ? '0'+time.getMinutes():time.getMinutes()}{':'}
                    {time.getSeconds()  < 10 ? '0'+time.getSeconds():time.getSeconds()}
                  </span>
                </p>
                
                <div style={{fontSize: '12px', fontWeight: '500', backgroundColor: '#EEE',borderRadius: '4px'}}>{item.message}</div>
              </div>
            );
          })}
          {quiz != isQuiz ? <ReadyForQuiz/> : 'null'}
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