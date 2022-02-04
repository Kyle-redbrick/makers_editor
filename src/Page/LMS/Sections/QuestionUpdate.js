import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux"; import styled from "@emotion/styled";
import { putQna } from "../api";
import * as request from "../../../Common/Util/HTTPRequest";
import * as Popup from "../../../Common/Component/PopUp";

import Button from "../Components/Button";

import { COLOR } from "./../Constants";
import { IMAGE } from "./../Constants/Images";
import AlertPopup from "../Components/AlertPopup"
import { FormattedMessage, injectIntl } from "react-intl";

const Self = styled.div`
  flex: 1; 

  @media screen and (max-width: 1334px){
    width: 88.33vw;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.45;
  text-align: center;
  color: #fff;
  padding-top: 28px;
  padding-bottom: 19.5px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  margin-bottom: 19.5px;
  position: relative;

  @media screen and (max-width: 1334px){
    padding-top: 0;
  }
`

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
`

const Form = styled.form``;

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const TitleInput = styled.input`
  width: 100%;
  padding: 16px 16px 14px;
  border-radius: 10px;
  background-color: #1c1c1c;
  border: none;
  font-size: 16px;
  line-height: 1.38;
  color: #fff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9e9e9e;
  }
`;

const TypeSelect = styled.div`
  width: 100%;
  height: 52px;
  padding: 16px;
  border-radius: 10px;
  background-color: #1c1c1c;
  font-size: 16px;
  line-height: 1.38;
  color: ${(props) => props.selected ? '#fff' : COLOR.ORANGE};
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 1334px){
    height: auto;
  }
`

const IconSelect = styled.div`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${IMAGE.ICON_SELECT});
  position: absolute;
  right: 16px;
  top: 16px;
`

const SelectOptions = styled.div`
  position: absolute;
  top: 62px;
  left: 0;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  z-index: 10;
  display: ${(props) => props.active ? 'block' : 'none'};
`

const Option = styled.div`
  padding: 14px 16px 12px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;

  ${(props) => props.selected && `
    background-color: rgba(255, 255, 255, 0.05);
  `}
`

const ContentTextArea = styled.textarea`
  width: 100%;
  height: 156px;
  padding: 16px;
  border-radius: 10px;
  background-color: #1c1c1c;
  border: none;
  font-size: 16px;
  line-height: 1.38;
  color: #fff;
  resize: none;
  overflow: auto;
  font-family: "Noto Sans KR", sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9e9e9e;
  }
`;

const ButtonWrap = styled.div`
  text-align: right;
  padding-top: 10px;

  @media screen and (max-width: 1334px){
    text-align: center;
    margin-bottom: 30px;
  }
`

const InputWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 170px;
  height: 45px;
  margin: 0 10px 10px 0;
  padding: 0 12px 0 3px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  /* pointer-events: none; */
`
const ImgIcon = styled.img`
  width: 20px;
  height: 16px;
  /* background-color: rgba(255, 255, 255, 0.5); */
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${IMAGE.ICON_IMAGE});
  border-radius: 3px;
  pointer-events: none;
`
const DeleteIcon = styled.img`
  width: 12px;
  height: 12px;
  /* object-fit: contain; */
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${IMAGE.ICON_DELETE});
  cursor: pointer;
  margin-right: 22px;
`

const ButtonText = styled.div`
  height: 14px;
  margin: 11px 0 9px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 14px;
  pointer-events: none;
`
const HelperText = styled.div`
  width: 253px;
  height: 22px;
  margin: 7px 478px 15px 10px;
  font-size: 14px;
  line-height: 1.57;
  color: rgba(255, 255, 255, 0.5);
`
const UploadFile = styled.div`
  display: flex;
  align-items: center;
  width: 870px;
  height: 56px;
  margin: 10px 0 0;
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
`
const TextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const UploadFileText = styled.span`
  font-size: 14px;
  line-height: 1.57;
  color: #9e9e9e;
`
const SubmitButton = styled(Button)`
  background-color: ${COLOR.ORANGE};
`;

const popupConfig = {
  dismissButton: false,
  dismissOverlay: true,
  defaultPadding: false,
  darkmode: true,
  mobileFullscreen: true,
  overflow: true,
}

