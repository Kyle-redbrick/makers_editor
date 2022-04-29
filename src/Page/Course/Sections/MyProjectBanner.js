// import React, { useState, useEffect,useCallback } from "react";
// import Slider from "react-slick";
// import styled from "@emotion/styled";
// import slideSampleImg from "../../../Image/bingopopup2.png";
// import prevIcon from "../../../Image/icon-slide-prev-new.svg";
// import nextIcon from "../../../Image/icon-slide-next-new.svg";
// import checkIcon from "../../../Image/icon-check.svg";
// import lockImg from "../../../Image/icon-check-l.svg"
// import lock2Img from "../../../Image/icon-check.svg";
// import arrowIcon from "../../../Image/icon-check.svg";
// import { URL } from "../../../Common/Util/Constant";
// import * as LearnButtons from "../../../Common/Component/Button/Learn";
// import GamePopup from "../../CourseDetail/Components/GamePopup";
// import * as Popup from "../../../Common/Component/PopUp";



// const MyProjectWrap = styled.div`
//   width: 100%;
//   height: 688px;
//   background: #121212;
// `
 
// const MyProject = styled.div`
//   width: 1170px;
//   height: 100%;
//   margin: 0 auto;
//   padding: 60px 28px 0 34px;
//   color: #FFFFFF;
// `

// const MyProjectHeader = styled.div`
//   display: flex;
//   align-items: flex-end;
//   margin-bottom: 46px;
//   color: #FFFFFF;
// `

// const ProjectTitle = styled.p`
//   margin-right: 24px;
//   font-weight: bold;
//   font-size: 32px;
//   line-height: 32px;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
// `

// const ProjectInfo = styled.p`
//   font-size: 16px;
//   letter-spacing: -0.03em;
//   line-height: 16px;
//   span {
//     margin: 0 12px;
//     color: #414141;
//   }
// `

// const MyProjectContent = styled.div`
//   display: flex;
//   justify-content: space-between;
// `

// const MyProjectSlider = styled.div`
//   position: relative;
//   width: 360px;
//   height: 458px;
//   border-radius: 16px;

//   .slick-arrow.slick-prev {
//     position: absolute;
//     width:74px;
//     height:74px;
//     left: -37px;
//     background: url(${prevIcon}) no-repeat center/cover;
//   }
//   .slick-arrow.slick-next {
//     position: absolute;
//     width:74px;
//     height:74px;
//     right: -37px;
//     background: url(${nextIcon}) no-repeat center/cover;
//   }
// `

// const MyProjectSlide = styled.div`
//   position: relative;
//   width: 100%;
//   height: 458px;
//   border-radius: 16px;
//   overflow: height;

//   ${(props) => props.bgImg && 
//     `background: url(${props.bgImg}) no-repeat center/cover;`
//   }

//   ${(props) => props.lock && `
//     &::after {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 458px;
//       background: url(${lock2Img}) no-repeat center/cover;
//     }
//   `}
// `

// const MyProjectLevel = styled.div`
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

// const MyProjectType = styled.div`
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

// const SlideNum = styled.div`
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
//   bottom: 14px;
//   background: red;
//   width: 48px;
//   height: 24px;
//   background: rgba(0, 0, 0, 0.50);
//   border-radius: 50px;
//   letter-spacing: -0.03em;
//   font-size: 14px;
//   text-align: center;
//   color: #FFFFFF;
//   z-index: 1;
// `

// const MyProjectLevelList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: calc(670px + 24px);
//   height: 458px;
//   margin-left: -24px;
// `

// const MyProjectCard = styled.div`
//   position: relative;
//   box-sizing: border-box;
//   width: 207px;
//   height: 217px;
//   margin: 0 12px 24px;
//   background: #383838;
//   border-radius: 16px;
//   overflow: hidden;
//   cursor: pointer;
//   border: 5px solid #383838;


//   ${(props) => props.active && 
//     `border: 5px solid #FFC52F;`
//   }

