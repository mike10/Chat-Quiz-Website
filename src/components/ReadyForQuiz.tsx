'use client'
import { Button, Flex } from "antd";
import { getSelectorIsReadyQuizResult, getSelectorQuizIsPlay, getSelectorQuizResult, setPlayToQuiz, setQuizResult, setReadyQuizResult } from '@/redux/sliceQuiz'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import PlayToQuiz from "./PlayToQuiz";
import { ISendResult } from "@/utils/constants";

const ReadyForQuiz: React.FC = () => {
  const dispatch = useDispatch()
  //const [disabledButton, setDisabledButton] = useState('')
  
  //const isPlayQuiz:boolean = useSelector(getSelectorQuizIsPlay)
  const isReadyQuizResult:boolean = useSelector(getSelectorIsReadyQuizResult)
  const quizResult:ISendResult[] = useSelector(getSelectorQuizResult)

  const [showForm, setShowForm] = useState<string>('showChoise')

  useEffect(()=>{
    if(isReadyQuizResult) setShowForm('showResult')
  }, [isReadyQuizResult])

  

  const handleCancleQuiz = () => {
    setShowForm('showNothing')
    dispatch(setPlayToQuiz(false))
    dispatch(setReadyQuizResult(false))
  }

  const handleOkQuiz = () => {
    dispatch(setPlayToQuiz(true))
    setShowForm( 'showPlay' )
  }

  return (
    <Flex
      gap="middle"
      vertical
      align="center"
      className="bg-slate-400 w-full py-4"
    >
      {showForm === 'showChoise' ? (
        <div>
          <p>Would you like to take part in the quiz?</p>
          <Flex gap="small" wrap="wrap">
            <Button type="primary" onClick={handleOkQuiz}>Ok</Button>
            <Button onClick={handleCancleQuiz}>Cancel</Button>
          </Flex>
        </div>
      ) : null}

      {showForm === "showPlay" ? <PlayToQuiz />  : null}

      {showForm === "showResult" /*  && quizResult !== undefined */ ? (
        <div >
          {quizResult.map((item, index)=>{
            return <div key={index}>
              <p>{item.user}</p>
              <div>{`scored ${item.rightAnswer} points`}</div>
              
            </div>
          })}
          <Button onClick={handleCancleQuiz}>Ok</Button>
        </div>
      ) : null}
      {/* {showForm === "showResult" ? null : null}  */} 
    </Flex>
  );
};

export default ReadyForQuiz;
