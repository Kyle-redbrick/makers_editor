import { URL } from "../../Common/Util/Constant";
import { fetchRequest } from "../../Common/Util/HTTPRequest";

export const getLecture = ({ id }) => {
  return fetchRequest(`${URL.API_SERVER}dreamLecture/${id}/page`, "GET").then((res) => res.json());
};

export const getComments = ({ lectureId, offset = 0, limit = 20, contentType }) => {
  return fetchRequest(
    `${URL.API_SERVER}dreamLecture/${lectureId}/comments?limit=${limit}&offset=${offset}&contentType=${contentType}`,
    "GET"
  ).then((res) => res.json());
};

export const getCommentsOnComment = ({ commentId, offset = 0, limit = 20 }) => {
  return fetchRequest(`${URL.API_SERVER}comment/${commentId}/replies?limit=${limit}&offset=${offset}`, "GET").then(
    (res) => res.json()
  );
};

export const postComment = ({ email, parentCommentId = null, lectureId, message }) => {
  return fetchRequest(`${URL.API_SERVER}dreamLecture/${lectureId}/comment`, "POST", {
    email,
    dreamLectureId: lectureId,
    parentCommentId,
    message,
  }).then((res) => res.json());
};

export const putComment = ({ id, message }) => {
  return fetchRequest(`${URL.API_SERVER}comment/${id}`, "PUT", {
    message
  }).then((res) => res.json());
};

export const deleteComment = ({ commentId }) => {
  return fetchRequest(`${URL.API_SERVER}comment/${commentId}`, "DELETE").then((res) => res.json());
};

export const reportComment = ({ commentId, email, reason }) => {
  return fetchRequest(`${URL.API_SERVER}dreamLecture/comment/${commentId}/report`, "POST", {
    email,
    reason,
  }).then((res) => res.json());
};
