import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss"


function Certificate(props) {

  console.log("!!!!!",props)

  return (
    <div className="certificate-container">
      <div className="certificate-img">
        
      </div>
      <button
          onClick={() => {
            window.print()
            // props.dismiss();
          }}>

            print
      </button>

      <button
          onClick={() => {
            props.dismiss();
          }}>

           close
      </button>
    </div>

  );
}
export default injectIntl(Certificate);