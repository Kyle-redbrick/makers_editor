import React from "react";
import Layout from "../../Common/Component/Layout";
import Publish from "../Mypage/Components/Publish";
import "./index.scss";

import UserInfoTemplate from "../Mypage/Components/UserInfoTemplate";

export default function View(props) {
  const { intl, profile, publisheds, match } = props;

  return (
    <Layout>
      <div className="Page--Userpage">
        <div className="Userpage_Inner">
          {profile && (
            <UserInfoTemplate
              type="User"
              userInfo={profile}
              match={match}
              intl={intl}
            />
          )}

          <section className="Mypage__ActivitySection">
            <Publish intl={intl} match={match} publisheds={publisheds} />
          </section>
        </div>
      </div>
    </Layout>
  );
}
