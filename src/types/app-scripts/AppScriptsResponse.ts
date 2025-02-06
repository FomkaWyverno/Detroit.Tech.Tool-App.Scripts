export interface AppScriptsResponse {
    messageId: string,
    functionName: string
}

export type AppScriptsResponseResult = AppScriptsResponse & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any
}

export type AppScriptsResponseError = AppScriptsResponse & {
    errorMessage: string
}