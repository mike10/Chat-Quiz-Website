'use client'
import { Button, Flex } from "antd";
import { getQuizResult } from '@/redux/sliceQuiz'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import PlayToQuiz from "./PlayToQuiz";
import { ISendResult } from "@/utils/constants";

const ReadyForQuiz: React.FC = () => {
  const dispatch = useDispatch()
  //const [disabledButton, setDisabledButton] = useState('')

  const quizResult:ISendResult[] | undefined = useSelector(getQuizResult)

  const [showForm, setShowForm] = useState<string>('showChoise')

  /* const [stateForm, setStateForm] = useReducer((state:{showChoise:string, showPlay:string}, action:{type:string, payload:{showChoise:string, showPlay:string}})=>{
    switch (action.type){
      case 'showChoise': return { showChoise:'block', showPlay: 'hidden'  }
      case 'showPlay': return { showChoise:'hidden', showPlay:'block'  }
      //case 'result': return { showChoise:'hidden', showPlay:'block'  }
    }
  }, { showChoise:'block', showPlay: 'hidden' }); */

  useEffect(()=>{
    if(quizResult) setShowForm('showResult')
  }, [quizResult])

  const handleCancleQuiz = () => {
    //dispatch(sendAnswerCancel())
    //setDisabledButton('disabled')
  }

  const handleOkQuiz = () => {
    //dispatch(sendAnswerCancel())
    //setStateForm( { type : 'showPlay'} )
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
            <Button type="primary" onClick={handleOkQuiz}>
              Ok
            </Button>
            <Button onClick={handleCancleQuiz}>Cancel</Button>
          </Flex>
        </div>
      ) : null}

      {showForm === "showPlay" ? (
        <div /* className={stateForm?.showPlay} */>
          <PlayToQuiz />
        </div>
      ) : null}

      {showForm === "showResult"  && quizResult !== undefined ? (
        <div /* className={stateForm?.showPlay} */>
          {quizResult}
        </div>
      ) : null}
    </Flex>
  );
};

export default ReadyForQuiz;
