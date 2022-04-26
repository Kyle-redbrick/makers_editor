import arrowUp from "../../../Image/lms/arrow-up.svg";
import arrowDown from "../../../Image/lms/arrow-down.svg";

import iconJs from "../../../Image/lms/icon-js.svg";
import iconPython from "../../../Image/lms/icon-python.svg";
import iconPuzzle from "../../../Image/lms/icon-puzzle.svg";

import iconAnswer from "../../../Image/lms/icon-answer.svg";
import iconBack from "../../../Image/lms/icon-back.svg";
import iconCheck from "../../../Image/lms/icon-check.svg";
import iconJoystick from "../../../Image/lms/icon-joystick.svg";
import iconMore from "../../../Image/lms/icon-more.svg";
import iconNote from "../../../Image/lms/icon-note.svg";
import iconProgress from "../../../Image/lms/icon-progress.png";
import iconSelect from "../../../Image/lms/icon-select.svg";
import iconSelectOpen from "../../../Image/lms/icon-select-open.svg";
import iconQuestionMark from "../../../Image/lms/icon-question-mark.svg";
import iconDropDown from "../../../Image/lms/menu-box-down-white.svg";
import iconImage from "../../../Image/lms/icon-image.svg"
import iconDelete from "../../../Image/lms/icon-delete.svg" 
import iconAlert from "../../../Image/lms/icon-alert.svg"
import iconSetting from "../../../Image/lms/icon-setting.svg"
import iconEdit from "../../../Image/lms/icon-edit.svg";
import iconTrash from "../../../Image/lms/icon-trash.svg";
import iconRank from "../../../Image/lms/icon-ranking.svg"
import iconCert from "../../../Image/lms/icon-certificate.svg"
import iconCertBlock from "../../../Image/lms/icon-cert-block.svg"
import iconCertJs from "../../../Image/lms/icon-cert-js.svg"

import iconStar1 from "../../../Image/lms/icon-star-1.svg";
import iconStar2 from "../../../Image/lms/icon-star-2.svg";
import iconStar3 from "../../../Image/lms/icon-star-3.svg";

import inventory1 from "../../../Image/lms/inventory-1.svg";
import inventory2 from "../../../Image/lms/inventory-2.svg";
import inventory3 from "../../../Image/lms/inventory-3.svg";
import inventory4 from "../../../Image/lms/inventory-4.svg";
import inventory5 from "../../../Image/lms/inventory-5.svg";
import inventory6 from "../../../Image/lms/inventory-6.svg";
import inventory7 from "../../../Image/lms/inventory-7.svg";
import inventory8 from "../../../Image/lms/inventory-8.svg";

import lnbDashboardOn from "../../../Image/lms/icon-dashboard-on.svg";
import lnbDashboardOff from "../../../Image/lms/icon-dashboard-off.svg";
import lnbInventoryOn from "../../../Image/lms/icon-inventory-on.svg";
import lnbInventoryOff from "../../../Image/lms/icon-inventory-off.svg";
import lnbQuestionsOn from "../../../Image/lms/icon-questions-on.svg";
import lnbQuestionsOff from "../../../Image/lms/icon-questions-off.svg";

import lnbPythonOn from "../../../Image/lms/icon-python-on.svg";
import lnbPythonOff from "../../../Image/lms/icon-python-off.svg";
import lnbJsOn from "../../../Image/lms/icon-js-on.svg";
import lnbJsOff from "../../../Image/lms/icon-js-off.svg";
import lnbPuzzleOn from "../../../Image/lms/icon-puzzle-on.svg";
import lnbPuzzleOff from "../../../Image/lms/icon-puzzle-off.svg";

import lmsRecommendArrow from "../../../Image/dreamclass/lms-recommend-quest-arrow-icon.svg";

import mobileQuestionFilter from "../../../Image/dreamclass/dream_question_filter_icon.svg";

import gameBtnImg from "../../../Image/lms/game_btn_img.svg";


export const IMAGE = {
  ARROW_UP: arrowUp,
  ARROW_DOWN: arrowDown,

  CIRCULAR_PYTHON: lnbPythonOff,
  CIRCULAR_PUZZLE: lnbPuzzleOff,
  CIRCULAR_JS: lnbJsOff,

  ICON_PYTHON: iconPython,
  ICON_PUZZLE: iconPuzzle,
  ICON_JS: iconJs,

  ICON_ANSWER: iconAnswer,
  ICON_BACK: iconBack,
  ICON_CHECK: iconCheck,
  ICON_MORE: iconMore,
  ICON_NOTE: iconNote,
  ICON_JOYSTICK: iconJoystick,
  ICON_PROGRESS: iconProgress,
  ICON_SELECT: iconSelect,
  ICON_SELECT_OPEN: iconSelectOpen,
  ICON_QUESTION_MARK: iconQuestionMark,
  ICON_DROPDOWN: iconDropDown,
  ICON_IMAGE: iconImage,
  ICON_DELETE: iconDelete,
  ICON_ALERT: iconAlert,
  ICON_SETTING: iconSetting,
  ICON_EDIT: iconEdit,
  ICON_TRASH: iconTrash,
  ICON_RANK: iconRank,
  ICON_CERT:iconCert,
  ICON_CERT_BLOCK:iconCertBlock,
  ICON_CERT_JS:iconCertJs,


  ICON_STAR_1: iconStar1,
  ICON_STAR_2: iconStar2,
  ICON_STAR_3: iconStar3,

  INVENTORY_1: inventory1,
  INVENTORY_2: inventory2,
  INVENTORY_3: inventory3,
  INVENTORY_4: inventory4,
  INVENTORY_5: inventory5,
  INVENTORY_6: inventory6,
  INVENTORY_7: inventory7,
  INVENTORY_8: inventory8,

  LNB_DASHBOARD_ON: lnbDashboardOn,
  LNB_DASHBOARD_OFF: lnbDashboardOff,
  LNB_INVENTORY_ON: lnbInventoryOn,
  LNB_INVENTORY_OFF: lnbInventoryOff,
  LNB_QNA_ON: lnbQuestionsOn,
  LNB_QNA_OFF: lnbQuestionsOff,

  LNB_JS_ON: lnbJsOn,
  LNB_JS_OFF: lnbJsOff,
  LNB_PUZZLE_ON: lnbPuzzleOn,
  LNB_PUZZLE_OFF: lnbPuzzleOff,
  LNB_PYTHON_ON: lnbPythonOn,
  LNB_PYTHON_OFF: lnbPythonOff,

  LMS_RECOMMEND_ARROW: lmsRecommendArrow,
  MOBILE_QUESTION_FILTER: mobileQuestionFilter,

  GAME_BUTTON_IMG: gameBtnImg
} 

export const renderCircularIcon = (type) => {
  switch (type) {
    case 'javascript':
      return IMAGE.CIRCULAR_JS;
    case 'oobc':
      return IMAGE.CIRCULAR_PUZZLE;
    case 'python':
      return IMAGE.CIRCULAR_PYTHON;
    default:
      return IMAGE.CIRCULAR_JS;
  }
}