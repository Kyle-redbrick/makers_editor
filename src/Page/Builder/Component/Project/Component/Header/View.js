import React from "react";
import closeImg from "../../../../../../Image/builder/group-65.svg";
import "./index.scss";
import { FormattedMessage } from "react-intl";

export default function(props) {
  const { canClose, closeProjectPopup } = props;

  return (
    <div className="ProjectHeader">
      <FormattedMessage id="ID_PROJECT_TITLE" />
      {canClose && (
        <div className="ProjectHeaderClose" onClick={closeProjectPopup}>
          <img src={closeImg} alt="close" />
        </div>
      )}
    </div>
  );
}
