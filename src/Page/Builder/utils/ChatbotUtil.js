import { ChatbotMsgType } from "../../../Common/Util/Constant";
import apiLibrary from "./apiLibrary";
import * as request from "../../../Common/Util/HTTPRequest";
const HmacSHA256 = require('crypto-js/hmac-sha256');
const EncBase64 = require('crypto-js/enc-base64');
const BASE_URL = "https://5f0149f1b0d548388829c6002606fff2.apigw.ntruss.com/custom/v1/4600/92445c38557137a6e80a89c0804985beab9874539d5131ca4533726421ef81b9";
const SECRET_KEY = "Qm9HdklYRnhKWUJ0ZkJDRWpyUlhzY3RWV0hEVmhzckI=";



export const SCENARIO_NAMES = {
  API: "programming",
  CLASS: "class"
}

const WIZBOT = "WIZBOT"

const fetchRequest = (url, method, param, signatureHeader) => {
  let headers = {
    "Content-Type": "application/json;UTF-8",
    "X-NCP-CHATBOT_SIGNATURE": signatureHeader
  };

  if (param) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(param)
    });
  } else {
    return fetch(url, {
      method: method,
      headers: headers
    });
  }
};

export const sendMsg = (payload, onSuccess, onError) => {
  const body = {
    "version": "v2",
    "userId": payload.userId,
    "timestamp": new Date().getTime(),
    "bubbles": [{
      "type": "text",
      "data": { "description": payload.description }
    }
    ],
    "event": "send"
  }
  const signatureHeader = HmacSHA256(JSON.stringify(body), SECRET_KEY).toString(EncBase64);
  fetchRequest(`${BASE_URL}`, "POST", body, signatureHeader)
    .then(res => res.json())
    .then(async data => {
      // console.log(11111, "CLOVA RESPONSE :", data)
      let canNotHelp = false;
      let messages = [];
      data.bubbles.forEach(bubble => {
        const msg = {
          text: bubble.data.description,
          sender: WIZBOT
        }
        messages.push(msg);
        canNotHelp = !!bubble.information.find(i => i.key === "defaultMsgType" && i.value === "canNotHelpMsg");
      })

      //add additional info
      if (!canNotHelp) {
        switch (data.scenario.name) {
          case SCENARIO_NAMES.API:
            data.entities.forEach(entity => {
              if (entity.name === "API") {
                const api = apiLibrary.getAPIbyId(entity.word);
                if (api) {
                  messages.push({
                    text: api.chatbotDescription,
                    sender: WIZBOT,
                    type: ChatbotMsgType.BOT_API_SCRIPT,
                    script: "//" + entity.word + "예제 스크립트:\n"+api.snippet
                  });
                  messages.push({
                    type: ChatbotMsgType.BOT_BUTTON,
                    keyword: api.id,
                    questionType: "class"
                  })
                }
              }
            })
            break;
          case SCENARIO_NAMES.CLASS:
            const failedMessage = {
              text: "앗! 아직은 준비 된 수업이 없네..",
              sender: WIZBOT,
            };
            const entityValues = data.entities.map(entity => entity.word);
            if(entityValues.length > 0) {
              try{
                const res = await request.getDreamProjectsByTag(entityValues[0])
                const projects = await res.json();
                if(projects.length>0){
                  const msg = {
                    text: entityValues[0] + "을(를) 배우기 위해서 내가 준비한 수업이야~",
                    sender: WIZBOT
                  }
                  messages.push(msg);
                  messages.push({
                    type: ChatbotMsgType.BOT_CLASS,
                    lectures: projects,
                    sender: WIZBOT
                  })
                } else {
                  messages = [failedMessage];
                }
              } catch(e) {
                messages = [failedMessage];
                console.error(e);
              }
            } else {
              messages = [failedMessage];
            }
            break;
          default:
            break;
        }
      }
      onSuccess(messages);
    })
    .catch(e => onError(e));
};
