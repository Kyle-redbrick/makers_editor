import React from "react";
import moment from "moment";
import Layout from "../../Common/Component/Layout";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import EditPopup from "./Popup/EditPopup";
import "./index.scss";

export default function View(props) {
  const { events } = props;

  return (
    <Layout>
      <EditPopup />
      <div className="account">
        <h3 className="account__title">계정 설정</h3>
        
        <div className="account__tab-box">
          <ul className="account__tab-list">
            <li className="account__tab-item">
              {/* TODO 탭 변경 시 클래스 on 추가하여 활성화 */}
              <a className="account__tab-link on">계정 관리</a>
            </li>
            <li className="account__tab-item">
              <a className="account__tab-link">비밀번호 변경</a>
            </li>
          </ul>

          <div className="account__content-wrap">
            <div className="account__content-item">
              <span className="account__content-category">이름</span>
              <input type="text" className="account__content-input" placeholder="이름을 입력하세요." />
              <button type="button" className="account__edit-btn">수정</button>
            </div>
            
            <div className="account__content-item">
              <span className="account__content-category">닉네임</span>
              <input type="text" className="account__content-input" placeholder="닉네임을 입력하세요." />
              <button type="button" className="account__edit-btn">수정</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

