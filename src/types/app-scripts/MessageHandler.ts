export interface MessageHandler<T> {
    resolve: (result: T) => void,
    reject: (error: string) => void
}