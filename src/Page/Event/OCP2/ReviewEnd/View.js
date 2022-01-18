import React from "react";
import Layout from "../../../../Common/Component/Layout";
import reviewImg from "../Assets/review-end-page.png";
import "./index.scss";

export default function View(props) {
  return (
    <Layout>
      <div className="Page--OCPEventReview">
        <div className="OCPEventReview_Inner">
          <img src={reviewImg} alt="img" />
        </div>
      </div>
    </Layout>
  );
}
