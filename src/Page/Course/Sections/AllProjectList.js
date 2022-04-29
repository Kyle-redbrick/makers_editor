// import React from "react";
// import { Link } from "react-router-dom";
// import styled from "@emotion/styled";
// import slideSampleImg from "../../../Image/bingopopup2.png";
// import lockImg from "../../../Image/project-lock.svg";
// import { URL } from "../../../Common/Util/Constant";


// const AllProjectListWrap = styled.div`
//   width: 1170px;
//   height: 100%;
//   margin: 0 auto 52px;
// `
// const AllProjectListTitle = styled.div`
//   font-weight: bold;
//   font-size: 30px;
//   line-height: 44px;
//   letter-spacing: -1px;
//   color: #FFFFFF;
//   margin: 63px 0 30px;
//   span {
//     color: #FF6F44;
//     margin-left: 12px;
//   }
// `

// const ProjectList = styled.div`
//   width: calc(100% + 30px);
//   display: flex;
//   flex-wrap: wrap;
//   margin-left: -15px;
// `

// const ProjectBox = styled.div`
//   position: relative;
//   width: 270px;
//   margin: 0 10px 54px;
//   cursor: pointer;

//   ${(props) => props.lock && `
//     &::after {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 276px;
//       height: 366px;
//       background: url(${lockImg}) no-repeat center/cover;
//     }
//   `}
// `
// const ProjectImg = styled.img`
//   width: 100%;
//   height: 360px;
//   border: 1px solid #3C3C3C;
//   border-radius: 16px;
//   object-fit: cover;
//   display: block;
// `
// const ProjectLevel = styled.div`
//   position: absolute;
//   top: 14px;
//   left: 12px;
//   width: 59px;
//   height: 29px;
//   font-weight: 500;
//   font-size: 15px;
//   line-height: 22px;
//   text-align: center;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   background: #F86033;
//   border: 2.2px solid #FD8F51;
//   border-radius: 6px;
// `
// const ProjectType = styled.div`
//   position: absolute;
//   top: 14px;
//   left: 80px;
//   width: 40px;
//   height: 29px;
//   font-weight: 500;
//   font-size: 15px;
//   line-height: 22px;
//   text-align: center;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   background: #2A2A2A;
//   border: 2.2px solid #565656;
//   border-radius: 6px;
// `
// const ProjectInfo = styled.div`
//   margin: 17px 0 5px;
// `
// const ProjectName = styled.div`
//   width: 100%;
//   font-weight: 500;
//   font-size: 18px;
//   line-height: 32px;
//   letter-spacing: -1px;
//   color: #ffffff;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `

// const ProjectDetail = styled.div`
//   display: flex;
//   margin: 12px 0 0;
// `

// const ProjectState = styled.span`
//   margin-right: 10px;
//   padding: 0px 9px;
//   line-height: 25px;
//   text-align:center;
//   font-weight: 500;
//   font-size: 14px;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   border-radius: 6px;

//   ${(props) => props.state === "complete" && `
//     border: 1px solid #ffffff;
//   ` }

//   ${(props) => props.state === "proceeding" && `
//     border: 1px solid #FFC52F;
//     color: #FFC52F;
//   ` }
// `
// const ProjectTotal = styled.span`
//   font-size: 16px;
//   color: #8E8E8E;
// `

// const AllProjectList = (props) => {
//   return (
//     <AllProjectListWrap>
//       <AllProjectListTitle>모든 과정 <span>{props.courses.length}</span></AllProjectListTitle>
//       <ProjectList>
//         {/* 잠긴 프로젝트인 경우 ProjectBox에 props lock 값 true */}
//         {props.courses.map((item, i) => (
//           <Link style={{"textDecoration": "none"}} key={i}  to={!item.unlocked ? ``:`/course/${item.lectureId}`}>
//             <ProjectBox lock={!item.unlocked}>
//               <ProjectImg src={URL.S3_DREAMCLASS + item.imgs.v}/>
//               <ProjectLevel>{item.category}</ProjectLevel>
//               <ProjectType>{item.lectureType}</ProjectType>
//               <ProjectInfo>
//                 <ProjectName>{item.title}</ProjectName>
//                 {/* 완료 : complete, 진행중 : proceeding */}
//                 <ProjectDetail>
//                   <ProjectState state={item.completed_project == item.project_count ? "complete" : (item.completed_project = 0 ? "" : "proceeding") }>
//                   {item.completed_project == item.project_count ? "완료" : (item.completed_project = 0 ? "" : "진행중") }
//                   </ProjectState>
//                   <ProjectTotal>총 {item.project_count}차시</ProjectTotal>
//                 </ProjectDetail>
//               </ProjectInfo>
//             </ProjectBox>
//           </Link>
//         ))}
//       </ProjectList>
//     </AllProjectListWrap>
//   )
// }

// export default AllProjectList;