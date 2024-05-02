import { call, put, takeEvery } from 'redux-saga/effects';
import { setUser } from "@/redux/sliceUsers";
import { addNewMessage, addUserToChat, sendResult, setQuiz }  from '@/utils/firestore';
import IInitForChat, { ISendMessage, ISendResult } from '@/utils/constants'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth';
import { setPlayToQuiz, setReadyQuizResult } from './sliceQuiz';


export default function* rootSaga() {
  yield watchClickSaga();
}

function* watchClickSaga() {
  yield takeEvery('AUTH_USER', workerAuthUser)
  yield takeEvery('SEND_MESSAGE_TO_CHAT', workerMessageToChat)
  yield takeEvery('ASK_ABOUT_QUIZ', workerSetAskQuiz)
  yield takeEvery('SEND_RESULT', workerSendResult)
}

function* workerAuthUser(data:PayloadAction<string, string>){
  addUserToChat(data.payload)
  yield put({type: 'users/setUser', payload: data.payload})
}

function* workerMessageToChat(data:PayloadAction<ISendMessage, string>) {
  const {user, message} = data.payload
  yield addNewMessage({user, message})
}

export function* workerSetAskQuiz(data:PayloadAction<string, string>) {
  console.log('workerSetAskQuiz-data',data);
  yield setQuiz(data.payload)
}

/* export function* workerGetMessageToChat(obj:IInitForChat) {
  //console.log(obj);
  //yield put({ type: 'getMessagesToChat', obj })
} */

export function* workerSendResult(data:PayloadAction<ISendResult, string>) {
  yield put(setReadyQuizResult(true))
  yield sendResult(data.payload)
  
}  