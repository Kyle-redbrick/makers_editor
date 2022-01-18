import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import moment from "moment";
import styled from "@emotion/styled";
import { getQnaById } from "../api";
import { Question } from "../../../models";

import { COLOR } from "./../Constants";
import { IMAGE } from "./../Constants/Images";
import * as Popup from "../../../Common/Component/PopUp"
import ImagePopup from "../Components/ImagePopup";
import QuestionMore from './QuestionMore'
import Comments from '../Components/Comments'

const Self = styled.div`
  flex: 1;
  padding-bottom: 100px;

  @media screen and (max-width: 1169px){
    padding-bottom: 50px;
    width: 88.33vw;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  height: 79.5px;
  position: relative;
`;

const PageBack = styled.div`
  width: 32px;
  height: 32px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${IMAGE.ICON_BACK});
  position: absolute;
  left: 0;
  bottom: 19.5px;
  cursor: pointer;
`;

const Section = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  padding-top: 19.5px;
  padding-bottom: 39.5px;
`;

const SectionTitleWrap = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionSubTitleWrap = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  position: relative;
`

// const SettingIcon = styled.img`
//   width: 34px;
//   height: 34px;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-image: url(${IMAGE.ICON_SETTING});
//   cursor: pointer;
// `

const Tag = styled.div`
  margin-right: 10px;
  width: 58px;
  height: 26px;
  border-radius: 13px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.69;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.question &&
    `
    background-color: #5b5b5b;
  `}
  ${(props) =>
    props.answer &&
    `
    background-color: ${COLOR.MINT};
  `}
`;

const TagIcon = styled.img`
  width: 15px;
  margin-right: 3px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.78;
  color: #fff;
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  font-size: 16px;
  line-height: 1.38;
  text-align: right;
  color: rgba(255, 255, 255, 0.5);
`;

const SectionDesc = styled.div`
  padding: 20px;
  border-radius: 16px;
  background-color: #1c1c1c;
  font-size: 16px;
  line-height: 1.56;
  color: #fff;
  white-space: pre-wrap;
`;

const SectionText = styled.p`
  margin-bottom: 20px;
`

const SectionImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const SectionImage = styled.img`
  margin-right: 20px;
  max-width: 186px;
  max-height: 124px;
  border-radius: 10px;
  cursor: pointer;
`

const popupConfig = {
  dismissButton: false,
  dismissOverlay: true,
  defaultPadding: false,
  darkmode: true,
  mobileFullscreen: true,
  overflow: true,
}

const QnaById = (props) => {
  let { id } = useParams();
  let history = useHistory();

  const [qna, setQna] = useState({});
  const [images, setImages] = useState([]);

  const init = async () => {
    const _qna = await getQnaById({ id });
    setQna(new Question(_qna));

    if (_qna.imageJSON) {
      try {
        let images = JSON.parse(_qna.imageJSON)
        setImages(images)
      } catch (err) {
        setImages([])
        console.error(err)
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  const goBack = useCallback(
    () => {
      history.goBack();
    },
    [history]
  );


  // const fetchComments = useCallback(
  //   () => {
  //     getComments({ lectureId: courseId }).then((comments) => {
  //       setComments(comments.rows.map((c) => new Comment(c)));
  //     });
  //   },
  //   [getComments]
  // );

  // const onAfterCommentSubmit = useCallback(() => {
  //   fetchComments();
  // }, []);

  return (
    <Self {...props}>
      <Title>
        <PageBack onClick={goBack} />
      </Title>
      <Section>
        <SectionTitleWrap>
          <SectionTitle>
            {qna.title}
          </SectionTitle>
          <Date>{qna.createdAt && qna.formattedCreatedAt()}</Date>
        </SectionTitleWrap>
        <SectionSubTitleWrap>
          <QuestionMore item={qna} />
        </SectionSubTitleWrap>
        <SectionDesc>
          <SectionText>{qna.content}</SectionText>
          <SectionImages>
            {images.map(image => (
              <SectionImage
                key={image.url}
                src={image.url.toDreamclassS3URL()}
                alt={image.url}
                onClick={() => {
                  Popup.showPopUp(<ImagePopup value={image.url} />, popupConfig);
                }}
              />
            ))}
          </SectionImages>
        </SectionDesc>
      </Section>
      {qna.reply && (
        <Section>
          <SectionTitleWrap>
            <SectionTitle>
              <Tag answer>
                <TagIcon alt="답변 아이콘" src={IMAGE.ICON_ANSWER} />
                답변
              </Tag>
              {qna.reply.title}
            </SectionTitle>
            <Date>{qna.reply.formattedCreatedAt()}</Date>
          </SectionTitleWrap>
          {/* <SettingIcon /> */}
          <SectionDesc>{qna.reply.content}</SectionDesc>
        </Section>
      )}
        <Comments questionId={id} items={[]} onAfterSubmit={() => {}} />
    </Self>
  );
};

export default QnaById;