const File = props => {
  const { id, accept, values, onChange, intl } = props;
  const fileInputRef = useRef();
  return (
    <div>
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={e => {
          if (values.length === 4) {
            alert(intl.formatMessage({ id: "ID_QNA_UPLOAD_IMAGE_HELP_TEXT" }));
            return;
          }
          const selectedFile = e.target.files[0];
          if (!selectedFile) return;

          let size = formatBytes(selectedFile.size)

          const data = new FormData();
          data.append("file", selectedFile);
          request
            .dreamUpload(data)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                onChange([...values, { url: "/" + json.key, size }]);
              } else {
                throw json;
              }
            })
            .catch(err => {
              alert(JSON.stringify(err));
            });
        }}
        hidden
      />
      <InputWrap
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        <ImgIcon />
        <ButtonText>
          <FormattedMessage id="ID_QNA_UPLOAD_IMAGE"/>
        </ButtonText>
      </InputWrap>
    </div>
  );
}

const QnaUpdate = ({ item, ...props}) => {
  let history = useHistory();

  const { intl } = props;

  const TYPES = [
    intl.formatMessage({ id: "ID_QNA_QUETION_TYPE_STUDY" }),
    intl.formatMessage({ id: "ID_QNA_QUETION_TYPE_TECH" })
  ];

  const [qnaForm, setQnaForm] = useState({
    content: item.content,
    title: item.title,
    type: item.type === "learning" ? TYPES[0] : TYPES[1],
  });

  const [showOptions, setShowOptions] = useState(false);
  const [images, setImages] = useState(item.imageJSON ? JSON.parse(item.imageJSON) : []);

  const handleSubmitUpdate = async () => {

    try {
      const result = await putQna({
        ...qnaForm,
        type: qnaForm.type.includes("학습") ? "learning" : "tech",
        questionId: item.id,
        imageJSON: images.length ? JSON.stringify(images.map(image => image)) : null
      });

      history.push("/lms/questions");
      return result;
    } catch (error) {
      window.alert("네트워크 에러입니다.");
    }
  };

  const handleChangeQnaForm = (e) => {
    setQnaForm({
      ...qnaForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeType = (type) => {
    setQnaForm({
      ...qnaForm,
      type,
    });

    setShowOptions(false);
  };

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const toggleOptions = useCallback(() => {
    setShowOptions(!showOptions);
  }, [showOptions]);

  const deleteUploadImage = index => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <Self {...props}>
      <Title>
        <PageBack onClick={goBack} />
        <FormattedMessage id="ID_QNA_MODE_NEW_QUESTION"/>
      </Title>
      <Form onSubmit={e => {
        e.preventDefault();
        Popup.showPopUp(
          <AlertPopup
            message={intl.formatMessage({id: "ID_QNA_QUESTION_EDIT_ALERT"})}
            onSubmit={() => handleSubmitUpdate()}
          />,
          popupConfig
        );
      }
      }> <FormGroup>
          <TypeSelect
            selected={qnaForm.type !== ""}
            onClick={toggleOptions}
          >
            {qnaForm.type || <FormattedMessage id="ID_QNA_SELECT_QUETION_TYPE"/>}
            <IconSelect />
            <SelectOptions active={showOptions}>
              {TYPES.map((type) => (
                <Option
                  key={type}
                  onClick={() => handleChangeType(type)}
                  selected={qnaForm.type === type}
                >
                  {type}
                </Option>
              ))}
            </SelectOptions>
          </TypeSelect>
        </FormGroup>
        <FormGroup>
          <TitleInput
            name="title"
            value={qnaForm.title}
            onChange={handleChangeQnaForm}
            placeholder={ intl.formatMessage({ id: "ID_QNA_TITLE_PLACEHOLDER" })}
            required
          />
        </FormGroup>
        <FormGroup>
          <ContentTextArea
            name="content"
            value={qnaForm.content}
            onChange={handleChangeQnaForm}
            placeholder={ intl.formatMessage({ id: "ID_QNA_TEXT_PLACEHOLDER" })}
            required
          />
        </FormGroup>
        <FormGroup>
          <File values={images} onChange={setImages} accept=".jpg,.jpeg,.png" />
          <HelperText>
            * <FormattedMessage id="ID_QNA_UPLOAD_IMAGE_HELP_TEXT"/>
          </HelperText>
        </FormGroup>
        {images.length && (
          images.map((image, index) => (
            <UploadFile key={index} onClick={() => deleteUploadImage(index)}>
              <DeleteIcon />
              <TextWrap>
                <UploadFileText>{image.url.replace("/", "")}</UploadFileText>
                <UploadFileText>{image.size}</UploadFileText>
              </TextWrap>
            </UploadFile>
          ))
        )}
        <ButtonWrap>
          <SubmitButton type="submit" width={150} height={50}><FormattedMessage id="ID_COURSE_DETAIL_EDIT" /></SubmitButton>
        </ButtonWrap>
      </Form>
    </Self>
  );
};

export default connect(
  (state) => ({
    userId: state.userinfo.id,
    email: state.userinfo.email
  }),
  {}
)(injectIntl(QnaUpdate));


function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}