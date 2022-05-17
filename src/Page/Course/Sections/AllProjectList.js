import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import slideSampleImg from "../../../Image/bingopopup2.png";
import { URL } from "../../../Common/Util/Constant";

import AllCourse from "./AllCourse";
import "./AllProjectList.scss";

const AllProjectList = (props) => {
  return (
    <div className="all-course">
      <AllCourse {...props}/>
    </div>
  )
}

export default AllProjectList;