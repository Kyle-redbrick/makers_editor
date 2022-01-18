import { css } from "glamor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (component, options = {}) => {
  toast(component, {
    ...options,
    className: css({
      backgroundColor: "#1c1c1c !important",
      borderRadius: "16px !important"
    })
  })
}
