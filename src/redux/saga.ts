import { put, takeEvery } from 'redux-saga/effects';
import { getAllMessages, setMessageToChat, getMessagesToChat } from "@/redux/sliceChat";
import { getAllMessages as getAllMessagesFirestore, addNewMessage }  from '@/utils/firestore';
import IInitForChat from '@/utils/constants'

export default function* rootSaga() {
  console.log('Worker saga is running');
  yield watchClickSaga();
}

function* watchClickSaga() {
  yield takeEvery(getAllMessages, fetchAllMessages)
  yield takeEvery(setMessageToChat, workerMessageToChat)
  yield takeEvery(getMessagesToChat, workerGetMessageToChat)
}

function* fetchAllMessages(){
  console.log('fetchAllMessages');
  //const messages = yield getAllMessagesFirestore()
}

function* workerMessageToChat(data:any) {
  console.log(data.payload);
  
  yield addNewMessage({user: 'unknown', message:data.payload})
}

export function* workerGetMessageToChat(obj:IInitForChat) {
  console.log(obj);
  
  yield put({ type: 'getMessagesToChat', obj })
}