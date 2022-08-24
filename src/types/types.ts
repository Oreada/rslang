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

//! временно такой тип, т.к. мы не знаем, какие опции слова нам будут нужны
export type TOptionsForWordUser = Record<string, unknown>;

export interface IWordUser {
    difficulty: 'easy' | 'hard';
    optional: TOptionsForWordUser;
}

export interface IUserWordCard {
    id: string;
    difficulty: 'easy' | 'hard';
    optional: TOptionsForWordUser;
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
}

export interface ICardAudiochallenge {
    correct: IWord; //! только в выводе "_id" вместо "id" - ?
    incorrect: Array<string>;
}
