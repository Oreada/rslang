export interface Word {
    id: string;
    group: 0;
    page: 0;
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

export interface UserBodyForCreation {
    name: string;
    email: string;
    password: string;
}

export interface UserCardWithId {
    id: string;
    name: string;
    email: string;
}

export interface UserBodyForSignIn {
    email: string;
    password: string;
}

export interface AuthorizationResult {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}
