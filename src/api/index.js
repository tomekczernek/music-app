import axios from "axios";

function get(q) {
  return axios({
    method: "GET",
    url: process.env.REACT_APP_URL,
    params: {
        "q": q
    },
    headers: {
        "x-rapidapi-key": process.env.REACT_APP_KEY,
        "x-rapidapi-host": process.env.REACT_APP_HOST,
        "useQueryString": true
    }
  });
}

export default { get };
