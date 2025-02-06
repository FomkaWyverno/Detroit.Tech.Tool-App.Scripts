export interface AppScriptsMessage {
    messageId: string,
    functionName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any[]
}