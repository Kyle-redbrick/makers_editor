import { URL } from "../../Common/Util/Constant";
import { fetchRequest } from "../../Common/Util/HTTPRequest";

export const getCourses = () => {
  return fetchRequest(`${URL.API_SERVER}dreamCourses`, "GET").then((res) => res.json());
};
