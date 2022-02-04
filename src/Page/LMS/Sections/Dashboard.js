import React, { memo, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Course, RecommendedProject, TodayQuest } from "../../../models";

import { getDashboard, getMyCourses, getRecommendProject } from "../api";

import Button from "../Components/Button";
import Title from "../Components/Title";

import { COLOR, renderTypeColor, DEFAULT_PROJECT_ID } from "./../Constants";
import { IMAGE, renderCircularIcon } from "./../Constants/Images";

const Self = styled.div`
  flex: 1;
  padding-bottom: 70px;

  @media screen and (max-width: 1169px) {
    padding-bottom: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;

  @media screen and (max-width: 1169px) {
    margin: 0;
  }
`;

const Col = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;

  ${(props) => props.col === 2 && `width: 500px;`}
  ${(props) => props.col === 1 && `width: 400px;`}

  @media screen and (max-width: 1169px) {
    padding: 0;
    width: 88.33vw;
    margin: 0 auto;
  }
`;

const Widget = styled.div`
  padding: 20px;
  border-radius: 16px;
  background-color: #1c1c1c;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;

  ${(props) => props.height == 3 && `height: 460px;`}

  ${(props) => props.graph &&
    `
    padding: 0;
    flex-direction: row;
  `}

  ${(props) => props.recommend && `
    position: relative;
    padding: 10px;
    flex-direction: row;
  `}

  @media screen and (max-width: 1169px) {
    padding: 16px;

    ${(props) => props.recommend && `flex-direction: column;`}

    ${(props) => props.graph && `flex-direction: column;`}
  }
`;

const WidgetTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
`;

const WidgetBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Greeting = styled.div`
  flex: 1;

  @media screen and (max-width: 1169px) {
    padding-bottom: 15.8px;
  }
`;

const TodayDreamPointMessage = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 1.45;
  color: #ffffff;
`

const StrongBits = styled.strong``;

const TotalDreamPointWrap = styled.div`
  height: 36px;
  padding-right: 12px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.1);
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`

const RankingIcon = styled.img`
  width: 36px;
  height: 36px;
`

const TotalDreamPoint = styled.span`
  margin-left: 4px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
`

const BIT = styled.span`
  margin-left: 4px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
`

const GreetingIntro = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: #fff;
  margin-bottom: 10px;
`;

const GreetingMessage = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.45;
  color: #fff;
`;

const User = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 19.5px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 1169px) {
    padding-top: 15.8px;
    padding-bottom: 38.5px;
  }
`;

const UserIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.image});
`;

const UserInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  @media screen and (max-width: 1169px) {
    margin-left: 19px;
  }
`;

const UserName = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 7px;

  @media screen and (max-width: 1169px) {
    max-width: calc(88.33vw - 32px - 60px - 19px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// const UserEmail = styled.div`
//   font-size: 13px;
//   font-weight: 500;
//   line-height: 1.15;
//   color: rgba(255, 255, 255, 0.5);

//   @media screen and (max-width: 1169px) {
//     max-width: calc(88.33vw - 32px - 60px - 19px);
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
// `;

const QuestsEmpty = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const QuestsEmptyTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: #fff;
  margin-bottom: 5px;
`;

const QuestsEmptyDesc = styled.p`
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.1px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;
`;

const Quests = styled.div`
  flex: 1;
  max-height: 186px;
  overflow: auto;

  @media screen and (max-width: 1169px) {
    max-height: unset;
    margin-bottom: 34px;
  }
`;

const QuestItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10.5px 0 12.5px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  &:first-child {
    padding-top: 0;
    border-top: none;
  }
  &:last-child {
    padding-bottom: 0;
  }
`;

const Radio = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: solid 1px rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  ${(props) => props.active && `border: solid 1px ${COLOR.ORANGE};`}
`;

const RadioInner = styled.div`
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  ${(props) => props.active && `background-color: ${COLOR.ORANGE};`}
`;

const QuestProgressWrap = styled.div`
  margin-bottom: -3px;
  display: flex;
  align-items: center;
`;

const QuestProgressPercent = styled.div`
  font-size: 24px;
  line-height: 1;
  color: #fff;
  flex: 1;

  @media screen and (max-width: 1169px) {
    margin-right: 28px;
  }
`;

const QuestProgress = styled.div`
  width: 250px;
  height: 20px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 1169px) {
    width: 57.5vw;
  }
`;

const QuestProgressBar = styled.div`
  width: ${(props) => props.percent}%;
  height: 20px;
  border-radius: 6px;
  background-color: ${COLOR.ORANGE};

  @media screen and (max-width: 1169px) {

  }
`;

const RecommendImage = styled.div`
  width: 243px;
  height: 137px;
  border-radius: 8px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.image});

  @media screen and (max-width: 1169px) {
    width: 100%;
    height: 45vw;
    border-radius: 8px;
  }
