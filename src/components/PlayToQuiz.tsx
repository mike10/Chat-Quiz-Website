'use client'
import { getSelectorQuizName, getSelectorQuizQuestions, setPlayToQuiz } from "@/redux/sliceQuiz";
import { getSelectorUser } from "@/redux/sliceUsers";
import { IQuestions } from "@/utils/constants";
import { Button, Progress, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const PlayToQuiz = () => {
  const [value, setValue] = useState(null);
  const [numQuestion, setNumQuestion] = useState(0)
  const [timer, setTimer] = useState<number>(0)
  const [stopTimer, setStopTimer] = useState<boolean>(true)
  const [countRightAnswers, setCountRightAnswers] = useState<number>(0)
  const questions:IQuestions[] | undefined = useSelector(getSelectorQuizQuestions);
  const user:string = useSelector(getSelectorUser);
  const dispatch = useDispatch();
 

  const handleChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let timeId:ReturnType<typeof setTimeout>
    if(timer < 100 && stopTimer) {
      timeId = setTimeout(setTimer, 1000, timer + 3.3)
    }
    if(timer > 100) {
      handleOk()
    }
    return  ()=>{clearTimeout(timeId)}
  }, [timer, stopTimer])

   
  const handleOk = ()=>{
    //if (!questions) console.log( 'No questions in the database');
    const rAnsw:number = questions[numQuestion].r
    const length:number = questions.length

    setStopTimer(false);

    if (value === rAnsw) {
      console.log(countRightAnswers);
      
      setCountRightAnswers(countRightAnswers + 1);
      console.log("rightAnswer", countRightAnswers);
    } 

    if (numQuestion !== length-1) {
      setNumQuestion(numQuestion + 1);
      setTimer(0);
      setStopTimer(true);
    } else {
      dispatch({ type: "SEND_RESULT", payload: { rightAnswer: value === rAnsw ? countRightAnswers + 1 : countRightAnswers, user } });
    }
  }

  if(!questions) return (<div>Loading...</div>)

  return ( 
   
    <div>
      <p>{questions[numQuestion].q}</p>
      <Progress percent={Math.round(timer)} />
      <p>Counts Right Antvorted {countRightAnswers}</p>
      <Radio.Group onChange={handleChange} > 
        <Radio value={1}>{questions[numQuestion].a1}</Radio>
        <Radio value={2}>{questions[numQuestion].a2}</Radio>
        <Radio value={3}>{questions[numQuestion].a3}</Radio>
        <Radio value={4}>{questions[numQuestion].a4}</Radio>
      </Radio.Group>
      <Button onClick={()=>{handleOk()}}>Ok</Button>
    </div>
  );
}

export default PlayToQuiz;

