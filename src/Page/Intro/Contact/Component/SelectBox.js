import React from "react";
import {useIntl} from "react-intl";
import TitleArea from "./TitleArea";

const SelectBox = ({num, name, title, list, register}) => {
  const intl = useIntl();
  return (
    <div>
      <TitleArea num={num} title={title} />
      <div className="contact_select_list">
        {list.map(item => (
          <label key={item} htmlFor={item} className="contact_select_label">
            <input
              type="radio"
              id={item}
              name={title}
              value={item}
              {...register(name)}
            />
            {intl.formatMessage({id: item})}
            <span className="contact_select_check_mark" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
