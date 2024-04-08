'use client'
import { Button, Flex } from "antd";
import { setAskQuiz, sendAnswerCancel } from '@/redux/sliceQuiz'
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const ReadyForQuiz: React.FC = () => {
  const dispatch = useDispatch()
  //const [disabledButton, setDisabledButton] = useState('')

  const handleCancleQuiz = () => {
    dispatch(sendAnswerCancel())
    //setDisabledButton('disabled')
  }

  const handleOkQuiz = () => {
    //dispatch(sendAnswerCancel())
  }

  return (
    <Flex gap="middle" vertical align="center" className="bg-slate-400 w-full py-4">
      <p className="">Would you like to take part in the quiz?</p>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" onClick={handleOkQuiz} >Ok</Button>
        <Button onClick={handleCancleQuiz} >Cancel</Button>
      </Flex>
    </Flex>
   
  );
};

export default ReadyForQuiz;
