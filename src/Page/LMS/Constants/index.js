export const PAGE = {
  COURSE: 'COURSE',
  DASHBOARD: 'DASHBOARD',
  INVENTORY: 'INVENTORY',
  QNA: 'QNA',
  QNA_BY_ID: 'QNA_BY_ID',
  QNA_NEW: 'QNA_NEW',
  QNA_UPDATE: "QNA_UPDATE",
  MISSION: "MISSION",
  ATTENDANCE: "ATTENDANCE"
}

export const renderCurrentPage = (page) => {
  switch (page) {
    case PAGE.QNA:
    case PAGE.QNA_BY_ID:
    case PAGE.QNA_NEW:
    case PAGE.QNA_REPLY:
    case PAGE.QNA_UPDATE:
      return PAGE.QNA;
    default:
      return page;
  }
}

export const COLOR = {
  JS: "#febd03",
  PUZZLE: "#ff7d3a",
  PYTHON: "#4390f6",

  ORANGE: "#ff6f44",
  MINT: "#2fc180",
}

export const renderTypeColor = (type) => {
  switch (type) {
    case 'javascript':
      return COLOR.JS;
    case 'oobc':
      return COLOR.PUZZLE;
    case 'python':
      return COLOR.PYTHON;
    default:
      return COLOR.JS;
  }
}

export const DEFAULT_PROJECT_ID = 1