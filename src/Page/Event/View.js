import React from "react";
import moment from "moment";
import Layout from "../../Common/Component/Layout";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import EyesOffIcon from "../../Image/icon-eyes-off.svg";
import EyesOnIcon from "../../Image/icon-eyes-on.svg";
import "./index.scss";

export default function View(props) {
  const { events } = props;

  return (
    <Layout>
      <div className="account">
        <h3 className="account__title">계정 설정</h3>
        
        <div className="account__tab-box">
          <ul className="account__tab-list">
            <li className="account__tab-item">
              {/* TODO 탭 변경 시 클래스 on 추가하여 활성화 */}
              <a className="account__tab-link">계정 관리</a>
            </li>
            <li className="account__tab-item">
              <a className="account__tab-link on">비밀번호 변경</a>
            </li>
          </ul>

          <div className="account__content-wrap">
            <form action="">
              <div className="account__content-list">
                {/* TODO 계정관리 UI */}
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
                {/* // TODO 계정관리 UI */}

                {/* TODO 비밀번호 변경 UI */}
                {/* TODO : 현재 비밀번호 input */}
                <div className="account__content-item">
                  <span className="account__content-category" id="test">현재 비밀번호</span>
                  <div className="account__password-change">
                    <input type="password" className="account__content-input account__content-input--password" placeholder="현재 비밀번호를 입력해주세요." />
                    <button className="account__password-show">
                      <img src={EyesOffIcon} alt="비밀번호 안보기 아이콘" /> 
                    </button>
                  </div>
                </div>
                {/* TODO : 새 비밀번호 input */}
                <div className="account__content-item">
                  <span className="account__content-category" >새 비밀번호</span>
                  <div className="account__password-change">
                    <input type="password" className="account__content-input account__content-input--password" placeholder="새 비밀번호를 입력해주세요." />
                    <button className="account__password-show">
                      <img src={EyesOnIcon} alt="비밀번호 보기 아이콘" /> 
                    </button>
                  </div>
                </div>
                {/* TODO : 새 비밀번호 확인 input */}
                <div className="account__content-item">
                  <span className="account__content-category">새 비밀번호 확인</span>
                  <div className="account__password-change">
                    <input type="password" className="account__content-input account__content-input--password" placeholder="새 비밀번호를 입력해주세요." />
                    <button className="account__password-show">
                      <img src={EyesOnIcon} alt="비밀번호 보기 아이콘" /> 
                    </button>
                  </div>
                </div>
                {/* // TODO 비밀번호 변경 UI */}
              </div>

              <div className="account__password-changed-btn-box">
                {/* TODO : 활성화 시 클래스 active 추가 */}
                <button type="submit" className="account__password-changed-btn">비밀번호 변경</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

