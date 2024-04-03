export default interface IInitForChat {
    user: string,
    message: string,
    time: number,
}
export interface IInitForUsers {
    user: string,
    users: Array<string>,
}