//   ${(props) => props.lock && `
//     &::after {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 204px;
//       height: 111px;
//       background: url(${lockImg}) no-repeat center/cover;
//     }
//   `}

//   ${(props) => props.isShowBorder && `

//     border: 5px solid #FFC52F;
//   `}

// `

// const ProjectChapter = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 72px;
//   line-height: 38px;
//   background: #383838;
//   border-radius: 0 0 16px 0;
//   font-weight: bold;
//   font-size: 16px;
//   text-align: center;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   ${(props) => props.active && 
//     `
//       background: #FFC52F;
//       color: #2A2A2A;
//     `
//   }

//   ${(props) => props.isShowBorder && `
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 72px;
//     line-height: 38px;
//     background: #FFC52F;
//     border-radius: 0 0 16px 0;
//     font-weight: bold;
//     font-size: 16px;
//     text-align: center;
//     letter-spacing: -0.03em;
//     color: #2A2A2A;
//   `}
// `

// const ProjectImg = styled.img`
//   width: 201px;
//   height: 111px;
//   object-fit: cover;
// `

// const ProjectContent = styled.div`
//   box-sizing: border-box;
//   padding: 8px 14px;
// `

// const ProjectGraph = styled.div`
//   position: absolute;
//   bottom: 17px;
//   left: 14px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: calc(100% - 28px);
//   font-size: 13px;
//   letter-spacing: -0.03em;
//   color: #AEAEAE;
// `

// const GraphBarWrap = styled.div`
//   position: relative;
//   top: 2px;
//   width: 112px;
//   height: 8px;
//   background: #454545;
//   border-radius: 50px;
// `

// const GraphBar = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 0;
//   height: 8px;
//   background: #30B878;
//   border-radius: 50px;
//   ${(props) => props.width && 
//     `width: ${props.width}`
//   }
// `

// const ProjectComplete = styled.p`
//   position: absolute;
//   bottom: 17px;
//   left: 14px;
//   display: flex;
//   align-items: center;
//   font-size: 13px;
//   letter-spacing: -0.03em;
//   color: #AEAEAE;
//   border-radius: 50px;
//   img {
//     margin-right: 6px;
//   }
// `

// const ProjectName = styled.p`
//   padding: 0px 14px 4px 12px;
//   font-size: 15px;
//   line-height: 22px;
//   letter-spacing: -0.03em;
// `

// const ProjectDetail = styled.p`
//   padding: 0 14px 0 12px;
//   font-size: 14px;
//   line-height: 18px;
//   letter-spacing: -0.03em;
//   color: #C4C1C1;
// `

// const LearnAgain = styled(LearnButtons.LearnAgain)`
//   position: absolute;
//   left: 14px;
//   bottom: 46px;
//   width: 168px;
//   line-height: 46px;
//   background: #FF6F44;
//   border-radius: 8px;
//   font-weight: bold;
//   font-size: 18px;
//   text-align: center;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   cursor: pointer;

//   ${(props) => props.option === 'replay' && `
//     border: 2.2px solid #FF6F44;
//     box-sizing: border-box;
//     border-radius: 8px;
//     background: transparent;
//     color: #FF6F44;
//   `}

//   @media screen and (max-width: 1169px) {
//     width: 168px;
//     height: 46px;
//     font-size: 18px;
//     font-weight: bold;
//     text-align: center;
//   }
// `

// const LearnNow = styled(LearnButtons.LearnNow)`
//   position: absolute;
//   left: 14px;
//   bottom: 46px;
//   width: 168px;
//   line-height: 46px;
//   background: #FF6F44;
//   border-radius: 8px;
//   font-weight: bold;
//   font-size: 18px;
//   text-align: center;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   cursor: pointer;

//   ${(props) => props.option === 'replay' && `
//     border: 2.2px solid #FF6F44;
//     box-sizing: border-box;
//     border-radius: 8px;
//     background: transparent;
//     color: #FF6F44;
//   `}