`;

const RecommendBody = styled.div`
  padding: 10px 0 0 20px;

  @media screen and (max-width: 1169px) {
    position: relative;
    padding: 11px 0 0;
  }
`;

const RecommendSubtitle = styled.div`
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
`;

const RecommendIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) =>
    props.type === "javascript" &&
    `
      background-image: url(${IMAGE.ICON_JS});
  `}

  ${(props) =>
    props.type === "python" &&
    `
      background-image: url(${IMAGE.ICON_PYTHON});
  `}

  ${(props) =>
    props.type === "oobc" &&
    `
      background-image: url(${IMAGE.ICON_PUZZLE});
  `}

  @media screen and (max-width: 1169px) {
    position: absolute;
    bottom: 0;
    width: 16px;
    height: 16px;
    margin: 0;
  }
`;

const RecommendTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 5px;

  @media screen and (max-width: 1169px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const RecommendDesc = styled.div`
  display: flex;
  margin-top: 10px;

  @media screen and (max-width: 1169px) {
  }
`;

const RecommendDescText = styled.div`
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.1px;
  color: rgba(255, 255, 255, 0.75);

  @media screen and (max-width: 1169px) {
    margin-left: 21px;
  }
`;

const RecommendArrowIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;

  @media screen and (max-width: 1169px) {
    display:none;
  }
`;

const GraphProgressWrap = styled.div`
  width: 311.5px;
  padding: 20px;

  @media screen and (max-width: 1169px) {
    width: 100%;
    margin-bottom: 20px;
    padding: 0;
  }
`;

const ProgressTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.45;
  color: #fff;
`;

const GraphProgress = styled.div`
  width: 100%;
  height: 18px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-top: 47px;
  margin-bottom: 15px;
  position: relative;
`;

const GraphProgressBar = styled.div`
  height: 18px;
  border-radius: 5px;
  background-color: ${COLOR.MINT};
  width: ${(props) => props.value}%;
`;

const GraphProgressIcon = styled.img`
  width: 32px;
  position: absolute;
  top: -37px;
  left: ${(props) => (props.value > 10 ? `calc(${props.value}% - 32px)` : "0%")};
`;

const GraphProgressPercent = styled.div`
  font-size: 24px;
  line-height: 1;
  color: #fff;
`;

const CircularWrap = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  flex: 1;
  
  &:before {
    content: '';
    width: 100%;
    order: 1;
  }

  &:after {
    content: '';
    width: 33.33%;
    order: 2;
  }

  @media screen and (max-width: 1169px) {
    flex-direction: column;

    & > div + div {
      margin-top: 30px;
    }
  }
`;

const CircularItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 220px;
  position: relative;

  &:first-child{
    &:before {
      content: "";
      width: 1px;
      height: 160px;
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      left: 0;
      top: 30px;
    }
  }

  &:nth-child(4){
    &:before {
      content: "";
      width: 1px;
      height: 160px;
      background: rgba(255, 255, 255, 0.1);
      position: absolute;
      left: 0;
      top: 30px;
    }
  } 
  &:nth-child(n + 4) {
    order: 1;
  }

  &:nth-child(n + 8) {
    order: 2;
  }

  @media screen and (max-width: 1169px) {
    &:before {
      display: none;
    }
  }
`;

const CircularTitle = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  color: #fff;
`;

const CircularIcon = styled.img`
  margin-bottom: 5px;
  width: 33px;
`;

const CircularText = styled.div`
  font-size: 24px;
  line-height: 1;
  color: #fff;
`;

const CircularProgressBarComponent = memo(({ value, color, icon }) => {
  return (
    <CircularProgressbarWithChildren
      value={value}
      strokeWidth={8}
      styles={{
        root: {
          display: "flex",
          width: "120px",
          height: "120px",
        },
        path: {
          stroke: color,
          strokeLinecap: "round",
        },
        trail: {
          stroke: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <CircularIcon src={icon} alt="진행률 아이콘" />
      <CircularText>{value}%</CircularText>
    </CircularProgressbarWithChildren>
  );
});

const QuestItemComponent = memo(({ active, children }) => {
  return (
    <QuestItem>
      <Radio active={active}>
        <RadioInner active={active} />
      </Radio>
      {children}
    </QuestItem>
  );
});

const getMyCourseProgress = courses => {
  return courses.map(course => course.lectures.reduce((total, { projects }) => {
    for (let project of projects) {
      if (project.myProject && project.myProject.completedAt) {
        total += 1;
      }
    }
    return total;
  }, 0));
}


const findRecommendProject = async (data) => {
  let recommendProjectId = DEFAULT_PROJECT_ID;
  findRecommendProjectLoop:
  for (let course of data) {
    for (let lecture of course.lectures) {
      for (let project of lecture.projects) {
        if (project.myProject) {
          if (!project.myProject.completedAt) {
            recommendProjectId = project.id;
            break findRecommendProjectLoop;
          }
        } else {
          recommendProjectId = project.id;
          break findRecommendProjectLoop;
        }
      }
    }
  }

  return await getRecommendProject(recommendProjectId)
}

const Dashboard = ({ ...props }) => {
  // const [cardsCount, setCardsCount] = useState(0);
  // const [myCardsCount, setMyCardsCount] = useState(0);
  const [courseProgress, setCourseProgress] = useState(0);
  const [coursesForProgress, setCoursesForProgress] = useState([]);
  // const [recentMyCards, setRecentMyCards] = useState([]);
  const [recommendedProject, setRecommendedProject] = useState({});
  const [todayQuests, setTodayQuests] = useState([]);
  const [todayQuestsCompletedCount, setTodayQuestsCompletedCount] = useState(0);
  const [totalDreamPoint, setTotalDreamPoint] = useState(0);
  const [todayCompletedDreamPoint, setTodayCompletedDreamPoint] = useState(0);

  useEffect(() => {
    console.log("useEffect")

    init();
  }, []);

  const init = async () => {
    const dashboard = await getDashboard({ email: props.email });
    console.log("dashboard", dashboard)
    const myCourses = await getMyCourses({ userId: props.userId })
    console.log("myCourses", myCourses)
    const courseProgress = getMyCourseProgress(myCourses);
    const recommendProject = await findRecommendProject(myCourses);
    console.log("recommendProject", recommendProject)



    // setCardsCount(dashboard.cardsCount);
    setCourseProgress(courseProgress.reduce((total, progress) => total += progress));
    setCoursesForProgress(myCourses.map((course) => new Course(course)));
    // setMyCardsCount(dashboard.myCardsCount);
    // setRecentMyCards(dashboard.myCardsRecent.map(({ card }) => new MyCard(card)));
    setTodayQuests(dashboard.todayAchievements.map((qt) => new TodayQuest(qt)));
    setRecommendedProject(new RecommendedProject({
      title: recommendProject.localized[0] && recommendProject.localized[0].title,
      thumbnailURL: recommendProject.lecture.localized[0] && recommendProject.lecture.localized[0].h_thumbnailURL,
      pathname: `/course/${recommendProject.lecture.id}`,
      lecture: recommendProject.lecture
    })
    );

    setTotalDreamPoint(dashboard.totalDreamPoint);
    setTodayCompletedDreamPoint(dashboard.todayCompletedAchievements.reduce(((total, { achievement }) => total += achievement.rewardPoint), 0));

    let _todayQuestsCompletedCount = 0;
    dashboard.todayAchievements.forEach((quest) => {
      if (quest.complete) {
        _todayQuestsCompletedCount++;
      }
    });
    setTodayQuestsCompletedCount(_todayQuestsCompletedCount);
  };

  return (
    <Self {...props}>
      <Title hidden={props.isMobile}><FormattedMessage id="ID_DREAM_LMS_TITLE" /></Title>
      <Row>
        <Col col={2}>
          <Widget height={props.isMobile ? "auto" : 290}>
            <WidgetTitle><FormattedMessage id="ID_DREAM_LMS_TODAY" /></WidgetTitle>
            <WidgetBody>
              <Greeting>
                <GreetingIntro>{props.name}, <FormattedMessage id="ID_DREAM_LMS_MESSAGE01" /></GreetingIntro>
                {todayCompletedDreamPoint ? (
                  <>
                    <TodayDreamPointMessage>
                      <FormattedMessage id="ID_DREAM_LMS_MESSAGE02" /> <StrongBits>{todayCompletedDreamPoint.toLocaleString()}BITS</StrongBits> <FormattedMessage id="ID_DREAM_LMS_MESSAGE03" />
                    </TodayDreamPointMessage>
                    <TotalDreamPointWrap>
                      <RankingIcon src={IMAGE.ICON_RANK} alt="rank" />
                      <TotalDreamPoint>{totalDreamPoint.toLocaleString()}</TotalDreamPoint>
                      <BIT>BITS</BIT>
                    </TotalDreamPointWrap>
                  </>
                ) : (
                  <GreetingMessage><FormattedMessage id="ID_DREAM_LMS_MESSAGE04" /></GreetingMessage>
                )}
              </Greeting>
              <User>
                <UserIcon image={props.userIcon} />
                <UserInfo>
                  <UserName>{props.name}</UserName>
                </UserInfo>
                <StyledLink to="/mypage">
                  <Button
                    type="button"
                    width={props.isMobile ? 92 : 130}
                    style={{ position: props.isMobile ? "absolute" : "static", left: "79px", bottom: 0, fontSize: "14px" }}
                  >
                    <FormattedMessage id="ID_DREAM_LMS_MYPAGE" />
                  </Button>
                </StyledLink>
              </User>
            </WidgetBody>
          </Widget>
        </Col>
        <Col col={1}>
          <Widget height={props.isMobile ? "auto" : 290}>
            <WidgetTitle><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL" /></WidgetTitle>
            <WidgetBody>
              {todayQuests.length ? (
                <>
                  <Quests>
                    {todayQuests.map((quest) => (
                      <QuestItemComponent key={quest.title} active={quest.complete}>{quest.title}</QuestItemComponent>
                    ))}
                  </Quests>
                  <QuestProgressWrap>
                    <QuestProgressPercent>
                      {((todayQuestsCompletedCount / todayQuests.length) * 100).toFixed(0)}%
                    </QuestProgressPercent>
                    <QuestProgress>
                      <QuestProgressBar percent={(todayQuestsCompletedCount / todayQuests.length) * 100} />
                    </QuestProgress>
                  </QuestProgressWrap>
                </>
              ) : (
                <QuestsEmpty>
                  <QuestsEmptyTitle><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_TITLE" /></QuestsEmptyTitle>
                  <QuestsEmptyDesc><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_DESC" /></QuestsEmptyDesc>
                  <Button type="button" width={130}>
                    <FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_BUTTON" />
                  </Button>
                </QuestsEmpty>
              )}
            </WidgetBody>
          </Widget>
        </Col>
        <Col col={3}>
          <StyledLink
            to={{ pathname: recommendedProject.pathname }}
            target="_blank"
          >
            <Widget recommend height={props.isMobile ? "auto" : 157}>
              <RecommendImage image={recommendedProject.thumbnail && recommendedProject.thumbnail.toDreamclassS3URL()} />
              <RecommendBody>
                <WidgetTitle><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_RECOMMEND_QUEST_TITLE" /></WidgetTitle>
                <WidgetBody>
                  <RecommendSubtitle><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_RECOMMEND_QUEST_SUBTITLE" /></RecommendSubtitle>
                  <RecommendTitle>{recommendedProject.title}</RecommendTitle>
                  <RecommendDesc>
                    <RecommendIcon
                      type={
                        recommendedProject.lecture &&
                        recommendedProject.lecture.course &&
                        recommendedProject.lecture.course.type
                      }
                    />
                    <RecommendDescText>
                      {recommendedProject.lecture && recommendedProject.lecture.title}
                    </RecommendDescText>
                  </RecommendDesc>
                </WidgetBody>
                <RecommendArrowIcon src={IMAGE.LMS_RECOMMEND_ARROW} />
              </RecommendBody>
            </Widget>
          </StyledLink>
        </Col>
        <Col>
          <Widget graph height={props.isMobile ? "auto" : 220}>
            <GraphProgressWrap>
              <WidgetTitle><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_GRAPH" /></WidgetTitle>
              <WidgetBody>
                <ProgressTitle><FormattedMessage id="ID_DREAM_LMS_TODAY_GOAL_PROGRESS_TITLE" /></ProgressTitle>
                <GraphProgress>
                  <GraphProgressIcon value={courseProgress} src={IMAGE.ICON_PROGRESS} alt="달성도 아이콘" />
                  <GraphProgressBar value={courseProgress} />
                </GraphProgress>
                <GraphProgressPercent>{courseProgress}%</GraphProgressPercent>
              </WidgetBody>
            </GraphProgressWrap>
            <CircularWrap>
              {coursesForProgress.map((course) => (
                <CircularItem key={course.id}>
                  {console.log(course)}
                  <CircularProgressBarComponent
                    value={course.progress}
                    color={renderTypeColor(course.type)}
                    icon={renderCircularIcon(course.type)}
                  />
                  <CircularTitle>{course.title}</CircularTitle>
                </CircularItem>
              ))}
            </CircularWrap>
          </Widget>
        </Col>
      </Row>
    </Self>
  );
};

export default connect(
  (state) => ({
    userId: state.userinfo.id,
    userIcon: state.userinfo.icon,
    name: state.userinfo.name,
    email: state.userinfo.email,
  }),
  {}
)(Dashboard);
