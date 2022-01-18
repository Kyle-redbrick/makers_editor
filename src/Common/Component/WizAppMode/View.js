import React from "react";
import { injectIntl } from "react-intl";
import Layout from "../Layout";
import GameCard from "../../../Common/Component/Gamecard";

import moreIconImg from "../../../Image/game-bottom-more.png";

function View(props) {
  const {
    title,
    labelForTitle,
    items,
    mode,
    isAll,
    isLoading,
    handleMoreBtn,
  } = props;
  const type = mode;

  const renderMoreBtn = () => {
    if (isAll) {
      return null;
    }
    if (isLoading) {
      return null;
    }
    if (mode === "recommend") {
      return null;
    }

    return (
      <div className="section__moreBtnRow">
        <button className="MoreBtn" onClick={handleMoreBtn}>
          <img src={moreIconImg} alt="more" />
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="WizAppMode">
        <div className="WizAppMode__inner">
          {/* nav */}
          <section className={`section section--${type}`}>
            <div className="section__header">
              {labelForTitle && (
                <h2 className="section__labelForTitle">{labelForTitle}</h2>
              )}
              <h2 className="section__title">{title}</h2>
            </div>
            <div className="GameItems">
              {items.map((item, idx) => {
                return (
                  <div className="GameItem" key={item.pId}>
                    <GameCard game={item} size="More" />
                  </div>
                );
              })}
            </div>
            {renderMoreBtn()}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default injectIntl(View);
