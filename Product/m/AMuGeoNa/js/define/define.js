// appId
const APPID = "AMUGEONAAPP";

// key
const KEY_INTRO = "intro";
const KEY_LEVEL = "level";
const KEY_OPTION = "option";
const KEY_GAME_SHOOTTHESTARS = "shootthestars";
const KEY_GAME_ROLLDICE = "rolldice";

// depth
const DEPTH_MENU = 500;
const DEPTH_MENU_BUTTON = 501;
const DEPTH_MENU_GAMETITLE = 502;
const DEPTH_COIN_ACTION_TEXT = 503
const DEPTH_GAMEBACKGROUND = 1;
const DEPTH_GAMEOBJECT = 2;
const DEPTH_GAMEMENU = 3;
const DEPTH_LEVEL_ARROW = 1;
const DEPTH_LEVEL_BLOCK = 2;
const DEPTH_LEVEL_REPRESENTATION_IMAGE = 3;
const DEPTH_ROLLDICE_DICE = 1;
const DEPTH_ROLLDICE_CUP = 2;
const DEPTH_ROLLDICE_BUTTON = 3;
const DEPTH_GAMEINFO_UI = 400;
const DEPTH_MSGBOX = 500;

// data name
const DATANAME_GAME = "0xG0";

// browser command
const BCMD_VIBRATION1 = "DxV1";
const BCMD_AD = "DxA0";
const BCMD_APP_ONPAUSE = "DxA1";    // app onPause
const BCMD_APP_ONRESUME = "DxA2";   // app onResume
const BCMD_APP_ONSTOP = "DxA3";     // app onStop

// app command
const ACMD_AD = "DxA0";

// color
const COLOR_BACKGROUND = "#252525";
const COLOR_INTRO_TOUCHBLINK_ON = 0xA0A0A0;
const COLOR_INTRO_TOUCHBLINK_OFF = 0x454545;
const COLOR_INTRO_COMPANY = 0xA0A0A0;
const COLOR_INTRO_THANKYOU = 0x606060;
const COLOR_MENUCOLOR_1 = 0x1AC1F1;
const COLOR_MENUCOLOR_2 = 0x2DA1C2;
const COLOR_GOLD = 0xFAC613;
const COLOR_MENUTITLE = 0x252525;
const COLOR_OPTION_MENUTITLE = 0xFFFFFF;
const COLOR_OPTION_MENU = 0xFFFFFF;
const COLOR_LEVELBLOCK = 0x3FA8F2;
const COLOR_LEVELBLOCK_DISABLE = 0x7C7C7C;
const COLOR_LEVEL_TEXT = 0xFFFFFF;
const COLOR_MSGBOX_BACKGROUND = 0xECE9D8;
const COLOR_MSGBOX_BORDER = 0x0265F6;
const COLOR_MSGBOX_TITLE = 0x4387F7;
const COLOR_MSGBOX_BUTTONS = 0xECE9D8;
const COLOR_MSGBOX_TITLE_TEXT = 0xFFFFFF;
const COLOR_MSGBOX_CONTENT_TEXT = 0x000000;
const COLOR_ADDCOIN_TEXT = 0xFFF600;
const COLOR_USECOIN_TEXT = 0xFF4E00;
const COLOR_SHOOTTHESTARS_BACKGROUND = 0x454444;
const COLOR_SHOOTTHESTARS_CANONICON_GOLD = 0xFC4A1A;
const COLOR_SHOOTTHESTARS_MENU_BACKGROUND = 0xFEFEFE;

// time
const TIMEOUT_ASSET_DOWNLOAD = 10000;

// coordinate
const COORD_OPTIONMENU_YGAP = 10;   // 옵션내 제목과 선택 메뉴간의 높이
const COORD_OPTIONMENU_XGAP = 10;   // 옵션내 선택 메뉴간의 높이
const COORD_OPTION_YGAP = 20;        // 옵션간의 높이
const COORD_OPTION_BEGIN_TOP = 100; // 옵션 시작 Y
const COORD_ROLLDICE_ROLL_TOP = -50;    // 주사위 굴리기 모션 상위 지점
const COORD_ROLLDICE_CUP_HIDEBOTTOM = -50;    // 주사위 컵 모션 상위 bottom 지점
const COORD_SHOOTTHESTARS_MENUICON_GAP = 5; // 메뉴 아이콘 gap

// size
const SIZE_MSGBOX_MAX_WIDTH = 300;
const SIZE_MSGBOX_MAX_HEIGHT = 250;
const SIZE_MSGBOX_BORDER = 4;
const SIZE_MSGBOX_TITLE_HEIGHT = 28;
const SIZE_MSGBOX_BUTTON_HEIGHT = 36;
const SIZE_MSGBOX_TITLE_FONTSIZE = 20;
const SIZE_MSGBOX_CONTENT_FONTSIZE = 16;

// opacity
const OPACITY_UNSELECTED_OPTIONMENU = 0.7;
const OPACITY_LEVELBLOCK_BODY = 0.4;
const OPACITY_COINACTIONTEXT_MIN = 0.1;
const OPACITY_COINACTIONTEXT_DECREASE = 0.05;

// max
const SOUNDPOOL_MAX = 5;

// interval
const INTERVAL_ROLLDICE_MOVE = 60;
const INTERVAL_COINTEXT_MOVE = 60;
const INTERVAL_DICECUP_UP_MOVE = 50;
const INTERVAL_DICECUP_DOWN_MOVE = 50;

// velocity
const VELOCITY_COINTEXT = 5;
const VELOCITY_DICE_MOVE_MIN = 65;
const VELOCITY_DICE_MOVE_MAX = 110;
const VELOCITY_DICECUP_UP = 80;
const VELOCITY_DICECUP_DOWN = 160;

// font size
const FONTSIZE_COINACTIONTEXT = 14;
const FONTSIZE_SHOOTTHESTARS_CANONICON_GOLD = 16;

// count limit
const COUNTLIMIT_ROLLDICE_TRY = 10;