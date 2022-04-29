import { URL } from "../../Common/Util/Constant";
import { fetchRequest } from "../../Common/Util/HTTPRequest";

export const getTodayPicks = () => {
  return fetchRequest(`${URL.API_SERVER}dreamTodaysPicks`, "GET").then(res =>
    res.json()
  );
};

export const getBanners = () => {
  return fetchRequest(`${URL.API_SERVER}dreamBanners`, "GET").then(res =>
    res.json()
  );
};

export const getCourses = () => {
  return fetchRequest(`${URL.API_SERVER}dreamCourses`, "GET").then(res =>
    res.json()
  );
};

export const getCoursesDetail = () => {
  return fetchRequest(`${URL.API_SERVER}dreamCourses/detail`, "GET").then(res =>
    res.json()
  );
};

export const getLectures = ({ queryString }) => {
  return fetchRequest(
    `${URL.API_SERVER}dreamLectures?${queryString}`,
    "GET"
  ).then(res => res.json());
};

export const getPopularLectures = () => {
  return fetchRequest(`${URL.API_SERVER}dreamLectures/popular`, "GET").then(
    res => res.json()
  );
};

export const updateProfile = ({ icon }) => {
  return fetchRequest(`${URL.API_SERVER}user/update`, "POST", { icon }).then(
    res => res.json()
  );
};


export const getLearn = formData => {
  return fetchRequest(URL.API_SERVER + `learn/box`, "GET", formData).then(
    res => res.json()
  );
}