declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare module '*.ogg' {
    const src: string;
    export default src;
}

declare module '*.mp3' {
    const src: string;
    export default src;
}