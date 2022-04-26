// mole index -> frame name
function getMoleFrameNameFromColorIndex(index) {
    switch (index) {
        case INDEX_MOLE_COLOR_BLUE:
            return 'MOLE_BLUE';

        case INDEX_MOLE_COLOR_GREEN:
            return 'MOLE_GREEN';

        case INDEX_MOLE_COLOR_PURPLE:
            return 'MOLE_PURPLE';

        case INDEX_MOLE_COLOR_RED:
            return 'MOLE_RED';

        case INDEX_MOLE_COLOR_YELLOW:
            return 'MOLE_YELLOW';
    }

    return '';
}