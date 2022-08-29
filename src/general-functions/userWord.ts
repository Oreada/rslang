import { createUserWord, getUserAggregatedWordsFiltered, getUserWord, updateUserWord } from "../components/api/api";
import { storage } from "../storage/storage";
import { IAuthorizationResult, IUserWordsAggregated } from "../types/types";

export async function addUserWord(wordId: string, difficulty: "easy" | "hard") {

  const user: IAuthorizationResult = JSON.parse(localStorage.getItem('rslang_currentUser#') as string);
  const userId = user.userId;
  const userToken = user.token;

  const word = await getUserWord(userId, wordId, userToken);

  const learned = await getUserAggregatedWordsFiltered(userId, userToken, 'easy');
  console.log(learned);

  // const l = (await getUserAggregatedWordsFiltered(userId, userToken, 'easy', '0', '0', "20") as Array<IUserWordsAggregated>)
  // const w = (await getUserAggregatedWordsFiltered(userId, userToken, 'hard', '0', '0', "10000") as Array<IUserWordsAggregated>)

  // console.log(l, w)
  
  if (word) {
    await updateUserWord(userId, wordId, {
      difficulty: difficulty,
      optional: {}
    }, userToken);
    console.log('слово обновлено');
    return;
  }
  
  await createUserWord(userId, wordId, {
    difficulty: difficulty,
    optional: {}
  }, userToken);
  console.log('слово добавлено');
}