import { call, put, takeEvery } from 'redux-saga/effects';
import { getAllMessages, setMessageToChat, getMessagesToChat } from "@/redux/sliceChat";
import { setUser } from "@/redux/sliceUsers";
import { getAskQuiz, setAskQuiz } from  "@/redux/sliceQuiz"
import { getAllMessages as getAllMessagesFirestore, addNewMessage, addUserToChat, setQuiz }  from '@/utils/firestore';
import IInitForChat from '@/utils/constants'
import type { PayloadAction } from '@reduxjs/toolkit'


export default function* rootSaga() {
  console.log('Worker saga is running');
  yield watchClickSaga();
}

function* watchClickSaga() {
  //yield takeEvery(getAllMessages, fetchAllMessages)
  yield takeEvery(setMessageToChat, workerMessageToChat)
  yield takeEvery(getMessagesToChat, workerGetMessageToChat)
  yield takeEvery(setUser, workerSetUser)
  yield takeEvery(setAskQuiz, workerSetAskQuiz)
  yield takeEvery(getAskQuiz, workerGetAskQuiz)
}

function* fetchAllMessages(){
  console.log('fetchAllMessages');
  //const messages = yield getAllMessagesFirestore()
  yield
}

function* workerMessageToChat(data:any) {
  const {user, message} = data.payload
  yield addNewMessage({user, message})
}

export function* workerGetMessageToChat(obj:IInitForChat) {
  //console.log(obj);
  yield put({ type: 'getMessagesToChat', obj })
}

 function* workerSetUser(data:PayloadAction){
  addUserToChat(data.payload)
  put({ type: 'setUser', data })
  yield
}

export function* workerSetAskQuiz() {
  setQuiz()
  //put({ type: 'quiz/addAskQuiz'})
  yield
}

export function* workerGetAskQuiz() {
  console.log('workerGetAskQuiz');
  yield
}