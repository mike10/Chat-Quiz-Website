export default interface IInitForChat {
    user: string,
    message: string,
    time: number,
}
export interface IInitForUsers {
    user: string,
    users: Array<string>,
}

export interface ISendMessage {
    user: string,
    message: string,
}

export interface IQuiz {
    name:string,
    time:number,
    user:string,
    quiz?:IQuestions[],
    quizResult?:ISendResult[]
}

export interface IQuestions {
    q: string,
    a1:string,
    a2:string,
    a3:string,
    a4:string,
    r:number
}

export interface ISendResult {
    rightAnswer: string,
    user: string
}