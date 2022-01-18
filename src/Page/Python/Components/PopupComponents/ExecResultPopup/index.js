import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

import closeBtn from "../../../../../Image/newPython/python-popup-close-btn@2x.png";

const PythonExecResult = props => {
  const { dismiss } = props;
  // const [defaultPopupSetting, setdefaultPopupSetting] = useState({
  //   x: 10,
  //   y: 20,
  //   width: 400,
  //   height: 400
  // });

  return (
    <section className="pythonResultPopup">
      <div className="popupHeader">
        <p className="title">{props.intl.formatMessage({ id: "ID_PYTHON_EXEC_RESELT_TITLE" })}</p>
        <img
          className="closePopupBtn"
          onClick={() => dismiss()}
          src={closeBtn}
          alt="close button"
        />
      </div>
      <img
        className="resultImg"
        src="https://png.pngitem.com/pimgs/s/184-1849990_sample-png-images-example-transparent-png-png-download.png"
        alt=""
      />
      <button onClick={() => dismiss()}>{props.intl.formatMessage({ id: "ID_PYTHON_CONFIRM_BTN" })}</button>
    </section>
  );
};

export default injectIntl(PythonExecResult);
