import axios from "axios";

const call_api = ({ url, method, data, params }) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL_V1,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })({
    method,
    url,
    data,
    params,
  });
}

export default call_api;