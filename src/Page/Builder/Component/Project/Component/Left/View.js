import React from "react";
import { PROJECT_CATEGORY } from "../../Container";
import "./index.scss";
import { FormattedMessage } from "react-intl";

export default function(props) {
  const { category, handleSelectCategory } = props;

  const getCategoryClass = categoryName => {
    if (categoryName === category) {
      return "ProjectCategory ProjectCategory_Active";
    } else {
      return "ProjectCategory";
    }
  };

  return (
    <div className="ProjectLeft">
      <div
        className={getCategoryClass(PROJECT_CATEGORY.NEW)}
        onClick={() => handleSelectCategory(PROJECT_CATEGORY.NEW)}
      >
        <FormattedMessage id="ID_PROJECT_NEW" />
      </div>
      <div
        className={getCategoryClass(PROJECT_CATEGORY.LOAD)}
        onClick={() => handleSelectCategory(PROJECT_CATEGORY.LOAD)}
      >
        <FormattedMessage id="ID_PROJECT_LOAD" />
      </div>
    </div>
  );
}
