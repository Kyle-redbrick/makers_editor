// color to filter : https://codepen.io/sosuke/pen/Pjoqqp

const colorSet = {
  lightMode: {
    "--W_PointColor": "#1db6ff",
    "--W_White": "#ffffff",
    "--W_CloseBtn": "#ffffff",
    "--W_Black": "#000000",
    "--W_Black02": "#000000",
    "--W_Red": "#ff0000",
    "--W_Gray01": "#e5e6e8",
    "--W_Gray02": "#afafaf",
    "--W_Gray03": "#606060",
    "--W_Gray04": "#a8b2c0",
    "--W_Gray05": "#eef2f7",
    "--W_Gray06": "#eef2f7",
    "--W_Gray07": "#eeeeee",
    "--W_Shadow": "rgba(221, 221, 221, 0.5)",
    "--W_Dim": "rgba(51, 51, 51, 0.9)",
    "--W_HeaderBG": "#1db6ff",
    "--W_HeaderTitle": "#ffffff",
    "--W_FooterBG": "#E0E6ED",
    "--W_FooterTitle": "#272B37",
    "--W_TextColorOnBG": "#ffffff",
    "--W_Scrollbar": "#e5e6e8",
    "--W_ScrollbarHover": "#e5e6e8bb",

    "--editorColor01": "#f47835", //function, var, keyword
    "--editorColor02": "#a2  00ff", //for, if, return
    "--editorColor03": "#d41243", //string
    "--editorColor04": "#275a5e", //function init
    "--editorColor05": "#00aedb", //int
    "--editorColor06": "#D3D3D3",
    "--editorColor07": "#8ec127", //comment
    "--editorColor08": "rgba(44, 158, 224, 0.2)", //builder_property
    "--editorColor09": "#fcfcfc",
    "--editorColor10": "#ffffff",
    "--editorColor11": "transparent",

    "--editorColorWH": "#eef2f7",
    "--editorColorBK": "#181818",
    "--editorColorLine": "rgba(0, 0, 0, 0.071)",
    "--editorColorSelection": "#b5d5ff",

    "--editorColorStep": "#c6dbae",
    "--editorColorBracket": "#bfbfbf",
    "--editorColorFold": "#181818"
  },
  darkMode: {
    "--W_PointColor": "#1db6ff",
    "--W_White": "#393E4F",
    "--W_CloseBtn": "#ffffff",
    "--W_Black": "#141821",
    "--W_Black02": "#ffffff",
    "--W_Red": "#ff0000",
    "--W_Gray01": "#2f3443",
    "--W_Gray02": "#AFAFAF",
    "--W_Gray03": "#ffffff",
    "--W_Gray04": "#272B37",
    "--W_Gray05": "#282c36",
    "--W_Gray06": "#272B37",
    "--W_Gray07": "#eeeeee",
    "--W_Shadow": "rgba(0, 0, 0, 0.2)",
    "--W_Dim": "rgba(51, 51, 51, 0.9)",
    "--W_HeaderBG": "#272B37",
    "--W_HeaderTitle": "#ffffff",
    "--W_FooterBG": "#272B37",
    "--W_FooterTitle": "#ffffff",
    "--W_TextColorOnBG": "#ffffff",
    "--W_Scrollbar": "#282c36",
    "--W_ScrollbarHover": "#282c36aa",

    "--editorColor01": "#66d9ef", //function, var, keyword
    "--editorColor02": "#f92672", //for, if, return
    "--editorColor03": "#fd971f", //string
    "--editorColor04": "#a6e22e", //function init
    "--editorColor05": "#ae81ff", //int
    "--editorColor06": "#D3D3D3",
    "--editorColor07": "rgba(128, 125, 124, 1)", //comment
    "--editorColor08": "rgba(44, 158, 224, 0.2)", //builder_property
    "--editorColor09": "#272b37",
    "--editorColor10": "#141821",
    "--editorColor11": "#272b37",

    "--editorColorWH": "#2f3443",
    "--editorColorBK": "#ffffff",
    "--editorColorLine": "rgba(0, 0, 0, 0.071)",
    "--editorColorSelection": "#999999",

    "--editorColorStep": "#c6dbae",
    "--editorColorBracket": "#bfbfbf",
    "--editorColorFold": "#ffffff"
  }
};

export const setColorTheme = name => {
  localStorage.setItem("colorTheme", name);
  let root = document.documentElement;
  Object.keys(colorSet[name]).forEach(key => {
    root.style.setProperty(key, colorSet[name][key]);
  });
};

export const loadColorTheme = () => {
  setColorTheme(getColorTheme());
};

export const toggleColorTheme = () => {
  if (getColorTheme() === "lightMode") {
    setColorTheme("darkMode");
  } else {
    setColorTheme("lightMode");
  }
};

export const getColorTheme = () => {
  let theme = localStorage.getItem("colorTheme");
  if (!theme || !colorSet[theme]) {
    theme = "darkMode";
  }
  return theme;
};
