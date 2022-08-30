export interface IWord {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}

export interface IUserBodyForCreation {
    name: string;
    email: string;
    password: string;
}

export interface IUserCardWithId {
    id: string;
    name: string;
    email: string;
}

export interface IUserBodyForSignIn {
    email: string;
    password: string;
}

export interface IAuthorizationResult {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

export interface ITokens {
    token: string;
    refreshToken: string;
}

// //! временно такой тип, т.к. мы не знаем, какие опции слова нам будут нужны
// export type TOptionsForWordUser = Record<string, unknown>;

export interface IOptionsForWordUser {
    counterAudiochallengeCorrect: number;
    counterAudiochallengeIncorrect: number;
    counterSprintCorrect: number;
    counterSprintIncorrect: number;
}

export interface IWordUser {
    difficulty: 'easy' | 'hard' | 'new';
    optional: IOptionsForWordUser;
}

export interface IUserWordCard {
    id: string; //! не поняла, что это за id - ?
    difficulty: 'easy' | 'hard' | 'new';
    optional: IOptionsForWordUser;
    wordId: string;
}

export interface IWordWithDifficulty {
    _id: string; //! в IWord id, а не _id
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
    userWord: IWordUser; //! в IWord этого нет
}

export interface IUserWordsAggregated {
    paginatedResults: Array<IWordWithDifficulty>;
    totalCount: Array<Record<string, number>>;
}

//! временно такой тип, т.к. мы не знаем, какие опции статистики нам будут нужны
export type TOptionsForStatistics = Record<string, unknown>;

export interface IStatisticsBodyForPutting {
    learnedWords: number;
    optional: TOptionsForStatistics;
}

export interface IStatisticsResult {
    id: string; //! это ID статистической записи
    learnedWords: number;
    optional: TOptionsForStatistics;
}

//! временно такой тип, т.к. мы не знаем, какие опции этих записей (settings) нам будут нужны
export type TOptionsForSettings = Record<string, unknown>;

export interface ISettingsBodyForPutting {
    wordsPerDay: number;
    optional: TOptionsForSettings;
}

export interface ISettingsResult {
    id: string; //! это ID записи
    wordsPerDay: number;
    optional: TOptionsForSettings;
}

export interface IStorage {
    pageCount: string;
    chapterCount: string;
    currentPage: null | Array<IWord>;
    difficultWords: null | Array<IWordWithDifficulty>;
}

export interface _IWord {
    _id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}

export interface ICardAudiochallenge {
    correct: _IWord; //! т.к. в выводе "_id", а не "id"
    incorrect: Array<IWordWithDifficulty>;
}

export interface ISprintStorage {
    currentChapter: string;
    originWord: null | IWord;
    translateWord: null | IWord;
    level: number;
    levelProgress: number;
    levelProgressBar: number;
    currentScore: number;
    bestScore: number;
    scoreDecrease: number;
}
