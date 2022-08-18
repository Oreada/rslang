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

export interface IStorage {
    pageCount: string,
    chapterCount: string,
    currentPage: null | Array<IWord>,
}
