export function drawGroupSelectionPage(gamePath: 'audiochallenge' | 'sprint') {
    return `
        <div class='group-selection'>
            <div class='group-selection__title'>Выберите группу слов (уровень сложности)</div>
            <div class='group-selection__box'>
                <ul class='group-selection__list'>
                    <li class='group-selection__item group-selection__item_1'>
                        <a href="" class="group-selection__link-${gamePath} nav__link" data-rout="/games/${gamePath}/1">1</a>
                    </li>
                    <li class='group-selection__item group-selection__item_2'>
                        <a href="" class="group-selection__link-${gamePath} nav__link" data-rout="/games/${gamePath}/2">2</a>
                    </li>
                    <li class='group-selection__item group-selection__item_3'>
                        <a href="" class="group-selection__link-${gamePath} nav__link" data-rout="/games/${gamePath}/3">3</a>
                    </li>
                    <li class='group-selection__item group-selection__item_4'>
                        <a href="" class="group-selection__link-${gamePath} nav__link" data-rout="/games/${gamePath}/4">4</a>
                    </li>
                    <li class='group-selection__item group-selection__item_5'>
                        <a href="" class="group-selection__link-${gamePath} nav__link" data-rout="/games/${gamePath}/5">5</a>
                    </li>
                    <li class='group-selection__item group-selection__item_6'>
                        <a href="" class="group-selection__link-${gamePath} nav__link" data-rout="/games/${gamePath}/6">6</a>
                    </li>
                </ul>
            </div>
        </div>
    `;
}
