'use client'
import { getUseSelectorQuiz } from "@/redux/sliceQuiz";
import { getUser } from "@/redux/sliceUsers";
import { IQuestions } from "@/utils/constants";
import { Button, Progress, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const PlayToQuiz = () => {
  const [value, setValue] = useState(null);
  const [numQuestion, setNumQuestion] = useState(0)
  const [timer, setTimer] = useState<number>(0)
  const [stopTimer, setStopTimer] = useState<boolean>(true)
  const quiz:IQuestions[] | undefined = useSelector(getUseSelectorQuiz);
  const user:string = useSelector(getUser);
  const dispatch = useDispatch();
  let rightAnswer:number = 0

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let timeId:ReturnType<typeof setTimeout>
    if(timer < 100 && stopTimer) {
      timeId = setTimeout(setTimer, 1000, timer + 3.3)
    }
    
    return  ()=>{clearTimeout(timeId)}
  /* setTimeout (() => {
      setTimer(timer + 3.3)
      console.log(`timer ${timer} stopTimer ${stopTimer}`);
      if(timer > 15) setStopTimer(true)
      if(stopTimer) {
        console.log('stopInterval');
        clearInterval(saveInterval)
      }
    }, 1000) */
  }, [timer, stopTimer])

  const handleOk = ()=>{
    if (!quiz) throw 'No questions in the database';

    setStopTimer(false)

    if(value === quiz[numQuestion].r){
      rightAnswer++
    }
    if(numQuestion+1 !== quiz.length) {
      setNumQuestion(numQuestion+1)
      setTimer(0)
      setStopTimer(true)
    }else{
      dispatch({type:'SEND_RESULT', payload:{rightAnswer, user}})
    }
  }

  if(!quiz) return (<div>Loading...</div>)

  return (
    <div>
      <p>{quiz[numQuestion].q}</p>
      <Progress percent={Math.round(timer)} />
      <Radio.Group onChange={onChange} >
        <Radio value={1}>{quiz[numQuestion].a1}</Radio>
        <Radio value={2}>{quiz[numQuestion].a2}</Radio>
        <Radio value={3}>{quiz[numQuestion].a3}</Radio>
        <Radio value={4}>{quiz[numQuestion].a4}</Radio>
      </Radio.Group>
      <Button onClick={handleOk}>Ok</Button>
    </div>
  );
}

export default PlayToQuiz;