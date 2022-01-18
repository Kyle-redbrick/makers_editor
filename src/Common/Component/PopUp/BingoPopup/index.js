// import React from "react";
// import Popup, { showPopUp } from "../../PopUp";
// import * as request from "../../../Util/HTTPRequest";
// import bingo1Img from "../../../../Image/bingopopup1.png";
// import bingo2Img from "../../../../Image/bingopopup2.png";
// import bingo3Img from "../../../../Image/bingopopup3.png";
// import bingo4Img from "../../../../Image/bingopopup4.png";
// import bingo5Img from "../../../../Image/bingopopup5.png";
// import bingo6Img from "../../../../Image/bingopopup6.png";
// import bingo7Img from "../../../../Image/bingopopup7.png";
// import bingo8Img from "../../../../Image/bingopopup8.png";
// import bingo9Img from "../../../../Image/bingopopup9.png";

// export const BingoType = {
//   codingParty: { name: "codingParty", popupImg: bingo1Img },
//   likeGame: { name: "likeGame", popupImg: bingo2Img },
//   publish: { name: "publish", popupImg: bingo3Img },
//   share: { name: "share", popupImg: bingo4Img },
//   wizliveTrial: { name: "wizliveTrial", popupImg: bingo5Img },
//   gotLikes: { name: "gotLikes", popupImg: bingo6Img },
//   attend: { name: "attend", popupImg: bingo7Img },
//   gameComment: { name: "gameComment", popupImg: bingo8Img },
//   socialWrite: { name: "socialWrite", popupImg: bingo9Img }
// };

// export const showBingoPopup = (email, type, actions = {}) => {
//   showPopUp(
//     <Popup.TwoButton
//       titleId="ID_BINGO_POPUP_INFO"
//       cancelButtonNameId="ID_BINGO_POPUP_CLOSE"
//       confirmButtonNameId="ID_BINGO_POPUP_DETAIL"
//       confirmAction={() => {
//         if (actions.confirmAction) {
//           actions.confirmAction();
//         } else {
//           window.open("/event/4", "_blank");
//         }
//       }}
//       cancelAction={() => {
//         if (actions.cancelAction) actions.cancelAction();
//       }}
//       content={
//         <img
//           style={{ width: "100%" }}
//           src={BingoType[type].popupImg}
//           alt="bingo img"
//         />
//       }
//     />,
//     { darkmode: true, dismissButton: false }
//   );
//   request.readBingo({ email, type });
// };
