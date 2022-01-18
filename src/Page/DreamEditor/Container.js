import React, { useState } from "react";
import { connect } from "react-redux";
import View from "./View";

function Container(props) {
  const editorEmails = ["chris@wizschool.io", "het@wizschool.io"];
  const isAuthorized = editorEmails.includes(props.userinfo.email);

  const [selectedElement, setSelectedElement] = useState(null);
  const onChangeSelectedElement = element => {
    setSelectedElement(element);
  };

  return (
    <View
      isLoggedIn={props.isLoggedIn}
      isAuthorized={true}
      selectedElement={selectedElement}
      onChangeSelectedElement={onChangeSelectedElement}
    />
  );
}

export default connect(state => {
  const { userinfo } = state;
  const isLoggedIn = !!userinfo.email;
  return { isLoggedIn, userinfo };
})(Container);
