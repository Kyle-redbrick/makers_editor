import React from "react";
import Layout from "../../Common/Component/Layout";
import Search from "./Component/Search"
import Recent from "./Component/Recent"
import AllGames from "./Component/AllGames"
import Main from "./Component/Main"
import List from "./Component/List"
import "./index.scss";

function View(props) {
  return (
    <Layout isGame={true}>
      <div className="Page--Game">
        <Recent />
        <AllGames />
      </div>
    </Layout>
  );
}

export default View;
