import React from "react";
import Layout from "../../../../Common/Component/Layout";
// import signupImg from "../Assets/signup.png";
import signupImg from "../Assets/signupEnd.png";
import "./index.scss";

export default function View(props) {
  const { users } = props;
  return (
    <Layout>
      <div className="Page--OCPEventSignUp">
        <div className="OCPEventSignUp_Inner">
          <img src={signupImg} alt="img" className="singUpImg" />
          <div className="signUpUserList">
            {users.map((user, i) => {
              return <span key={i}>{user}</span>;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
