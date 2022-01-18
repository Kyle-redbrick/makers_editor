import React from "react";
import Layout from "../../Common/Component/Layout";
import Publish from "./Components/Publish";
import Subscribe from "./Components/Subscribe";
import UserInfoTemplate from "./Components/UserInfoTemplate";
import "./index.scss";

export default function View(props) {
  const {
    isMyPage,
    email,
    handleSelectTab,
    selectedTab,
  } = props;

  return (
    <Layout>
      <div className="Page--Mypage">
        <div className="Mypage--Inner">
          <UserInfoTemplate
            isMyPage={isMyPage}
            targetEmail={email}
            handleSelectTab={handleSelectTab}
            selectedTab={selectedTab}
          />

          <section className="Mypage__Activity">
            <div className="Activity_Contents">
              {selectedTab === "publish" && 
                <Publish
                  isMyPage={isMyPage}
                  targetEmail={email}
                />
              }
              {selectedTab === "subscribe" && 
                <Subscribe 
                  mode="subscribe"
                  isMyPage={isMyPage}
                  targetEmail={email}
                />
              }
              {selectedTab === "interested" && 
                <Subscribe 
                  mode="interested"
                  isMyPage={isMyPage}
                  targetEmail={email}
                />
              }
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
