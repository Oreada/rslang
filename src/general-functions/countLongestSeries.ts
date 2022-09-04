export function countLongestSeries(gameResultsEntries: Array<Array<string>>) {
    let counterCorrect = 0;
    let savingCounter = 0;

    for (let i = 0; i < gameResultsEntries.length; i += 1) {
        if (gameResultsEntries[i][1] === 'correct') {
            counterCorrect += 1;
            if (counterCorrect > savingCounter) {
                savingCounter = counterCorrect;
            }
        } else {
            counterCorrect = 0;
        }
    }

    return savingCounter;
}
