export class BaseLocalizationKey {
    private static readonly patternVoiceKey = /.+?_.+?_.+?_.+?_(.+?)_.+/;

    public readonly voiceCode: string | null;
    constructor(
        public readonly containerId: number,
        public readonly key: string,
        public readonly isVoice: boolean
    ) {
        this.voiceCode = this.getVoiceCode();
    }

    /**
     * @returns Повертає унікальний індифікатор ключа який складається з контейнера та ключа локалізації, через крапку 
     */
    public getUniquiKey(): string {
        return `${this.containerId}.${this.key}`;
    }

    /**
    * Повертає голосовий ключ (voiceKey) цього ключа локалізації.
    * Очікується, що ключ має формат: `metaText_metaText_metaText_metaText_VOICE-KEY_metaText`.
    * Приклад: X0101X_TERRACE_PARTI_PC_X01CONNOR_TRUTH0101V2 - Результат: X01CONNOR
    * 
    * Якщо цей ключ не є голосовим локалізаційним ключем, поверне NULL
    * @returns Повертає голосовий ключ або `null`, якщо формат ключа не відповідає очікуваному, або це є текстовим локалізаційним ключем.
    */
   protected getVoiceCode(): string | null {
       if (!this.isVoice) return null;
       const matches = BaseLocalizationKey.patternVoiceKey.exec(this.key);
       if (matches) return matches[1];
       return null;
   }
}