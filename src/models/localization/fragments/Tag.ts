export class Tag {
    public readonly tagStr: string;
    constructor(
        tagStr: string,
        public readonly startIndex: number,
        public readonly endIndex: number
    ) {
        this.tagStr = this.escapeChars(tagStr);
    }

    private escapeChars(string: string): string {
        return string.replaceAll(' ', '\\S')
                .replaceAll('\n', '\\n')
                .replaceAll('\r','\\r');
    }
}
