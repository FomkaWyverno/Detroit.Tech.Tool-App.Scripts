

export class LocalizationSheetKey {
    constructor(
        private readonly indexStartRow: number,
        private readonly indexEndColumn: number,
        private readonly indexEndRow: number,
        private readonly containerId: number,
        private readonly key: string,
    ) {}
}


// Builder для LocalizationSheetKey
export class LocalizationSheetKeyBuilder {
    private indexStartRow: number = 0;
    private indexEndColumn: number = 0;
    private indexEndRow: number = 0;
    private containerId: number = 0;
    private key: string = '';

    setIndexStartRow(indexStartRow: number): LocalizationSheetKeyBuilder {
        this.indexStartRow = indexStartRow;
        return this;
    }

    setIndexEndColumn(indexEndColumn: number): LocalizationSheetKeyBuilder {
        this.indexEndColumn = indexEndColumn;
        return this;
    }

    setIndexEndRow(indexEndRow: number): LocalizationSheetKeyBuilder {
        this.indexEndRow = indexEndRow;
        return this;
    }

    setContainerId(containerId: number): LocalizationSheetKeyBuilder {
        this.containerId = containerId;
        return this;
    }

    setKey(key: string): LocalizationSheetKeyBuilder {
        this.key = key;
        return this;
    }

    build(): LocalizationSheetKey {
        // Перевірка, чи всі необхідні поля заповнені
        if (this.indexStartRow === 0 || this.indexEndColumn === 0 || this.indexEndRow === 0 || this.containerId === 0 || !this.key) {
            throw new Error("All fields must be set before building the LocalizationSheetKey.");
        }

        return new LocalizationSheetKey(
            this.indexStartRow,
            this.indexEndColumn,
            this.indexEndRow,
            this.containerId,
            this.key
        );
    }
}