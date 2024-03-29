// scene keys
const SCENE_KEY_MAIN = "sceneMain";

// status
const GameStatus = {
    INPUT: {value: 0, description: "입력대기"},
    MAKE: {value: 1, description: "연결생성"},
    PLAYING: {value: 2, description: "플레이"},
    FINISHED: {value: 3, description: "종료"},
};

// background color
const BACK_COLOR = "#252525";

// menu / border color
const BORDER_COLOR = "0x66816E";

// menu height
const MENU_HEIGHT = 48;
const DRAG_MENU_HEIGHT_GAP = MENU_HEIGHT - 16;

// border gap
const BORDER_DEPTH = 8;

// sadari count
const SADARI_MIN = 2;
const SADARI_MAX = 20;

// message box
const MSGBOX_BACKCOLOR = 0xA0A0A0;
const MSGBOX_BACKALPHA = 0.8;
const MSGBOX_BUTTONAREA_HEIGHT = 48;

// sadari width
const SADARI_PAN_WIDTH = 100;
const SADARI_PAN_GAP = 10;
const SADARI_TEXT_EDGE = 15;

// sadari text
const SADARI_FINISH_TEXT_BACK_HEIGHT = 30;

//object depth
const DEPTH_MSGBOX = 1000;
const DEPTH_HTML = 100;
const DEPTH_SADARI_OBJECT = 8;
const DEPTH_LINE = 9;
const DEPTH_LINE_CONNECTER = 10;
const DEPTH_POINT = 11;
const DEPTH_POINT_GUIDER = 49;
const DEPTH_POINT_DRAG_GUIDER = 50;
const DEPTH_PLAY_CHARACTER = 60;
const DEPTH_FINISH_TEXT = 60;

// sadari
const SADARI_PAN_COLOR = 0x322F2F;

// sadari line info
const SADARI_LINE_MIN_YGAP = 65;
const SADARI_LINE_COLOR = 0x5CAFA8;
const SADARI_LINE_CONNECTED_COLOR = 0xF26B09;
const SADARI_LINE_THIKNESS = 8;
const SADARI_POINT_RADIUS = 8;

// sepcial value
const INVALID_COORD = -99999;

// play interval
const PLAY_MOVE_VELOCITY = 5;
const PLAY_MOVE_INTERVAL = 20;
