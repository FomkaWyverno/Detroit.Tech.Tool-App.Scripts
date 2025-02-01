import { Range } from './../sheet/Range';


export class LocalizationSheetKey {
    constructor(
        public readonly locationKey: Range,
        public readonly containerId: number,
        public readonly key: string,
    ) {}
}