//   @media screen and (max-width: 1169px) {
//     width: 168px;
//     height: 46px;
//     font-size: 18px;
//     font-weight: bold;
//     text-align: center;
//   }
// `

// const LearnContinue = styled(LearnButtons.LearnContinue)`
//   position: absolute;
//   left: 14px;
//   bottom: 46px;
//   width: 168px;
//   line-height: 46px;
//   background: #FF6F44;
//   border-radius: 8px;
//   font-weight: bold;
//   font-size: 18px;
//   text-align: center;
//   letter-spacing: -0.03em;
//   color: #FFFFFF;
//   cursor: pointer;


//   ${(props) => props.option === 'replay' && `
//     border: 2.2px solid #FF6F44;
//     box-sizing: border-box;
//     border-radius: 8px;
//     background: transparent;
//     color: #FF6F44;
//   `}

//   @media screen and (max-width: 1169px) {
//     width: 168px;
//     height: 46px;
//     font-size: 18px;
//     font-weight: bold;
//     text-align: center;
//   }
// `

// const ProjectGamePlay = styled.p`
//   display: flex;
//   position: absolute;
//   left: 50%;
//   bottom: 16px;
//   transform: translateX(-50%);
//   font-size: 14px;
//   line-height: 14px;
//   letter-spacing: -0.03em;
//   color: #C4C1C1;
//   cursor: pointer;
// `

// const MyProjectBanner = (props) => {
//   const [currentSlideNum, setCurrentSlideNum] = useState(1);
//   const [projects, setProjects] = useState([]);
//   const [projectCount, setProjectCount] = useState("");
//   const [title, setTitle] = useState("");
//   const [tag, setTag] = useState("");
//   const [isShown, setIsShown] = useState({isShow:false,index:0,lock:false});


//   useEffect(() => {
//     if(props.courses[currentSlideNum-1]){
//       setProjects(props.courses[currentSlideNum-1].projects)
//       setTitle(props.courses[currentSlideNum-1].title)
//       setTag(props.courses[currentSlideNum-1].tag)
//       setProjectCount(props.courses[currentSlideNum-1].project_count)
//     }
//   }, [currentSlideNum,props.courses]); 

//   const sliderSettings = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     dots: false,
//     infinite: true,
//     beforeChange: current => setCurrentSlideNum(current + 1),
//     afterChange: current => setCurrentSlideNum(current + 1)
//   };

//   const onclickItem = (bool,index,lock) => {
//     setIsShown({isShow:bool,index:index,lock:lock})
//   }

//   const handleClickGame = useCallback(
//     (sample) => {
//       Popup.showPopUp(<GamePopup url={sample} />, {
//         dismissButton: false,
//         dismissOverlay: true,
//         defaultPadding: false,
//         darkmode: true,
//         mobileFullscreen: true,
//         overflow: true,
//       });
//     },
//     [GamePopup, Popup.showPopUp]
//   );

//   return (
//     <MyProjectWrap>
//       <MyProject>
//         <MyProjectHeader>
//           <ProjectTitle>{title}</ProjectTitle>
//           <ProjectInfo>총 {projectCount}차시 <span>|</span>{tag}</ProjectInfo>
//         </MyProjectHeader>
//         <MyProjectContent>
//           <MyProjectSlider>
//             <Slider {...sliderSettings}>
//               {console.log("111",props.courses)}
//               {props.courses.map((course, i) => (
//                 // lock 프로젝트면 lock true
//                 <MyProjectSlide key={i} bgImg={URL.S3_DREAMCLASS + course.thumbnail} lock={course.unlocked}>
//                   <MyProjectLevel>{"course.title"}</MyProjectLevel>
//                   <MyProjectType>{"project.lectureType"}</MyProjectType>
//                 </MyProjectSlide>
//               ))}
//             </Slider>
//             <SlideNum>{currentSlideNum} / {props.courses.length}</SlideNum>
//           </MyProjectSlider>





//         </MyProjectContent>
//       </MyProject>
//     </MyProjectWrap>
//   )
// }

// export default MyProjectBanner;
