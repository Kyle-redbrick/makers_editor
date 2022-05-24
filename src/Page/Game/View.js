import React from "react";
import Layout from "../../Common/Component/Layout";
import Search from "./Component/Search"
import Recent from "./Component/Recent"
import AllGames from "./Component/Default"
import Main from "./Component/Main"
import List from "./Component/List"
import "./index.scss";

function View(props) {
  const isSearchable = props.pageType === "main" || props.pageType === "search";
  return (
    <Layout isGame={true}>
      <div className="Page--Game">
        <Recent />
        <AllGames />
        {/* {isSearchable && <Search />} */}
        {/* {props.pageType === "main" ? <Main /> : <List />} */}
      </div>
    </Layout>
  );
}

export default View;
