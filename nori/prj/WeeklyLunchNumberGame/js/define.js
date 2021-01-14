// 메뉴 입력 최대수
const MENU_INPUT_MAX = 20;

// 셀 col row 개수
const CELL_MAX = 5;

// 셀 사이즈
const CELL_SIZE = 65;

// 화면 사이즈
const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;

// CELL 시작 위치
const CELL_BEGIN_X = 10;
const CELL_BEGIN_Y = 35;

// CELL rectangle 외부 내간 간격
const CELL_INTERNAL_GAP = 3;

// CELL 간 간격
const CELL_GAP = 3;

// Circle Radius
const CELL_CIRCLE_RADIUS = 8;

// 정산 정보 
const SETTLE_MAX = 5;

// 정산 텍스트 좌표 정보
const SETTLE_TEXT_GAMEBOX_GAP = 25;
const SETTLE_TEXT_RAW_GAP = 50;

// background color
const BACKGROUND_COLOR_STR = '#252525';
const BACKGROUND_COLOR = 0x252525;

// cell color
const CELL_BACKCOLOR = 0xee0000;
const CELL_INNER_BACKCOLOR = 0xffffff;

// cell point text
const CELL_POINT_TEXT_COLOR_STR = '#252525';

// settle text
const SETTLE_TEXT_COLOR_STR = '#fefefe';

// Game State
const GameState = Object.freeze({
    Ready: 0,
    Running: 1,
    Finished: 2
});

// Activate Cell Result
const ActivateCellResult = Object.freeze({
    NoMoreEmpty: 0,
    Success: 1,
    Failed: 2
});

// key arrow
const KeyArrow = Object.freeze({
    Left: 0,
    Up: 1,
    Right: 2,
    Down: 3
});

// cell merge enable check result
const CellMergeEnableCheck = Object.freeze({
    Unknown: 0,
    Enable: 1,
    Unable_EmptyCell: 2,
    Unable_OtherCell: 3
});

// cell merge result
const CellMergeResult = Object.freeze({
    Unknown: 0,
    Success: 1,
    Failed_EmptyCell: 2,
    Failed_OtherCell: 3,
    Failed_LogicError: 4
});