import React from "react";
import Layout from "../../Common/Component/Layout";
import Search from "./Component/Search"
import Main from "./Component/Main"
import List from "./Component/List"
import "./index.scss";

function View(props) {
  const isSearchable = props.pageType === "main" || props.pageType === "search";
  return (
    <Layout isGame={true}>
      <div className="Page--Game">
        {isSearchable && <Search />}
        {props.pageType === "main" ? <Main /> : <List />}
      </div>
    </Layout>
  );
}

export default View;
