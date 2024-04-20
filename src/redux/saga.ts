import { put, takeEvery } from 'redux-saga/effects';
import { setUser } from "@/redux/sliceUsers";
import { addNewMessage, addUserToChat, reloadToken, sendResult, setQuiz }  from '@/utils/firestore';
import IInitForChat, { ISendMessage, ISendResult } from '@/utils/constants'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth';


export default function* rootSaga() {
  yield watchClickSaga();
}

function* watchClickSaga() {
  yield takeEvery('SEND_MESSAGE_TO_CHAT', workerMessageToChat)
  //yield takeEvery(getMessagesToChat, workerGetMessageToChat)
  yield takeEvery(setUser, workerSetUser)
  yield takeEvery('ASK_ABOUT_QUIZ', workerSetAskQuiz)
  //yield takeEvery(getAskQuiz, workerGetAskQuiz)
  yield takeEvery('RELOAD', workerReload)
  yield takeEvery('SEND_RESULT', workerSendResult)
}

function* workerMessageToChat(data:PayloadAction<ISendMessage, string>) {
  console.log('workerMessageToChat', data);
  
  const {user, message} = data.payload
  yield addNewMessage({user, message})
}

export function* workerGetMessageToChat(obj:IInitForChat) {
  //console.log(obj);
  yield put({ type: 'getMessagesToChat', obj })
}

 function* workerSetUser(data:PayloadAction<string, string>){
  addUserToChat(data.payload)
  put({ type: 'setUser', data })
  yield
}

export function* workerSetAskQuiz(data:PayloadAction<string, string>) {
   console.log('workerSetAskQuiz-data',data);
   
  setQuiz(data.payload)
  //put({ type: 'quiz/addAskQuiz'})
  yield
}

export function* workerGetAskQuiz() {
  console.log('workerGetAskQuiz');
  yield
}

export function* workerReload() {
  const user:User | null = yield reloadToken()
  yield console.log('workerReload', user);
  
}

export function* workerSendResult(data:PayloadAction<ISendResult, string>) {
  console.log('workerGetAskQuiz');
  sendResult(data.payload)
  yield
}  