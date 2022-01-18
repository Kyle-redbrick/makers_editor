import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import * as request from "../../../../../Common/Util/HTTPRequest"
import { URL } from "../../../../../Common/Util/Constant";
import "./index.scss";

import closeBtn from "../../../../../Image/newPython/python-popup-close-btn@2x.png";

import { playTabEffect, playButtonEffect } from "../../../Util/PlaySound";

const PythonCollection = props => {
  const { dismiss, isShowProjectItems, projectId} = props;
  const [selectedCollectionIdx, setSelectedCollectionIdx] = useState(0);
  const [selectedKeywordIdx, setSelectedKeywordIdx] = useState(0);
  const [itemBookList, setItemBookList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const selectedItemBook = collectionList[selectedKeywordIdx];

  useEffect(() => {
    getCategoryItemBook();
  }, []);

  const getCategoryItemBook = () => {
    request
    .getPythonCategoryItembooks()
    .then(res => res.json())
    .then(json => {
      setItemBookList(json)
      json.forEach((_itemBooks, index) => {
        if(index === selectedCollectionIdx) {
          setCollectionList(_itemBooks.itemBooks);
        }
      });
    })
    .catch(e => {
      console.error(e);
    });
  }


  const handleCollectionTabAt = index => {
    playTabEffect();
    setSelectedCollectionIdx(index);
    setCollectionList(itemBookList[index].itemBooks);
  };

  const collectionStatus = ({itemIndex, listProjectId}) => {
    let res = ""; // default open, selected false
    if(projectId === listProjectId && !isShowProjectItems) { // 현재의 프로젝트에서 획득가능한 아이템, 퀘스트 not cleared
      res = "lock"
    } else if(itemIndex === selectedKeywordIdx) { // 이전프로젝트에서 획득한 아이템 중에, selected체크
      res = "selected"
    }
    return res
  }

  const selectedItemBookAvailable = selectedItemBook &&  (
    selectedItemBook.dreamProjectId < projectId
    || (selectedItemBook.dreamProjectId === projectId && isShowProjectItems)
  )

  const getItemBookImage = (idx) => {
    if(collectionList[idx].localized[0].fileName !== ""){
      return `${URL.S3_DREAMCLASS}/${collectionList[idx].localized[0].fileName}`
    } else {
      return `${URL.S3_DREAMCLASS}/${collectionList[idx].fileName}`
    }
  }

  return (
    <div className="pythonCollectionPopup">
      <div className="popupTitle">
        <p className="titleName">{props.intl.formatMessage({ id: "ID_PYTHON_COLLECTION_TITLE" })}</p>
        <img
          className="closePopupBtn"
          onClick={() => dismiss()}
          src={closeBtn}
          alt="close button"
        />
      </div>
      <div className="popupBody">
        <div className="selectedCollectionWrapper">
          {selectedItemBook && (
            <>
              <p className="title">
                {selectedItemBookAvailable
                  ? selectedItemBook.localized[0]
                    ? selectedItemBook.localized[0].itemName
                    : selectedItemBook.itemName
                  : "???"
                }
              </p>
              <div className="detail">
                {selectedItemBookAvailable
                  ? collectionList[selectedKeywordIdx].fileName
                    ? <img src={getItemBookImage(selectedKeywordIdx)} alt="python detail img" />
                    : ""
                  : props.intl.formatMessage({ id: "ID_PYTHON_NO_ITEM" })
                }
              </div>
            </>
          )}
        </div>
        <div className="collectionListWrapper">
          <ul className="tabList">
            {itemBookList.map((tab, i) => {
              return (
                <li
                  className={`${
                    i === selectedCollectionIdx ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedKeywordIdx(0);
                    handleCollectionTabAt(i);
                  }}
                  key={tab + i}
                >
                  {tab.localized[0] ? tab.localized[0].title : tab.title}
                </li>
              );
            })}
          </ul>
          <div className="itemListWrapper">
            <ul className="itemList">
              {collectionList.map((list, i) => {
              return (
                <li
                  className={
                    list.dreamProjectId > projectId // collection의 projectId가 학습중인 projectId 보다 크면 lock
                    ? "lock"
                    : collectionStatus({itemIndex : i, listProjectId : list.dreamProjectId})
                  }
                  onClick={() => {
                    playButtonEffect(list.dreamProjectId);
                    setSelectedKeywordIdx(i);
                  }}
                  key={`collectionList_${i}`}
                >
                  <span>{list.localized[0] ? list.localized[0].itemName : list.itemName}</span>
                </li>
              );

              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(PythonCollection);
