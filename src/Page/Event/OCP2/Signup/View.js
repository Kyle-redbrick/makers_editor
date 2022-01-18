import React from "react";
import Layout from "../../../../Common/Component/Layout";
import signupImg from "../Assets/signup.png";
// import signupImg from "../Assets/signupEnd.png";
import "./index.scss";

export default function View(props) {
  const { handleSignup } = props;
  return (
    <Layout>
      <div className="Page--OCPEventSignUp">
        <div className="OCPEventSignUp_Inner">
          <img src={signupImg} alt="img" className="singUpImg" />
          <div className="OCPEventSignUp-btn" onClick={handleSignup} />
        </div>
      </div>
    </Layout>
  );
}
