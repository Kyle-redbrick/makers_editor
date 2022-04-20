import { URL } from "../../Common/Util/Constant";
import { fetchRequest } from "../../Common/Util/HTTPRequest";

export const getDashboard = ({ email }) => {
  return fetchRequest(
    `${URL.API_SERVER}user/${email}/dashboard/dream`,
    "GET"
  ).then(res => res.json());
};

export const getMyCourseSummary = ({ courseId, email }) => {
  return fetchRequest(
    `${URL.API_SERVER}user/${email}/dreamCourse/${courseId}/summary`,
    "GET"
  ).then(res => res.json());
};

export const getQnas = ({ offset = 0, limit = 10, userId, order, reply }) => {
  return fetchRequest(
    `${URL.API_SERVER}user/${userId}/dreamQuestions?offset=${offset}&limit=${limit}&order=${order}&reply=${reply}`,
    "GET"
  ).then(res => res.json());
};

export const getQnaById = ({ id }) => {
  return fetchRequest(`${URL.API_SERVER}dreamQuestion/${id}`, "GET").then(res =>
    res.json()
  );
};

export const postQna = ({ userId, content, title, type, imageJSON }) => {
  return fetchRequest(`${URL.API_SERVER}dreamQuestion`, "POST", {
    userId,
    content,
    title,
    type,
    imageJSON
  }).then(res => res.json());
};

export const putQna = ({ questionId, title, content, type, imageJSON }) => {
  return fetchRequest(`${URL.API_SERVER}dreamQuestion/${questionId}`, "PUT", {
    title,
    content,
    type,
    imageJSON
  }).then(res => res.json());
}

export const deleteQna = ({ questionId }) => {
  return fetchRequest(`${URL.API_SERVER}dreamQuestion/${questionId}`, "DELETE").then(res => res.json());
}

export const postQnaReply = ({ adminId, content, title, qnaId }) => {
  return fetchRequest(`${URL.API_SERVER}dreamQuestion/${qnaId}/reply`, "POST", {
    adminId,
    contents: content,
    title,
    dreamQuestionId: qnaId
  }).then(res => res.json());
};

export const getInventoryCards = ({ userId }) => {
  return fetchRequest(`${URL.API_SERVER}user/${userId}/cards`, "GET").then(
    res => res.json()
  );
};

export const postMyDreamProject = ({ projectId }) => {
  return fetchRequest(`${URL.API_SERVER}myDreamProject`, "POST", { projectId }).then(
    res => res.json()
  );
};

export const getComments = ({ contentId, contentType, offset = 0, limit = 20 }) => {
  return fetchRequest(
    `${URL.API_SERVER}comments/?limit=${limit}&offset=${offset}&type=${contentType}&id=${contentId}`,
    "GET"
  ).then(res => res.json());
};

export const postComment = ({
  email,
  parentCommentId = null,
  contentId,
  message,
  contentType
}) => {
  return fetchRequest(
    `${URL.API_SERVER}comment`,
    "POST",
    {
      email,
      parentCommentId,
      message,
      contentType,
      contentId
    }
  ).then(res => res.json());
};

export const getMyCourses = ({ userId }) => {
  return fetchRequest(
    `${URL.API_SERVER}user/${userId}/dreamSummary`,
    "GET"
  )
    .then(res => res.json())
    .then(json => json.courses);
};

export const getRecommendProject = (id) => {
  return fetchRequest(
    `${URL.API_SERVER}dreamProject/${id}`,
    "GET"
  )
  .then(res => res.json())
};


export const getLmsCourses = (id) => {
  return fetchRequest(
    `${URL.API_SERVER}/lms/dashboard `,
    "GET"
  )
  .then(res => res.json())
};