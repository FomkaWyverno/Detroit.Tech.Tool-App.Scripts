export interface LocalizationText {
    text: string,
    hasLink: boolean,
    linkExists: boolean
}

export type ContainerLocalization = Record<string, LocalizationText>;
export type LocalizationData = Record<string, ContainerLocalization>;

