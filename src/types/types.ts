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

//* TODO: разобраться, нужны ли поля consecutiveCorrect/consecutiveIncorrect по каждой игре отдельно
export interface IOptionsForWordUser {
    totalCorrectAudiochallenge: number;
    totalIncorrectAudiochallenge: number;
    totalCorrectSprint: number;
    totalIncorrectSprint: number;
    consecutiveCorrectAudiochallenge: number;
    consecutiveIncorrectAudiochallenge: number;
    consecutiveCorrectSprint: number;
    consecutiveIncorrectSprint: number;
    consecutiveCorrectAll: number;
    consecutiveIncorrectAll: number;
}

export interface IWordUser {
    difficulty: 'easy' | 'hard' | 'new';
    optional: IOptionsForWordUser;
}

export interface IUserWordCard {
    id: string; //! идентификатор записи - мы им не пользуемся
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
// export type TOptionsForStatistics = Record<string, unknown>;

// export interface IStatisticsBodyForPutting {
//     learnedWords: number;
//     optional: TOptionsForStatistics;
// }

export interface IOptionsForStatistics {
    lastDayStatistics: {
        audiochallenge: IDataForStatistics;
        sprint: IDataForStatistics;
    };
    allDaysStatistics: Record<string, Array<number>>;
    // allDaysStatistics: string;
    // allDaysStatistics: Array<string>;
    // allDaysStatistics: "['31.08.2022:33:12:11:550', '01.09.2022:50:36:14:400']"; // дата:всегоОтветов:правильные:неправильные:bestScoreSprint
}

export interface IStatisticsBodyForPutting {
    learnedWords: number;
    optional: IOptionsForStatistics;
}

export interface IStatisticsResult {
    id: string; //! это ID статистической записи
    learnedWords: number;
    optional: IOptionsForStatistics;
}

export interface IDataForStatistics {
    latestDate: string;
    totalAnswers: number;
    correctAnswers: number;
    incorrectAnswers: number;
    firstTimeInGame: number;
    bestSeriesOfAnswers: number;
    bestScore: number | undefined;
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
    currentPage: string;
    originWord: null | IWord | _IWord;
    translateWord: null | IWord | _IWord;
    level: number;
    levelProgress: number;
    levelProgressBar: number;
    currentScore: number;
    bestScore: number;
    scoreDecrease: number;
    gameSource: 'menu' | 'textbook';
    currentPageWords: Array<_IWord> | null;
    gameResult: Record<string, string>;
}
