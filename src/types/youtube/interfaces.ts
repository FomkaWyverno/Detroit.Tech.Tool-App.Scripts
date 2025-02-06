export interface ObjectArgsVideoId {
    videoId: string, // Обов'язкове поле. Айді Відео
    startSeconds?: number, // Не обов'язкове поле. З якого моменту почати відео
    endSeconds?: number // Не обов'язкове поле. На якому моменті відео має закінчитись
}

export interface ObjectArgsVideoUrl {
    mediaContentUrl: string,
    startSeconds?: number,
    endSeconds?: number
}

export interface ObjectArgsPlaylist {
    listType?: string,
    list: string,
    index: number,
    startSeconds: number
}

export interface YouTubeVideoPlayer {

    
    /**
     * Синтаксис аргументів
     * -----------------------------------------------------------------------------------------------------------------------
     * Завантажує відео у відео-плеер за допомогою VideoId відео, приймає вториним аргументом startSeconds, де почати відео
     * @param videoId Обов'язковий параметр. Айді відео яке потрібно завантажити у відео плеер.
     * @param startSeconds Не обов'язковий параметр, початок відтворення відео
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=be%20in%20effect.-,loadVideoById,-Argument%20syntax
     */
    loadVideoById(videoId: string, startSeconds: number): void

    /**
     * Синтаксис агрументів як об'єкту, має більше параметрів ніж у синтаксу з аргументів.
     * -----------------------------------------------------------------------------------------------------------------------
     * Завантажує відео у відео-плеер за допомогою VideoId відео
     * @param {ObjectArgsVideoId} objectArgsVideoId Обов'язковий параметр, об'єкт який має поля для завантаження відео
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=be%20in%20effect.-,loadVideoById,-Argument%20syntax
     */
    loadVideoById(objectArgsVideoId: ObjectArgsVideoId): void

    
    /**
     * Синтаксис аргументів
     * -----------------------------------------------------------------------------------------------------------------------
     * Завантажує відео у відео-плеер за допомогою URL відео.
     * @param {string} mediaContentUrl Обов'язковий параметр. Посилання на відео у форматі - http://www.youtube.com/v/VIDEO_ID?version=3
     * @param {?number} [startSeconds] Не обов'язковий параметр. Початок відтворення відео.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=be%20in%20effect.-,loadVideoByUrl,-Argument%20syntax
     */
    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number): void

    
    /**
     * Синтаксис аргументів як об'єкту, має більше параметрів ніж у синтаксу з аргументів.
     * -----------------------------------------------------------------------------------------------------------------------
     * @param {ObjectArgsVideoUrl} objectArgsVideoUrl Обов'язковий параметр, для завантаження відео у плеер.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=be%20in%20effect.-,loadVideoByUrl,-Argument%20syntax
     */
    loadVideoByUrl(objectArgsVideoUrl: ObjectArgsVideoUrl): void

    /**
     * Синтаксис аргументів
     * -----------------------------------------------------------------------------------------------------------------------
     * Ця функція завантажує мініатюру вказаного відео і готує плеєр до відтворення відео. Плеер не просить FLV викликати playVideo() або seekTo().
     * @param {string} videoId Обов'язковий параметр. Айді відео яке потрібно завантажити у відео плеер.
     * @param {?number} startSeconds Не обов'язковий параметр, початок відтворення відео
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=functions%20for%20videos-,cueVideoById,-Argument%20syntax
     */
    cueVideoById(videoId: string, startSeconds?: number): void

    /**
     * Синтаксис аргументів як об'єкту, має більше параметрів ніж у синтаксу з аргументів.
     * -----------------------------------------------------------------------------------------------------------------------
     * Ця функція завантажує мініатюру вказаного відео і готує плеєр до відтворення відео. Плеер не просить FLV викликати playVideo() або seekTo().
     * @param ObjectArgsVideoId Обов'язковий параметр, об'єкт який має поля для завантаження відео
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=functions%20for%20videos-,cueVideoById,-Argument%20syntax
     */
    cueVideoById(objectArgsVideoId: ObjectArgsVideoId): void

    /**
     * Синтаксис аргументів
     * -----------------------------------------------------------------------------------------------------------------------
     * Ця функція завантажує мініатюру вказаного відео і готує плеєр до відтворення відео. Плеер не просить FLV викликати playVideo() або seekTo().
     * @param mediaContentUrl Обов'язковий параметр. Посилання на відео у форматі `http://www.youtube.com/v/VIDEO_ID?version=3`
     * @param startSeconds Не обов'язковий параметр, початок відтворення відео
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=the%20specified%20time.-,cueVideoByUrl,-Argument%20syntax
     */
    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number): void

    /**
     * Синтаксис аргументів як об'єкту, має більше параметрів ніж у синтаксу з аргументів.
     * -----------------------------------------------------------------------------------------------------------------------
     * Ця функція завантажує мініатюру вказаного відео і готує плеєр до відтворення відео. Плеер не просить FLV викликати playVideo() або seekTo().
     * @param objectArgsVideoUrl Обов'язковий параметр, для підготовки та завантаження відео у плеер.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=the%20specified%20time.-,cueVideoByUrl,-Argument%20syntax
     */
    cueVideoByUrl(objectArgsVideoUrl: ObjectArgsVideoUrl): void

    /**
     * Синтаксис аргументів
     * -----------------------------------------------------------------------------------------------------------------------
     * Ставить на чергу вказаний список відтворення. Коли плейлист буде позначений і готовий до відтворення, плеєр транслюватиме відео
     * @param playlist Обов'язковий параметр. Айді відео, або массив айді відео, які мають бути у плейлисті.
     * @param index Необов'язковий параметр. Індекс відео, з якого почати відтворювати плейлист, за замовчуванням 0, тобто перше відео плейлиста.
     * @param startSeconds Необов'язковий параметр. Вказує час з якого почати відтворювати перше відео у плейлисту, при виклику {@linkcode playVideo()}.
     * Якщо вказати значення startSeconds, а потім викликати {@linkcode seekTo()}, то програвач почне відтворення з часу, вказаного у виклику {@linkcode seekTo()}.
     * Якщо вказати список відтворення, а потім викликати функцію {@linkcode playVideoAt()}, то плеер почне відтворення з початку вказаного відео.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=are%20documented%20below.-,cuePlaylist,-Argument%20syntax
     */
    cuePlaylist(playlist: string | Array<string>, index?: number, startSeconds?: number): void

    /**
     * Синтаксис аргументів як об'єкту, має більше параметрів ніж у синтаксу з аргументів.
     * -----------------------------------------------------------------------------------------------------------------------
     * Ставить на чергу вказаний список відтворення. Коли плейлист буде позначений і готовий до відтворення, плеєр транслюватиме відео
     * @param objectArgsPlaylist Обов'язковий параметр. Об'єкт складається з аргументів для підготовки плейлиста.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=are%20documented%20below.-,cuePlaylist,-Argument%20syntax
     */
    cuePlaylist(objectArgsPlaylist: ObjectArgsPlaylist): void

    
    /**
     * Синтаксис аргументів
     * -----------------------------------------------------------------------------------------------------------------------
     * Ця функція завантажує вказаний плейлист і відтворює його.
     * @param {(string | Array<string>)} playlist Обов'язковий параметр. Айді відео, або массив айді відео, які мають бути у плейлисті.
     * @param {?number} index Необов'язковий параметр. Індекс відео, з якого почати відтворювати плейлист, за замовчуванням 0, тобто перше відео плейлиста.
     * @param {?number} startSeconds Необов'язковий параметр. Вказує час з якого почати відтворювати перше відео у плейлисту, при виклику {@linkcode playVideo()}.
     * Якщо вказати значення startSeconds, а потім викликати {@linkcode seekTo()}, то програвач почне відтворення з часу, вказаного у виклику {@linkcode seekTo()}.
     * Якщо вказати список відтворення, а потім викликати функцію {@linkcode playVideoAt()}, то плеер почне відтворення з початку вказаного відео.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=the%20specified%20video.-,loadPlaylist,-Argument%20syntax
     */
    loadPlaylist(playlist: string | Array<string>, index?: number, startSeconds?: number): void

    /**
     * Синтаксис аргументів як об'єкту, має більше параметрів ніж у синтаксу з аргументів.
     * -----------------------------------------------------------------------------------------------------------------------
     * Ця функція завантажує вказаний плейлист і відтворює його.
     * @param objectArgsPlaylist Обов'язковий параметр. Об'єкт складається з аргументів для завантаженя плейлиста.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=the%20specified%20video.-,loadPlaylist,-Argument%20syntax
     */
    loadPlaylist(objectArgsPlaylist: ObjectArgsPlaylist): void


    
    /** 
     * Відтворює поточне відео. Кінцевим станом плеером після виконання цієї функції буде playing (1)
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.playVideo()%3AVoid
     */
    playVideo(): void

    /**
     * Ставить на паузу відео, що відтворюється в даний момент. Cтан плеера після виконання цієї функції буде поставлено на PAUSED (2),
     * якщо тільки плеер не перебуває у стані ENDED (0) під час виклику функції, у цьому випадку стан плеера не зміниться.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.pauseVideo()%3AVoid
     */
    pauseVideo(): void

    /**
     * Зупиняє та скасовує завантаження поточного відео.
     * Цю функцію слід зарезервувати для рідкісних ситуацій, коли ви знаєте, що користувач не буде переглядати додаткове відео у плеєрі.
     * Якщо ви маєте намір призупинити відео, вам слід просто викликати функцію {@linkcode pauseVideo()}.
     * Якщо ви хочете змінити відео, яке відтворюється у плеер, ви можете викликати одну з функцій постановки у чергу, не викликаючи спочатку {@linkcode stopVideo()}.
     * 
     * Важливо: На відміну від функції {@linkcode pauseVideo()}, яка залишає плеер у стані PAUSED (2), функція {@linkcode stopVideo()} може перевести плеер у будь-який стан,
     * у якому він не відтворюється, включаючи ENDED (0), PAUSED (2), CUED (5) або UNSTARTED (-1).
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.stopVideo()%3AVoid
     */
    stopVideo(): void

    /**
     * Перематує відео до вказаного часу. Якщо під час виклику функції плеер на паузі, він залишиться на паузі.
     * Якщо функцію викликати з іншого стану (PLAYING, CUED тощо), плеєр відтворить відео.
     * @param seconds вказує час в секундах до якого моменту потрібно перематати
     * @param allowSeekAhead визначає, чи буде плеєр робити новий запит до сервера, якщо параметр seconds вказує на час, що виходить за межі поточних буферизованих відеоданих.
     * Ми рекомендуємо встановити цей параметр у значення false, коли користувач перетягує мишу вздовж індикатора прогресу відео, а потім встановити його у значення true,
     * коли користувач відпускає мишу. Такий підхід дозволяє користувачеві переходити до різних точок відео без запиту нових відеопотоків, прокручуючи небуферизовані точки відео.
     * Коли користувач відпускає кнопку миші, програвач переходить до потрібної точки відео і запитує новий відеопотік, якщо це необхідно.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.seekTo(seconds%3ANumber%2C%20allowSeekAhead%3ABoolean)%3AVoid
     */
    seekTo(seconds: number, allowSeekAhead: boolean): void

    /**
     * Ця функція завантажує і відтворює наступне відео у плейлисту.
     * Якщо встановленно {@linkcode setLoop(loopPlaylists: boolean)} true, або користувач поставив зацикленість відео, тоді плеер завантажить та почне відтворювати перше відео у списку.
     * Якщо у плейлисті більше немає відео, й не встановлено циклічність, відео завершиться.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.nextVideo()%3AVoid
     */
    nextVideo(): void

    /**
     * Ця функція завантажує та відтворює попереднє відео у плейлисту
     * Якщо під час перегляду першого відео у плейлисту, а плейлист налаштовано на циклічність через {@linkcode setLoop(loopPlaylists: boolean)} true, або користувач поставив,
     * тоді плеер завантажить та почне відтворювати останнє відео у списку.
     * Якщо плейлист не налаштовано на циклічність, й відтворюється перше відео, тоді ця функція це відео перезавантажить.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.previousVideo()%3AVoid
     */
    previousVideo(): void

    /**
     * Завантажує та відтворює вказане по індексу відео з плейлиста.
     * 
     * @param index Вказує індекс відео, яке ви хочете відтворити у списку відтворення. Параметр використовує нульовий індекс, тому значення 0 визначає перше відео у списку.
     * Якщо ви перетасували список відтворення, ця функція відтворить відео у вказаній позиції у перетасованому списку відтворення.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.playVideoAt(index%3ANumber)%3AVoid
     */
    playVideoAt(index: number): void

    /**
     * Вимикає звук у плеера
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=the%20player%20volume-,player.mute()%3AVoid,-Mutes%20the%20player
     */
    mute(): void

    /**
     * Вмикає звук у плеера
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.unMute()%3AVoid
     */
    unMute(): void

    /**
     * Повертає true, якщо плеєр без звуку, false - якщо ні.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.isMuted()%3ABoolean
     */
    isMuted(): boolean

    /**
     * @param volume Встановлює гучність. Приймає ціле число від 0 до 100
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.setVolume(volume%3ANumber)%3AVoid
     */
    setVolume(volume: number): void

    /**
     * Повертає поточну гучність плеера, ціле число від 0 до 100.
     * Зауважте, що {@linkcode getVolume()} повертає гучність, навіть якщо плеер знаходиться в стані без звука {@linkcode isMuted()}.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getVolume()%3ANumber
     */
    getVolume(): number

    /**
     * Встановлює висоту да ширину iframe відео-плеера
     * @param width ширина у пікселях
     * @param height висота у пікселях
     * 
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.setSize(width%3ANumber%2C%20height%3ANumber)%3AObject
     */
    setSize(width: number, height: number): object

    /**
     * Ця функція повертає швидкість відтворення поточного відео.
     * За замовчуванням швидкість відтворення дорівнює 1, що означає, що відео відтворюється з нормальною швидкістю.
     * Швидкість відтворення може включати такі значення, як 0,25, 0,5, 1, 1,5 і 2
     * 
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getPlaybackRate()%3ANumber
     */
    getPlaybackRate(): number

    /**
     * Ця функція встановлює запропоновану швидкість відтворення поточного відео.
     * Якщо швидкість відтворення зміниться, вона зміниться лише для відео, яке вже є вже підготовлене до відтворення або відтворюється.
     * Якщо ви встановили швидкість відтворення для підготовленого відео, вона залишатиметься чинною, коли буде викликано функцію {@linkcode playVideo()}
     * або коли користувач ініціює відтворення безпосередньо за допомогою елементів керування плеера. Крім того, виклик функцій для синхронізації
     * або завантаження відео чи списків відтворення (cueVideoById, loadVideoById тощо) призведе до скидання швидкості відтворення до 1.
     * 
     * Виклик цієї функції не гарантує, що швидкість відтворення дійсно зміниться. Однак, якщо швидкість відтворення зміниться, відбудеться подія onPlaybackRateChange, 
     * і ваш код повинен реагувати на цю подію, а не на факт виклику функції {@linkcode setPlaybackRate(suggestedRate: number)}.
     * 
     * Метод {@linkcode getAvailablePlaybackRates()} поверне можливі швидкості відтворення для поточного відео.
     * Однак, якщо ви задасте параметру suggestedRate непідтримуване ціле значення або значення з плаваючою комою,
     * плеєр округлить це значення до найближчого підтримуваного значення у напрямку 1.
     * 
     * @param suggestedRate швидкість відтворення
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.setPlaybackRate(suggestedRate%3ANumber)%3AVoid
     */
    setPlaybackRate(suggestedRate: number): void

    /**
     * Ця функція повертає набір швидкостей відтворення, в яких доступне поточне відео. Значення за замовчуванням дорівнює 1,
     * що означає, що відео відтворюється зі звичайною швидкістю.
     * 
     * Функція повертає масив чисел, впорядкованих від найменшої до найбільшої швидкості відтворення.
     * Навіть якщо плеєр не підтримує змінну швидкість відтворення, масив завжди повинен містити принаймні одне значення (1)
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getAvailablePlaybackRates()%3AArray
     */
    getAvailablePlaybackRates(): Array<number>

    /**
     * Ця функція вказує, чи повинен відеопрогравач безперервно відтворювати список відтворення,
     * чи він повинен зупинити відтворення після завершення останнього відео у списку відтворення.
     * За замовчуванням списки відтворення не зациклюються.
     * 
     * Цей параметр зберігатиметься, навіть якщо ви завантажите або викличете інший плейлист, тобто якщо ви завантажите плейлист,
     * викличете функцію setLoop зі значенням true, а потім завантажите другий плейлист, то другий плейлист також зациклиться.
     * 
     * @param loopPlaylists визначає поведінку зациклення.
     *
     * Якщо значення параметра дорівнює true, то відеоплеєр буде безперервно відтворювати плейлисти.
     * Після відтворення останнього відео у списку відтворення відеоплеєр повернеться на початок списку відтворення і відтворить його знову.
     * 
     * Якщо значення параметра дорівнює false, то відтворення завершиться після того, як відеоплеєр відтворить останнє відео у списку відтворення.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.setLoop(loopPlaylists%3ABoolean)%3AVoid
     */
    setLoop(loopPlaylists: boolean): void


    
    /**
     * Ця функція вказує, чи слід перемішувати відео у плейлисту так, щоб вони відтворювалися у порядку, відмінному від того, який визначив творець списку відтворення.
     * Якщо ви перетасуєте підбірку після того, як вона вже почала відтворюватися, список буде переупорядковано, а відео, яке відтворюється, продовжуватиме відтворюватися.
     * Наступне відео, яке буде відтворюватися, буде вибрано на основі переупорядкованого списку.
     *
     * @param {boolean} shufflePlaylist вказує, чи повинен YouTube перемішувати плейлист.
     * 
     * Якщо значення параметра дорівнює true, YouTube перетасує порядок відтворення в плейлисті.
     * Якщо ви вкажете функції перетасувати вже перетасований список відтворення, YouTube перетасує порядок знову.
     * Якщо значення параметра буде false, YouTube поверне порядок відтворення до початкового.
     * 
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.setShuffle(shufflePlaylist%3ABoolean)%3AVoid
     */
    setShuffle(shufflePlaylist: boolean): void


    /**
     * Повертає число від 0 до 1, яке вказує на відсоток відео, яке програвач показує як буферизоване.
     * Цей метод повертає надійніше число, ніж застарілі методи getVideoBytesLoaded і getVideoBytesTotal.
     * 
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getVideoLoadedFraction()%3AFloat
     */
    getVideoLoadedFraction(): number

    /**
     * Повертає стан плеера. Можливі значення: :
     * 
     * -1 - не запущено
     * 0 - завершено
     * 1 - грає
     * 2 - на паузі
     * 3 - буферизація
     * 5 - відео CUED
     * 
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getPlayerState()%3ANumber
     */
    getPlayerState(): number

    
    /**
     * @returns {number}  Повертає час, що минув у секундах з моменту початку відтворення відео.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getCurrentTime()%3ANumber
     */
    getCurrentTime(): number

    
    /**
     * Повертає тривалість у секундах поточного відео, що відтворюється. Зауважте, що getDuration() повертатиме 0, доки не буде завантажено метадані відео,
     * що зазвичай відбувається одразу після початку відтворення відео.
     *
     * Якщо відео, яке зараз відтворюється, є подією в реальному часі, функція getDuration() поверне час, що минув з моменту початку трансляції відео.
     * Зокрема, це кількість часу, протягом якого відео транслювалося без перезапуску або переривання. Крім того, ця тривалість зазвичай більша за фактичний час події,
     * оскільки трансляція може розпочатися раніше за час початку події.
     * @returns {number} час відтворення у секундах
     * 
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getDuration()%3ANumber
     */
    getDuration(): number

    
    /**
     * @returns {string} Повертає URL-адресу YouTube.com для поточного завантаженого/відтворюваного відео.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getVideoUrl()%3AString
     */
    getVideoUrl(): string
    
    /**
     * @returns {string} Повертає код вбудовування для поточного завантаженого/відтворюваного відео.
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getVideoEmbedCode()%3AString
     */
    getVideoEmbedCode(): string

    
    /**
     * Ця функція повертає масив ідентифікаторів відео у списку відтворення у поточному порядку.
     * За замовчуванням ця функція повертає ідентифікатори відео у порядку, визначеному власником списку відтворення.
     * Однак, якщо ви викликали функцію {@linkcode setShuffle()} для перемішування порядку в списку відтворення, то значення, що повертається функцією {@linkcode getPlaylist()},
     * відображатиме перемішаний порядок.
     *
     * @returns {Array<string>} массив з айді відео
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getPlaylist()%3AArray
     */
    getPlaylist(): Array<string>

    
    /**
     * Ця функція повертає індекс відео зі списку відтворення, яке зараз відтворюється.
     *
     * @returns {number} індекс поточного відео у плейлисту
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById:~:text=player.getPlaylistIndex()%3ANumber
     */
    getPlaylistIndex(): number
}
