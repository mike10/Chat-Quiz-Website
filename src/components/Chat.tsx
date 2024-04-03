'use client'
import { useSelector, useDispatch } from "react-redux";
import {setMessageToChat} from '@/redux/sliceChat'
import { Button, Divider, Flex } from "antd";
import { Input } from 'antd';
import {getMessagesFromChat, getUsers} from '@/utils/firestore'
import { useEffect, useState } from "react";
import IInitForChat from '@/utils/constants'
import styled from "styled-components";
const { TextArea } = Input;

const Chat: React.FC = () => {
  const messages = useSelector(store => store?.chat);
  const user = useSelector(store => store?.users?.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  
  /* const Display = styled.div`
    width: 100%;
    height: 500px;
    overflow: scroll;
  `; */

  useEffect(()=>{
    getMessagesFromChat(dispatch)
    getUsers(dispatch)
  }, [])  

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    dispatch(setMessageToChat({user, message}))
  }

  return (
    <Flex align="center" justify="center" vertical>
      <Flex
        align="center"
        justify="center"
        style={{ width: '50%', borderRadius: 6, border: "1px solid #40a9ff" }}
        vertical
      >
        <Divider>Main Chat</Divider>
        <div style={{width: '100%', height: '500px', overflow: 'scroll'}}>
          {messages.map((item:IInitForChat, index:number)=> {
            const time = new Date(item.time)
            return <div key={index}>
              <p>{item.user} <span>{time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()}</span> </p>
              <div>{item.message}</div>
            </div>
            
          } )}
        </div>
        <TextArea
          placeholder="input your message"
          allowClear
          onChange={onChange}
        />
        <Button type="primary" onClick={handleClick}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
}

export default Chat;