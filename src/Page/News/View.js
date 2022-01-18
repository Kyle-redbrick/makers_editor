import React from "react";
import moment from "moment";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import "./index.scss";

function View(props) {
  const { news, intl /*onClickMore, newsCount*/ } = props;

  return (
    <Layout>
      <div className="page--news">
        <div className="page--news--wrapper">
          <div className="news__title">{intl.formatMessage({ id: "ID_NEWS_TITLE" })}</div>
          <div className="news__table">
            {news.map((item, index) => {
              return (
                <Link
                  to={`news/detail/${item.id}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <div className="news__item pc">
                    <div className="item__topic">{item.topic}</div>
                    <div className="item__title">
                      {item.title}
                      <span className="new">{intl.formatMessage({ id: "ID_NEWS_NEW" })}</span>
                    </div>
                    <div className="item__date">
                      {moment(item.createdAt).format("YYYY.MM.DD")}
                    </div>
                  </div>
                  <div className="news__item mobile" key={index}>
                    <div className="item__title">
                      <p>{item.title}</p>
                      <span className="new">{intl.formatMessage({ id: "ID_NEWS_NEW" })}</span>
                    </div>
                    <div className="item__bottom">
                      <div className="item__topic">{item.topic}</div>
                      <div className="item__date">
                        {moment(item.createdAt).format("YYYY.MM.DD")}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* {newsCount > news.length && (
              <div className="more" onClick={onClickMore}>
                <img src={moreIcon} alt="" />
                더보기
              </div>
            )} */}

            {/* page navigation */}
            {/* TODO: page navigaition 적용 */}
            <div className="pageNavigation">
              <div className="prevBtn">{intl.formatMessage({ id: "ID_NEWS_PREV" })}</div>
              <div className="num current">1</div>
              <div className="num">2</div>
              <div className="nextBtn active">{intl.formatMessage({ id: "ID_NEWS_NEXT" })}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default injectIntl(View);